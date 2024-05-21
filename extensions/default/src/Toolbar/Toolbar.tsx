import React from 'react';
import { Tooltip } from '@ohif/ui';
import classnames from 'classnames';
import { useToolbar } from '@ohif/core';

<<<<<<< HEAD
export function Toolbar({ servicesManager }) {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection: 'primary',
=======
export function Toolbar({ servicesManager, buttonSection = 'primary' }) {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection,
>>>>>>> origin/master
  });

  if (!toolbarButtons.length) {
    return null;
  }

  return (
    <>
      {toolbarButtons.map(toolDef => {
        if (!toolDef) {
          return null;
        }

        const { id, Component, componentProps } = toolDef;
        const tool = (
          <Component
            key={id}
            id={id}
            onInteraction={onInteraction}
            servicesManager={servicesManager}
            {...componentProps}
          />
<<<<<<< HEAD
        );

        return (
          <div
            key={id}
            className="mr-1"
          >
            {tool}
          </div>
=======
>>>>>>> origin/master
        );

        return <div key={id}>{tool}</div>;
      })}
    </>
  );
}
