import React from 'react';
<<<<<<< HEAD
import { PanelPetSUV, PanelROIThresholdSegmentation } from './Panels';
=======
import { PanelPetSUV, PanelROIThresholdExport } from './Panels';
>>>>>>> origin/master
import { Toolbox } from '@ohif/ui';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  const wrappedPanelPetSuv = () => {
    return (
      <PanelPetSUV
        commandsManager={commandsManager}
        servicesManager={servicesManager}
      />
    );
  };

  const wrappedROIThresholdToolbox = () => {
    return (
      <>
        <Toolbox
          commandsManager={commandsManager}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
<<<<<<< HEAD
          buttonSectionId="tmtvToolbox"
          title="Threshold Tools"
        />
        <PanelROIThresholdSegmentation
          commandsManager={commandsManager}
          servicesManager={servicesManager}
          extensionManager={extensionManager}
=======
          buttonSectionId="ROIThresholdToolbox"
          title="Threshold Tools"
        />
      </>
    );
  };

  const wrappedROIThresholdExport = () => {
    return (
      <>
        <PanelROIThresholdExport
          commandsManager={commandsManager}
          servicesManager={servicesManager}
>>>>>>> origin/master
        />
      </>
    );
  };

  return [
    {
      name: 'petSUV',
      iconName: 'tab-patient-info',
      iconLabel: 'Patient Info',
      label: 'Patient Info',
      component: wrappedPanelPetSuv,
    },
    {
<<<<<<< HEAD
      name: 'ROIThresholdSeg',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation',
      component: wrappedROIThresholdSeg,
=======
      name: 'tmtvBox',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation Toolbox',
      component: wrappedROIThresholdToolbox,
    },
    {
      name: 'tmtvExport',
      iconName: 'tab-segmentation',
      iconLabel: 'Segmentation',
      label: 'Segmentation Export',
      component: wrappedROIThresholdExport,
>>>>>>> origin/master
    },
  ];
}

export default getPanelModule;
