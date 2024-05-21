import React, { useState } from 'react';
import { Icon } from '@ohif/ui';
import PropTypes from 'prop-types';

<<<<<<< HEAD
const PanelSection = ({ title, children, actionIcons = [] }) => {
=======
const PanelSection = ({ title, children, actionIcons = [], childrenClassName }) => {
>>>>>>> origin/master
  const [areChildrenVisible, setChildrenVisible] = useState(true);

  const handleHeaderClick = () => {
    setChildrenVisible(!areChildrenVisible);
  };

  return (
    <>
      <div
        className="bg-secondary-dark mt-[2px] flex h-7 cursor-pointer select-none items-center justify-between rounded-[4px] pl-2.5 text-[13px]"
        onClick={handleHeaderClick}
      >
        <div className="text-aqua-pale">{title}</div>
        <div className="flex items-center space-x-1">
          {actionIcons.map((icon, index) => (
            <Icon
              key={index}
              name={icon.name}
              onClick={e => {
                e.stopPropagation();
                if (!areChildrenVisible) {
                  setChildrenVisible(true);
                }
                icon.onClick();
              }}
            />
          ))}
          <div className="grid h-[28px] w-[28px] place-items-center">
            <Icon name={areChildrenVisible ? 'chevron-down-new' : 'chevron-left-new'} />
          </div>
        </div>
      </div>
      {areChildrenVisible && (
        <>
<<<<<<< HEAD
          <div className="bg-primary-dark rounded-b-[4px]">{children}</div>
=======
          <div className="h-[2px] bg-black"></div>
          <div
            className={`bg-primary-dark flex flex-col overflow-hidden rounded-b-[4px] ${childrenClassName}`}
          >
            {children}
          </div>
>>>>>>> origin/master
        </>
      )}
    </>
  );
};

PanelSection.defaultProps = {};

PanelSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
<<<<<<< HEAD
=======
  childrenClassName: PropTypes.string,
>>>>>>> origin/master
  actionIcons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default PanelSection;
