import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { InputNumber } from '../../components';
import './InputRange.css';
import getMaxDigits from '../../utils/getMaxDigits';

/**
 * React Range Input component
 * it has two props, value and onChange
 * value is a number value
 * onChange is a function that will be called when the range input is changed
 *
 */

type Label = {
  text: string;
  position: number;
};

type InputRangeProps = {
  value: number;
  onChange: (value: number) => void;
  minValue: number;
  maxValue: number;
  step: number;
  unit?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelVariant?: string;
  showLabel?: boolean;
  labelPosition?: string;
<<<<<<< HEAD
  trackColor?: string;
  allowNumberEdit?: boolean;
  showAdjustmentArrows?: boolean;
=======
  leftColor?: string;
  rightColor?: string;
  thumbColor?: string;
  thumbColorOuter?: string;
  allowNumberEdit?: boolean;
  showAdjustmentArrows?: boolean;
  trackHeight?: string;
>>>>>>> origin/master
  labels?: Label[];
};

const InputRange: React.FC<InputRangeProps> = ({
  value,
  onChange,
  minValue,
  maxValue,
  step = 1,
  unit = '',
  containerClassName,
  inputClassName,
  labelClassName,
  showLabel = true,
  labelPosition = 'right',
<<<<<<< HEAD
  trackColor,
=======
  leftColor = '#5acce6',
  rightColor = '#3a3f99',
  thumbColor = '#5acce6',
  thumbColorOuter = '#090c29',
  trackHeight = '3px',
>>>>>>> origin/master
  allowNumberEdit = false,
  showAdjustmentArrows = true,
  labels = [],
}) => {
  const [rangeValue, setRangeValue] = useState(value);
  const maxDigits = getMaxDigits(maxValue, step);
  const labelWidth = `${maxDigits * 15}px`;

<<<<<<< HEAD
  const maxDigits = getMaxDigits(maxValue, step);
  const labelWidth = `${maxDigits * 10}px`;

=======
>>>>>>> origin/master
  useEffect(() => setRangeValue(value), [value]);

  const handleChange = useCallback(
    e => {
      const val = Number(e.target.value);
      const roundedVal = Math.round(val / step) * step;
      setRangeValue(roundedVal);
      onChange(roundedVal);
    },
    [onChange, step]
  );

  const rangeValuePercentage = ((rangeValue - minValue) / (maxValue - minValue)) * 100;

  const LabelOrEditableNumber = allowNumberEdit ? (
    <InputNumber
      minValue={minValue}
      maxValue={maxValue}
      value={rangeValue}
      onChange={val => {
        setRangeValue(val);
        onChange(val);
      }}
      step={step}
      showAdjustmentArrows={showAdjustmentArrows}
    />
  ) : (
    <span className={classNames(labelClassName ?? 'text-white')}>
<<<<<<< HEAD
      {rangeValue}
      {unit}
=======
      {rangeValue} {unit}
>>>>>>> origin/master
    </span>
  );

  return (
    <div
      className={`flex cursor-pointer items-center ${containerClassName ?? ''}`}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
<<<<<<< HEAD
      <div className="relative flex w-full items-center space-x-2">
        {showLabel && labelPosition === 'left' && (
          <div style={{ width: labelWidth }}>{LabelOrEditableNumber}</div>
        )}
        <div className="range-track"></div>
=======
      <div className={'relative flex w-full items-center ' + (showLabel ? 'space-x-2' : '')}>
        {showLabel && labelPosition === 'left' && (
          <div style={{ width: labelWidth }}>{LabelOrEditableNumber}</div>
        )}
>>>>>>> origin/master
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={rangeValue}
<<<<<<< HEAD
          className={`h-[3px] appearance-none rounded-md ${inputClassName ?? ''}`}
          style={{
            background: `linear-gradient(to right, #5acce6 0%, #5acce6 ${rangeValuePercentage}%, #3a3f99 ${rangeValuePercentage}%, #3a3f99 100%)`,
=======
          className={`w-full appearance-none rounded-md ${inputClassName ?? ''}`}
          style={{
            background: `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${rangeValuePercentage}%, ${rightColor} ${rangeValuePercentage}%, ${rightColor} 100%)`,
            '--thumb-inner-color': thumbColor,
            '--thumb-outer-color': thumbColorOuter,
            height: trackHeight,
>>>>>>> origin/master
          }}
          onChange={handleChange}
          id="myRange"
          step={step}
        />
        {showLabel && labelPosition === 'right' && (
          <div style={{ width: labelWidth }}>{LabelOrEditableNumber}</div>
        )}
        {labels.length > 0 && (
          <>
            {labels.map((label, index) => {
              const position = label.position;
              return (
                <div
                  key={index}
                  className="absolute !m-0"
                  style={{ left: `calc(${position}%)`, bottom: '-20px' }}
                >
                  <span className="text-aqua-pale text-xs">{label.text}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default InputRange;
