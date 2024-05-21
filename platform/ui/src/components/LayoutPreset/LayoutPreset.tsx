import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import Icon from '../Icon/Icon';

function LayoutPreset({ onSelection, title, icon, commandOptions, classNames }) {
  return (
    <div
      className={classNames}
=======
import classNames from 'classnames';
import Icon from '../Icon/Icon';

function LayoutPreset({
  onSelection,
  title,
  icon,
  commandOptions,
  classNames: classNameProps,
  disabled,
}) {
  return (
    <div
      className={classNames(classNameProps, disabled && 'ohif-disabled')}
>>>>>>> origin/master
      onClick={() => {
        onSelection(commandOptions);
      }}
    >
      <Icon
        name={icon}
        className="group-hover:text-primary-light"
      />
      {title && <div className="font-inter text-sm text-white">{title}</div>}
    </div>
  );
}

LayoutPreset.defaultProps = {
  onSelection: () => {},
};

LayoutPreset.propTypes = {
  onSelection: PropTypes.func.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  commandOptions: PropTypes.object.isRequired,
  classNames: PropTypes.string,
<<<<<<< HEAD
=======
  disabled: PropTypes.bool,
>>>>>>> origin/master
};

export default LayoutPreset;
