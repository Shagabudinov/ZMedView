<<<<<<< HEAD
import { CommandsManager, ServicesManager } from '@ohif/core';
=======
import { CommandsManager } from '@ohif/core';
>>>>>>> origin/master

export type ColorMapPreset = {
  ColorSpace;
  description: string;
  RGBPoints;
  Name;
};

export type ColormapProps = {
  viewportId: string;
  commandsManager: CommandsManager;
<<<<<<< HEAD
  serviceManager: ServicesManager;
=======
  servicesManager: AppTypes.ServicesManager;
>>>>>>> origin/master
  colormaps: Array<ColorMapPreset>;
  displaySets: Array<any>;
};
