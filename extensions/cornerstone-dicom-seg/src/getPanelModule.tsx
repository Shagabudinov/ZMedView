import React from 'react';

import { useAppConfig } from '@state';
import { Toolbox } from '@ohif/ui';
import PanelSegmentation from './panels/PanelSegmentation';
<<<<<<< HEAD
import { SegmentationPanelMode } from './types/segmentation';
=======
>>>>>>> origin/master

const getPanelModule = ({
  commandsManager,
  servicesManager,
  extensionManager,
  configuration,
  title,
<<<<<<< HEAD
}) => {
=======
}: withAppTypes) => {
>>>>>>> origin/master
  const { customizationService } = servicesManager.services;

  const wrappedPanelSegmentation = configuration => {
    const [appConfig] = useAppConfig();

<<<<<<< HEAD
    const disableEditingForMode = customizationService.get('segmentation.disableEditing');
    const segmentationPanelMode =
      customizationService.get('segmentation.segmentationPanelMode')?.value ||
      SegmentationPanelMode.Dropdown;

=======
>>>>>>> origin/master
    return (
      <PanelSegmentation
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
        configuration={{
          ...configuration,
<<<<<<< HEAD
          disableEditing: appConfig.disableEditing || disableEditingForMode?.value,
          segmentationPanelMode: segmentationPanelMode,
=======
          disableEditing: appConfig.disableEditing,
          ...customizationService.get('segmentation.panel'),
>>>>>>> origin/master
        }}
      />
    );
  };

  const wrappedPanelSegmentationWithTools = configuration => {
    const [appConfig] = useAppConfig();
<<<<<<< HEAD
    const segmentationPanelMode =
      customizationService.get('segmentation.segmentationPanelMode')?.value ||
      SegmentationPanelMode.Dropdown;
=======
>>>>>>> origin/master

    return (
      <>
        <Toolbox
          commandsManager={commandsManager}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          buttonSectionId="segmentationToolbox"
          title="Segmentation Tools"
          configuration={{
            ...configuration,
          }}
        />
        <PanelSegmentation
          commandsManager={commandsManager}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          configuration={{
            ...configuration,
<<<<<<< HEAD
            segmentationPanelMode: segmentationPanelMode,
=======
            disableEditing: appConfig.disableEditing,
            ...customizationService.get('segmentation.panel'),
>>>>>>> origin/master
          }}
        />
      </>
    );
  };

  return [
    {
      name: 'panelSegmentation',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentation,
    },
    {
      name: 'panelSegmentationWithTools',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedPanelSegmentationWithTools,
    },
  ];
};

export default getPanelModule;
