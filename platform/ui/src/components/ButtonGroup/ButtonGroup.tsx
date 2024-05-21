import React, { useState, useEffect, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ButtonEnums } from '../../components';

const ButtonGroup = ({
  children,
  className,
  orientation = ButtonEnums.orientation.horizontal,
  activeIndex: defaultActiveIndex = 0,
  onActiveIndexChange,
<<<<<<< HEAD
=======
  separated = false,
>>>>>>> origin/master
  disabled = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  const handleButtonClick = index => {
    setActiveIndex(index);
    onActiveIndexChange && onActiveIndexChange(index);
  };

  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const wrapperClasses = classnames(
<<<<<<< HEAD
    'items-stretch inline-flex',
=======
    `${separated ? '' : 'inline-flex'}`,
>>>>>>> origin/master
    orientationClasses[orientation],
    className
  );

  return (
<<<<<<< HEAD
    <div className={classnames(wrapperClasses, 'text-[13px]')}>
      {Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            key: index,
            className: classnames(
              'rounded-[4px] px-2 py-1 text-center',
              index === activeIndex
                ? 'bg-customblue-40 text-white'
                : 'text-primary-active bg-black',
              child.props.className,
              disabled ? 'ohif-disabled' : ''
            ),
            onClick: e => {
              child.props.onClick && child.props.onClick(e);
              handleButtonClick(index);
            },
          });
        }
        return child;
=======
    <div
      className={classnames(wrapperClasses, ' text-[13px]', {
        ' rounded-md  bg-black': !separated,
>>>>>>> origin/master
      })}
    >
      {!separated && (
        <div className="flex h-[32px] w-full">
          {Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return cloneElement(child, {
                key: index,
                className: classnames(
                  'rounded-[4px] px-2 py-1',
                  index === activeIndex
                    ? 'bg-customblue-40 text-white'
                    : 'text-primary-active bg-black',
                  child.props.className,
                  child.props.disabled ? 'ohif-disabled' : ''
                ),
                onClick: e => {
                  child.props.onClick && child.props.onClick(e);
                  handleButtonClick(index);
                },
              });
            }
            return child;
          })}
        </div>
      )}
      {separated && (
        <div className="flex space-x-2">
          {Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return cloneElement(child, {
                key: index,
                className: classnames(
                  'rounded-[4px] px-2 py-1',
                  index === activeIndex
                    ? 'bg-customblue-40 text-white'
                    : 'text-primary-active bg-black border-secondary-light rounded-[5px] border',
                  child.props.className,
                  child.props.disabled ? 'ohif-disabled' : ''
                ),
                onClick: e => {
                  child.props.onClick && child.props.onClick(e);
                  handleButtonClick(index);
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf(Object.values(ButtonEnums.orientation)),
  activeIndex: PropTypes.number,
  onActiveIndexChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
<<<<<<< HEAD
=======
  separated: PropTypes.bool,
>>>>>>> origin/master
};

export default ButtonGroup;
