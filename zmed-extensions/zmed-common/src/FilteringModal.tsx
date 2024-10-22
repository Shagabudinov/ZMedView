import React, { useEffect, useState } from 'react';
import {
  Button,
  CheckBox,
  InputNumber,
  Typography,
  InputTwoDigitsRange,
} from '@ohif/ui';
import { dict1 } from './mammodict';
import classNames from 'classnames';

const FilteringModal = ({
  filterRangeAge,
  setFilterRangeAge,
  setShouldGetFilteredData,
  setData,
  DEFAULT_DATA,
  setDataIsFiltered,
  selectedFilterOptions,
  setSelectedFilterOptions,
  onClose,
}) => {
  const [minAge, maxAge] = [0, 100];
  const [chooseAgeRange, setChooseAgeRange] = useState(true);
  const renderItems = (dict) => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(dict).map((key) => {
          const label = dict[key];

          if (key.endsWith('.')) {
            const countDots = key.split('.').length - 1;
            return (
                <Typography
                  key={key}
                  className={classNames('my-2 col-span-2', {
                    'font-bold': countDots === 1,
                  })}
                  variant={countDots === 2 ? 'h6' : 'h5'}
                >
                  {label}
                </Typography>
            );
          }
          if (key.endsWith('+')) {
            key = key.replace('+', '');
            return (
              <React.Fragment key={key}>
                <hr className="border-primary-main border-t-1 col-span-2" />
                <div className="col-span-2 font-bold">
                  <CheckBox
                    className="py-2 px-1"
                    checked={selectedFilterOptions.has(key)}
                    label={label}
                    labelVariant="h5"
                    labelClassName="ml-2"
                    onChange={() => {
                      setSelectedFilterOptions((prevState) => {
                        const newSelectedFilterOptions = new Set(prevState);

                        if (newSelectedFilterOptions.has(key)) {
                          newSelectedFilterOptions.delete(key);
                        } else {
                          newSelectedFilterOptions.add(key);
                        }

                        return newSelectedFilterOptions;
                      });
                    }}
                  />
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <div key={key} className="mx-8">
                <CheckBox
                  className="mt-1 mb-1 p-1"
                  checked={selectedFilterOptions.has(key)}
                  label={label}
                  labelVariant="subtitle"
                  onChange={() => {
                    setSelectedFilterOptions((prevState) => {
                      const newSelectedFilterOptions = new Set(prevState);

                      if (newSelectedFilterOptions.has(key)) {
                        newSelectedFilterOptions.delete(key);
                      } else {
                        newSelectedFilterOptions.add(key);
                      }

                      return newSelectedFilterOptions;
                    });
                  }}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  const handleRangeChange = (values: [number, number]) => {
    setFilterRangeAge([values[0], values[1]]);
  };


  return (
    <div className="relative flex flex-col h-full">
      <div className="">
        <Typography variant="h5" className={'font-bold'}>
          Возраст
        </Typography>
        <div className="my-4">
          <InputTwoDigitsRange
            minValue={minAge}
            maxValue={maxAge}
            currentMinValue={
              filterRangeAge.length === 2 ? filterRangeAge[0] : minAge
            }
            currentMaxValue={
              filterRangeAge.length === 2 ? filterRangeAge[1] : maxAge
            }
            onChange={handleRangeChange}
            disabled={!chooseAgeRange}
          />
        </div>
        <CheckBox
          label="Указать точный возраст"
          checked={!chooseAgeRange}
          onChange={() => {
            setChooseAgeRange((prev) => {
              console.log('After change:', !prev);
              return !prev;
            });
          }}
          className="my-4 px-1"
        />
        {!chooseAgeRange && (
          <div className="my-4 w-32">
            <InputNumber
              label="Возраст"
              labelClassName="text-lx"
              className="flex gap-4 px-1"
              value={filterRangeAge.length === 1 ? filterRangeAge[0] : null}
              onChange={(value) =>
                setFilterRangeAge((prev) => {
                  return [value];
                })
              }
            />
          </div>
        )}
        <div className="border-primary-dark my-1.5 w-full border"></div>
      </div>
      <div className="overflow-y-auto flex-1 pb-5">{renderItems(dict1)}</div>
      <div className="sticky bottom-0 flex justify-end p-2">
        <Button
          onClick={() => {
            setShouldGetFilteredData(true);
            setData(DEFAULT_DATA);
            setDataIsFiltered(true);
            onClose();
          }}
        >
          Фильтрация маммографии
        </Button>
      </div>
    </div>
  );
};

export default FilteringModal;
