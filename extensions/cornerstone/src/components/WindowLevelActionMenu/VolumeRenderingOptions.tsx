import React, { ReactElement } from 'react';
import { AllInOneMenu } from '@ohif/ui';
import { VolumeRenderingOptionsProps } from '../../types/ViewportPresets';
import { VolumeRenderingQuality } from './VolumeRenderingQuality';
import { VolumeShift } from './VolumeShift';
import { VolumeLighting } from './VolumeLighting';
import { VolumeShade } from './VolumeShade';
export function VolumeRenderingOptions({
  viewportId,
  commandsManager,
  volumeRenderingQualityRange,
<<<<<<< HEAD
  serviceManager,
=======
  servicesManager,
>>>>>>> origin/master
}: VolumeRenderingOptionsProps): ReactElement {
  return (
    <AllInOneMenu.ItemPanel>
      <VolumeRenderingQuality
        viewportId={viewportId}
        commandsManager={commandsManager}
<<<<<<< HEAD
        serviceManager={serviceManager}
=======
        servicesManager={servicesManager}
>>>>>>> origin/master
        volumeRenderingQualityRange={volumeRenderingQualityRange}
      />

      <VolumeShift
        viewportId={viewportId}
        commandsManager={commandsManager}
<<<<<<< HEAD
        serviceManager={serviceManager}
      />
      <div className="all-in-one-menu-item flex w-full justify-start">
        <div className="text-aqua-pale text-[13px]">LIGHTING</div>
      </div>
      <AllInOneMenu.DividerItem />
      <div className="all-in-one-menu-item flex w-full justify-center">
        <VolumeShade
          commandsManager={commandsManager}
          serviceManager={serviceManager}
=======
        servicesManager={servicesManager}
      />
      <div className="all-in-one-menu-item mt-2 flex !h-[20px] w-full justify-start">
        <div className="text-aqua-pale text-[13px]">LIGHTING</div>
      </div>
      <div className="bg-primary-dark mt-1 mb-1 h-[2px] w-full"></div>
      <div className="all-in-one-menu-item flex w-full justify-center">
        <VolumeShade
          commandsManager={commandsManager}
          servicesManager={servicesManager}
>>>>>>> origin/master
          viewportId={viewportId}
        />
      </div>
      <VolumeLighting
        viewportId={viewportId}
        commandsManager={commandsManager}
<<<<<<< HEAD
        serviceManager={serviceManager}
=======
        servicesManager={servicesManager}
>>>>>>> origin/master
      />
    </AllInOneMenu.ItemPanel>
  );
}
