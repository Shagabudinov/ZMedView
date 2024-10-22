import React, { useState, useRef, useEffect } from 'react';

type CustomRangeSliderProps = {
  minValue: number;
  maxValue: number;
  currentMinValue: number;
  currentMaxValue: number;
  step?: number;
  leftColor?: string;
  rightColor?: string;
  thumbColor?: string;
  thumbColorOuter?: string;
  trackHeight?: string;
  onChange?: (values: [number, number]) => void;
  disabled?: boolean;
};

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  minValue = 0,
  maxValue = 100,
  currentMinValue = 0,
  currentMaxValue = 100,
  step = 1,
  leftColor = '#5acce6',
  rightColor = '#3a3f99',
  thumbColor = '#5acce6',
  thumbColorOuter = '#090c29',
  trackHeight = '6px',
  onChange,
  disabled = false,
}) => {
  const [minSelectedValue, setMinSelectedValue] = useState(currentMinValue);
  const [maxSelectedValue, setMaxSelectedValue] = useState(currentMaxValue);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange) {
      onChange([minSelectedValue, maxSelectedValue]);
    }
  }, [minSelectedValue, maxSelectedValue, onChange]);

  const getPercentage = (value: number) => ((value - minValue) / (maxValue - minValue)) * 100;

  const handleDrag = (e: React.MouseEvent, thumbType: 'min' | 'max') => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const clickPosition = e.clientX - trackRect.left;
    const value = (clickPosition / trackWidth) * (maxValue - minValue) + minValue;

    const roundedValue = Math.round(value / step) * step;

    if (thumbType === 'min' && roundedValue < maxSelectedValue) {
      setMinSelectedValue(Math.max(minValue, roundedValue));
    } else if (thumbType === 'max' && roundedValue > minSelectedValue) {
      setMaxSelectedValue(Math.min(maxValue, roundedValue));
    }
  };

  const handleMouseDown = (e: React.MouseEvent, thumbType: 'min' | 'max') => {
    if (disabled) return;

    e.preventDefault();
    const handleMouseMove = (event: MouseEvent) => handleDrag(event as any, thumbType);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={`relative w-full ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
      <div
        ref={trackRef}
        className="relative h-1 w-full rounded"
        style={{
          background: `linear-gradient(to right, ${rightColor} ${getPercentage(minSelectedValue)}%, ${leftColor} ${getPercentage(minSelectedValue)}%, ${leftColor} ${getPercentage(maxSelectedValue)}%, ${rightColor} ${getPercentage(maxSelectedValue)}%)`,
          height: trackHeight,
        }}
      >
        {/* Левый ползунок */}
        <div
          className="absolute top-[-6px] z-10 h-[14px] w-[14px] cursor-pointer rounded-full border-2"
          style={{
            left: `${getPercentage(minSelectedValue)}%`,
            backgroundColor: thumbColor,
            borderColor: thumbColorOuter,
          }}
          onMouseDown={e => handleMouseDown(e, 'min')}
        />
        {/* Правый ползунок */}
        <div
          className="absolute top-[-6px] z-20 h-[14px] w-[14px] cursor-pointer rounded-full border-2"
          style={{
            left: `${getPercentage(maxSelectedValue)}%`,
            backgroundColor: thumbColor,
            borderColor: thumbColorOuter,
          }}
          onMouseDown={e => handleMouseDown(e, 'max')}
        />
      </div>
      {/* Отображение значений под ползунками */}
      <div className="mt-2 flex justify-between text-sm text-white">
        <span>{minSelectedValue}</span>
        <span>{maxSelectedValue}</span>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
