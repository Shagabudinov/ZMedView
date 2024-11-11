import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, PanelSection } from '../../components';
import SegmentationConfig from './SegmentationConfig';
import SegmentationDropDownRow from './SegmentationDropDownRow';
import SegmentList from './SegmentList';
import { useTranslation } from 'react-i18next';
import { dict } from './mammodict';
import { useViewportGrid } from '@ohif/ui';
import { buildHierarchy } from './utils/buildHierarchyData';

const SegmentationGroupTableAtlas = ({
  segmentations = [],
  viewportGridService,
  segmentationConfig,
  disableEditing = false,
  showAddSegmentation = true,
  showAddSegment = true,
  showDeleteSegment = true,
  onSegmentationAdd = () => {},
  onSegmentationEdit = () => {},
  onSegmentationClick = () => {},
  onSegmentationDelete = () => {},
  onSegmentationDownload = () => {},
  onSegmentationDownloadRTSS = () => {},
  storeSegmentation = () => {},
  onSegmentClick = () => {},
  onSegmentAdd = () => {},
  onSegmentDelete = () => {},
  onSegmentEdit = () => {},
  onToggleSegmentationVisibility = () => {},
  onToggleSegmentVisibility = () => {},
  onToggleSegmentsVisibility = () => {},
  onToggleSegmentLock = () => {},
  onSegmentColorClick = () => {},
  setFillAlpha = () => {},
  setFillAlphaInactive = () => {},
  setOutlineWidthActive = () => {},
  setOutlineOpacityActive = () => {},
  setRenderFill = () => {},
  setRenderInactiveSegmentations = () => {},
  setRenderOutline = () => {},
  addSegmentationClassName,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [activeSegmentationId, setActiveSegmentationId] = useState(null);
  const [isAutoOpenTabs, setIsAutoOpenTabs] = useState(
    localStorage.getItem('isAutoOpenTabs') === 'true'
  );
  const [hierarchyData, setHierarchyData] = useState(buildHierarchy(dict, []));
  const activeSingleSegmentations = useRef([]);
  let currentImageProjection;

  const [viewportGrid] = useViewportGrid();
  const { activeViewportId, viewports } = viewportGrid;

  const activeSegmentation = segmentations?.find(
    segmentation => segmentation.id === activeSegmentationId
  );
  const { t } = useTranslation('SegmentationTable');

  const onHandleAutoOpenTabsChange = () => {
    setIsAutoOpenTabs(!isAutoOpenTabs);
    localStorage.setItem('isAutoOpenTabs', !isAutoOpenTabs);
  };

  const onActiveSegmentationChange = segmentationId => {
    onSegmentationClick(segmentationId);
    const segmentationProjection = segmentations
      ?.find(segmentation => segmentation.id === segmentationId)
      .imageView.replace('-', '');

    for (const viewport of viewports) {
      const viewportProjection = viewport[1]?.displaySetOptions[0]?.id;
      if (segmentationProjection === viewportProjection) {
        viewportGridService.setActiveViewportId(viewport[0]);
      }
    }
  };

  useEffect(() => {
    if (viewports.size >= 1) {
      const viewport = viewports.get(activeViewportId);
      if (viewport) {
        currentImageProjection = viewport?.displaySetOptions[0]?.id;
      }
    }

    let activeSegmentationIdToSet = segmentations?.find(segmentation => {
      const segmentationProjection = segmentation.imageView.replace('-', '');
      return segmentationProjection === currentImageProjection;
    })?.id;

    if (segmentations?.length === 0) {
      activeSegmentationIdToSet = null;
    }

    setActiveSegmentationId(activeSegmentationIdToSet);
  }, [segmentations, viewportGrid]);

  useEffect(() => {
    activeSingleSegmentations.current = [];

    const activeSegmentationSegments = activeSegmentation?.segments;

    if (activeSegmentationSegments !== undefined) {
      const activeSegmentations = activeSegmentationSegments.filter(
        segment => segment !== undefined
      );

      activeSegmentations.forEach(segment => {
        const labels = segment.label.split('_');
        const labelsCount = labels.length;

        if (labelsCount === 1) {
          activeSingleSegmentations.current.push(segment);
        } else {
          const { label, ...rest } = segment;
          labels.forEach(label => {
            activeSingleSegmentations.current.push({ label: label, ...rest });
          });
        }
      });
    }
    setHierarchyData(buildHierarchy(dict, activeSingleSegmentations.current));
  }, [activeSegmentation, onToggleSegmentVisibility, onToggleSegmentsVisibility, activeViewportId]);

  return (
    <div className="flex min-h-0 flex-col bg-black text-[13px] font-[300]">
      <PanelSection
        title={t('Segmentation')}
        actionIcons={
          activeSegmentation && [
            {
              name: 'settings-bars',
              onClick: () => setIsConfigOpen(isOpen => !isOpen),
            },
          ]
        }
      >
        {isConfigOpen && (
          <SegmentationConfig
            setFillAlpha={setFillAlpha}
            setFillAlphaInactive={setFillAlphaInactive}
            setOutlineWidthActive={setOutlineWidthActive}
            setOutlineOpacityActive={setOutlineOpacityActive}
            setRenderFill={setRenderFill}
            setRenderInactiveSegmentations={setRenderInactiveSegmentations}
            setRenderOutline={setRenderOutline}
            segmentationConfig={segmentationConfig}
          />
        )}
        <div className="bg-primary-dark ">
          <div className="mt-1 select-none">
            <SegmentationDropDownRow
              segmentations={segmentations}
              disableEditing={disableEditing}
              activeSegmentation={activeSegmentation}
              onActiveSegmentationChange={onActiveSegmentationChange}
              onSegmentationDelete={onSegmentationDelete}
              onSegmentationEdit={onSegmentationEdit}
              onSegmentationDownload={onSegmentationDownload}
              onSegmentationDownloadRTSS={onSegmentationDownloadRTSS}
              storeSegmentation={storeSegmentation}
              onSegmentationAdd={onSegmentationAdd}
              addSegmentationClassName={addSegmentationClassName}
              onToggleSegmentationVisibility={onToggleSegmentationVisibility}
            />
          </div>
        </div>
        <CheckBox
          label="Открывать все активные сегменты"
          labelVariant="body"
          checked={isAutoOpenTabs}
          onChange={onHandleAutoOpenTabsChange}
          className="flex select-none gap-[8px] bg-black py-[12px] pl-[10px]"
        />
        <div className="ohif-scrollbar flex h-fit min-h-0 flex-1 flex-col overflow-auto bg-black">
          <div className="mb-[1px]">
            <SegmentList
              disableEditing={disableEditing}
              hierarchyData={hierarchyData}
              onClick={onSegmentClick}
              onEdit={onSegmentEdit}
              onDelete={onSegmentDelete}
              showDelete={showDeleteSegment}
              onColor={onSegmentColorClick}
              onToggleSegmentVisibility={onToggleSegmentVisibility}
              onToggleSegmentsVisibility={onToggleSegmentsVisibility}
              onToggleLocked={onToggleSegmentLock}
              setActiveSegmentationId={setActiveSegmentationId}
              activeSegmentationId={activeSegmentationId}
              isAutoOpenTabs={isAutoOpenTabs}
            />
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

SegmentationGroupTableAtlas.propTypes = {
  segmentations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          segmentIndex: PropTypes.number.isRequired,
          color: PropTypes.array.isRequired,
          label: PropTypes.string.isRequired,
          isVisible: PropTypes.bool.isRequired,
          isLocked: PropTypes.bool.isRequired,
        })
      ),
    })
  ),
  viewportGridService: PropTypes.object.isRequired,
  segmentationConfig: PropTypes.object.isRequired,
  disableEditing: PropTypes.bool,
  showAddSegmentation: PropTypes.bool,
  showAddSegment: PropTypes.bool,
  showDeleteSegment: PropTypes.bool,
  onSegmentationAdd: PropTypes.func.isRequired,
  onSegmentationEdit: PropTypes.func.isRequired,
  onSegmentationClick: PropTypes.func.isRequired,
  onSegmentationDelete: PropTypes.func.isRequired,
  onSegmentationDownload: PropTypes.func.isRequired,
  onSegmentationDownloadRTSS: PropTypes.func.isRequired,
  storeSegmentation: PropTypes.func.isRequired,
  onSegmentClick: PropTypes.func.isRequired,
  onSegmentAdd: PropTypes.func.isRequired,
  onSegmentDelete: PropTypes.func.isRequired,
  onSegmentEdit: PropTypes.func.isRequired,
  onToggleSegmentationVisibility: PropTypes.func.isRequired,
  onToggleSegmentVisibility: PropTypes.func.isRequired,
  onToggleSegmentLock: PropTypes.func.isRequired,
  onSegmentColorClick: PropTypes.func.isRequired,
  setFillAlpha: PropTypes.func.isRequired,
  setFillAlphaInactive: PropTypes.func.isRequired,
  setOutlineWidthActive: PropTypes.func.isRequired,
  setOutlineOpacityActive: PropTypes.func.isRequired,
  setRenderFill: PropTypes.func.isRequired,
  setRenderInactiveSegmentations: PropTypes.func.isRequired,
  setRenderOutline: PropTypes.func.isRequired,
};

export default SegmentationGroupTableAtlas;
