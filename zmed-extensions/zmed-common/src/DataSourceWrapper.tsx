/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ExtensionManager, MODULE_TYPES } from '@ohif/core';
//
// import { extensionManager } from '../App.tsx';
import { useParams, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useSearchParams from './hooks/useSearchParams';
import configuration, { StudyStatus } from './config';

/**
 * Determines if two React Router location objects are the same.
 */
const areLocationsTheSame = (location0, location1) => {
  return (
    location0.pathname === location1.pathname &&
    location0.search === location1.search &&
    location0.hash === location1.hash
  );
};

/**
 * Uses route properties to determine the data source that should be passed
 * to the child layout template. In some instances, initiates requests and
 * passes data as props.
 *
 * @param {object} props
 * @param {function} props.children - Layout Template React Component
 */
function DataSourceWrapper(props) {
  const navigate = useNavigate();
  const { children: LayoutTemplate, ...rest } = props;
  const params = useParams();
  const location = useLocation();
  const lowerCaseSearchParams = useSearchParams({ lowerCaseKeys: true });
  const query = useSearchParams();
  // Route props --> studies.mapParams
  // mapParams --> studies.search
  // studies.search --> studies.processResults
  // studies.processResults --> <LayoutTemplate studies={} />
  // But only for LayoutTemplate type of 'list'?
  // Or no data fetching here, and just hand down my source
  const STUDIES_LIMIT = 101;
  const DEFAULT_DATA = {
    studies: [],
    total: 0,
    resultsPerPage: 25,
    pageNumber: 1,
    location: 'Not a valid location, causes first load to occur',
  };

  const getInitialDataSourceName = useCallback(() => {
    // TODO - get the variable from the props all the time...
    let dataSourceName = lowerCaseSearchParams.get('datasources');

    if (!dataSourceName && window.config.defaultDataSourceName) {
      return '';
    }

    if (!dataSourceName) {
      // Gets the first defined datasource with the right name
      // Mostly for historical reasons - new configs should use the defaultDataSourceName
      const dataSourceModules =
        rest.extensionManager.modules[MODULE_TYPES.DATA_SOURCE];
      // TODO: Good usecase for flatmap?
      const webApiDataSources = dataSourceModules.reduce((acc, curr) => {
        const mods = [];
        curr.module.forEach(mod => {
          if (mod.type === 'webApi') {
            mods.push(mod);
          }
        });
        return acc.concat(mods);
      }, []);
      dataSourceName = webApiDataSources
        .map(ds => ds.name)
        .find(it => rest.extensionManager.getDataSources(it)?.[0] !== undefined);
    }

    return dataSourceName;
  }, []);

  const [isDataSourceInitialized, setIsDataSourceInitialized] = useState(false);

  // The path to the data source to be used in the URL for a mode (e.g. mode/dataSourcePath?StudyIntanceUIDs=1.2.3)
  const [dataSourcePath, setDataSourcePath] = useState(() => {
    const dataSourceName = getInitialDataSourceName();
    return dataSourceName ? `/${dataSourceName}` : '';
  });

  const [dataSource, setDataSource] = useState(() => {
    const dataSourceName = getInitialDataSourceName();

    if (!dataSourceName) {
      return rest.extensionManager.getActiveDataSource()[0];
    }

    const dataSource = rest.extensionManager.getDataSources(dataSourceName)?.[0];
    if (!dataSource) {
      throw new Error(`No data source found for ${dataSourceName}`);
    }

    return dataSource;
  });

  const [data, setData] = useState(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(null);
  const [size, setSize] = useState(null);

  /**
   * The effect to initialize the data source whenever it changes. Similar to
   * whenever a different Mode is entered, the Mode's data source is initialized, so
   * too this DataSourceWrapper must initialize its data source whenever a different
   * data source is activated. Furthermore, a data source might be initialized
   * several times as it gets activated/deactivated because the location URL
   * might change and data sources initialize based on the URL.
   */
  useEffect(() => {
    const initializeDataSource = async () => {
      await dataSource.initialize({ params, query });
      setIsDataSourceInitialized(true);
    };

    initializeDataSource();
  }, [dataSource]);

  useEffect(() => {
    const dataSourceChangedCallback = () => {
      setIsDataSourceInitialized(false);
      setDataSourcePath('');
      setDataSource(rest.extensionManager.getActiveDataSource()[0]);
      // Setting data to DEFAULT_DATA triggers a new query just like it does for the initial load.
      setData(DEFAULT_DATA);
    };

    const sub = rest.extensionManager.subscribe(
      ExtensionManager.EVENTS.ACTIVE_DATA_SOURCE_CHANGED,
      dataSourceChangedCallback
    );
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isDataSourceInitialized) {
      return;
    }

    const queryFilterValues = _getQueryFilterValues(
      location.search,
      STUDIES_LIMIT
    );

    // Дополняет array1 полями $date_processed и $data из array2
    function addParamsFromTo(array1, array2) {
      const dataMap = new Map();

      for (const item of array2) {
        const { study_instance_uid, ...rest } = item;
        if (
          !dataMap[study_instance_uid] ||
          new Date(item.date_processed.$date) >
            new Date(dataMap[study_instance_uid].date_processed.$date)
        ) {
          dataMap[study_instance_uid] = { ...rest };
        }
      }

      for (const item of array1) {
        const { studyInstanceUid } = item;
        if (dataMap[studyInstanceUid]) {
          item.date_processed = dataMap[studyInstanceUid].date_processed;
          item.data = dataMap[studyInstanceUid].data;
        }
      }

      return array1;
    }

    // 204: no content
    async function getData() {
      setIsLoading(true);

      const {studies, pages, size, total} = await dataSource.query.studies.search(queryFilterValues);

      setPages(pages);
      setSize(size);

      const config = {
        method: 'post',
        url: configuration.innopolisBaseURL + 'database/',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios(config);
      const seriesFromAI = response.data;

      const studiesWithDataAI = addParamsFromTo(studies, seriesFromAI);

      studiesWithDataAI.forEach(study => {
        const { date_processed, data } = study;
        if (!data || !date_processed) {
          return;
        }
        const probabilities = [];

        for (let diase in data) {
          probabilities.push(data[diase].probability);
        }

        if (probabilities.reduce((acc, item) => acc + item, 0) === 0) {
          study.status = StudyStatus.success;
        } else if (probabilities.filter(item => item >= 0.6).length > 0) {
          study.status = StudyStatus.error;
        } else {
          study.status = StudyStatus.warning;
        }
      });

      setData({
        studies: studiesWithDataAI || [],
        total: studiesWithDataAI.length,
        resultsPerPage: queryFilterValues.resultsPerPage,
        pageNumber: queryFilterValues.pageNumber,
        location,
      });

      setIsLoading(false);
    }

    try {
      // Cache invalidation :thinking:
      // - Anytime change is not just next/previous page
      // - And we didn't cross a result offset range
      const isSamePage = data.pageNumber === queryFilterValues.pageNumber;
      const previousOffset =
        Math.floor((data.pageNumber * data.resultsPerPage) / STUDIES_LIMIT) *
        (STUDIES_LIMIT - 1);
      const newOffset =
        Math.floor(
          (queryFilterValues.pageNumber * queryFilterValues.resultsPerPage) /
            STUDIES_LIMIT
        ) *
        (STUDIES_LIMIT - 1);
      // Simply checking data.location !== location is not sufficient because even though the location href (i.e. entire URL)
      // has not changed, the React Router still provides a new location reference and would result in two study queries
      // on initial load. Alternatively, window.location.href could be used.
      const isLocationUpdated =
        typeof data.location === 'string' ||
        !areLocationsTheSame(data.location, location);
      const isDataInvalid =
        !isSamePage ||
        (!isLoading && (newOffset !== previousOffset || isLocationUpdated));

      if (isDataInvalid) {
        getData().catch(() => navigate('/notfoundserver', '_self'));
      }
    } catch (ex) {
      console.warn(ex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    location,
    params,
    isLoading,
    setIsLoading,
    dataSource,
    isDataSourceInitialized,
  ]);
  // queryFilterValues

  // TODO: Better way to pass DataSource?
  return (
    <LayoutTemplate
      {...rest}
      data={data.studies}
      dataPath={dataSourcePath}
      dataTotal={data.total}
      dataSource={dataSource}
      isLoadingData={isLoading}
      pages={pages}
      size={size}
      // To refresh the data, simply reset it to DEFAULT_DATA which invalidates it and triggers a new query to fetch the data.
      onRefresh={() => setData(DEFAULT_DATA)}
    />
  );
}

DataSourceWrapper.propTypes = {
  /** Layout Component to wrap with a Data Source */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default DataSourceWrapper;

/**
 * Duplicated in `workList`
 * Need generic that can be shared? Isn't this what qs is for?
 * @param {*} query
 */
function _getQueryFilterValues(query, queryLimit) {
  query = new URLSearchParams(query);

  const pageNumber = _tryParseInt(query.get('pageNumber'), 1);
  const resultsPerPage = _tryParseInt(query.get('resultsPerPage'), 25);

  const queryFilterValues = {
    // DCM
    patientId: query.get('mrn'),
    patientName: query.get('patientName'),
    studyDescription: query.get('description'),
    modalitiesInStudy:
      query.get('modalities') && query.get('modalities').split(','),
    accessionNumber: query.get('accession'),
    //
    startDate: query.get('startDate'),
    endDate: query.get('endDate'),
    page: _tryParseInt(query.get('page'), undefined),
    pageNumber,
    resultsPerPage,
    // Rarely supported server-side
    sortBy: query.get('sortBy'),
    sortDirection: query.get('sortDirection'),
    config: query.get('configUrl'),
    me: true
  };

  // patientName: good
  // studyDescription: good
  // accessionNumber: good

  // Delete null/undefined keys
  Object.keys(queryFilterValues).forEach(
    key => queryFilterValues[key] == null && delete queryFilterValues[key]
  );

  return queryFilterValues;

  function _tryParseInt(str, defaultValue) {
    let retValue = defaultValue;
    if (str !== null) {
      if (str.length > 0) {
        if (!isNaN(str)) {
          retValue = parseInt(str);
        }
      }
    }
    return retValue;
  }
}
