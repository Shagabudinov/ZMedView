import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LayoutSelector as OHIFLayoutSelector, ToolbarButton } from '@ohif/ui';
<<<<<<< HEAD
import { ServicesManager } from '@ohif/core';

function LegacyLayoutSelectorWithServices({ servicesManager, ...props }) {
=======

function LegacyLayoutSelectorWithServices({ servicesManager, ...props }: withAppTypes) {
>>>>>>> origin/master
  const { toolbarService } = servicesManager.services;

  const onSelection = useCallback(
    props => {
      toolbarService.recordInteraction({
        interactionType: 'action',
        commands: [
          {
            commandName: 'setViewportGridLayout',
            commandOptions: { ...props },
            context: 'DEFAULT',
          },
        ],
      });
    },
    [toolbarService]
  );

  return (
    <LayoutSelector
      {...props}
      onSelection={onSelection}
    />
  );
}

function LayoutSelector({ rows, columns, className, onSelection, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeOnOutsideClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeOnOutsideClick);
    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
    };
  }, [isOpen]);

  const onInteractionHandler = () => setIsOpen(!isOpen);
  const DropdownContent = isOpen ? OHIFLayoutSelector : null;

  return (
    <ToolbarButton
      id="Layout"
      label="Grid Layout"
      icon="tool-layout"
      onInteraction={onInteractionHandler}
      className={className}
      rounded={rest.rounded}
      dropdownContent={
        DropdownContent !== null && (
          <DropdownContent
            rows={rows}
            columns={columns}
            onSelection={onSelection}
          />
        )
      }
      isActive={isOpen}
      type="toggle"
    />
  );
}

LayoutSelector.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  onLayoutChange: PropTypes.func,
<<<<<<< HEAD
  servicesManager: PropTypes.instanceOf(ServicesManager),
=======
  servicesManager: PropTypes.object.isRequired,
>>>>>>> origin/master
};

LayoutSelector.defaultProps = {
  rows: 3,
  columns: 3,
  onLayoutChange: () => {},
};

export default LegacyLayoutSelectorWithServices;
