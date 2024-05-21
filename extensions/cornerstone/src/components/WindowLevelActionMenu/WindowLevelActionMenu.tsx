import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { AllInOneMenu, useViewportGrid } from '@ohif/ui';
<<<<<<< HEAD
import { CommandsManager, ServicesManager } from '@ohif/core';
=======
>>>>>>> origin/master
import { Colormap } from './Colormap';
import { Colorbar } from './Colorbar';
import { setViewportColorbar } from './Colorbar';
import { WindowLevelPreset } from '../../types/WindowLevel';
import { ColorbarProperties } from '../../types/Colorbar';
import { VolumeRenderingQualityRange } from '../../types/ViewportPresets';
import { WindowLevel } from './WindowLevel';
import { VolumeRenderingPresets } from './VolumeRenderingPresets';
import { VolumeRenderingOptions } from './VolumeRenderingOptions';
import { ViewportPreset } from '../../types/ViewportPresets';
import { VolumeViewport3D } from '@cornerstonejs/core';
import { utilities } from '@cornerstonejs/core';

export type WindowLevelActionMenuProps = {
  viewportId: string;
  element: HTMLElement;
<<<<<<< HEAD
  presets: Record<string, Array<WindowLevelPreset>>;
  verticalDirection: AllInOneMenu.VerticalDirection;
  horizontalDirection: AllInOneMenu.HorizontalDirection;
  commandsManager: CommandsManager;
  serviceManager: ServicesManager;
=======
  presets: Array<Record<string, Array<WindowLevelPreset>>>;
  verticalDirection: AllInOneMenu.VerticalDirection;
  horizontalDirection: AllInOneMenu.HorizontalDirection;
>>>>>>> origin/master
  colorbarProperties: ColorbarProperties;
  displaySets: Array<any>;
  volumeRenderingPresets: Array<ViewportPreset>;
  volumeRenderingQualityRange: VolumeRenderingQualityRange;
};

export function WindowLevelActionMenu({
  viewportId,
  element,
  presets,
  verticalDirection,
  horizontalDirection,
  commandsManager,
<<<<<<< HEAD
  serviceManager,
=======
  servicesManager,
>>>>>>> origin/master
  colorbarProperties,
  displaySets,
  volumeRenderingPresets,
  volumeRenderingQualityRange,
<<<<<<< HEAD
}: WindowLevelActionMenuProps): ReactElement {
=======
}: withAppTypes<WindowLevelActionMenuProps>): ReactElement {
>>>>>>> origin/master
  const {
    colormaps,
    colorbarContainerPosition,
    colorbarInitialColormap,
    colorbarTickPosition,
    width: colorbarWidth,
  } = colorbarProperties;
<<<<<<< HEAD
  const { colorbarService, cornerstoneViewportService } = serviceManager.services;
  const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
=======
  const { colorbarService, cornerstoneViewportService } = servicesManager.services;
  const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
  const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
>>>>>>> origin/master
  const backgroundColor = viewportInfo.getViewportOptions().background;
  const isLight = backgroundColor ? utilities.isEqual(backgroundColor, [1, 1, 1]) : false;

  const nonImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];

  const { t } = useTranslation('WindowLevelActionMenu');

  const [viewportGrid] = useViewportGrid();
  const { activeViewportId } = viewportGrid;

  const [vpHeight, setVpHeight] = useState(element?.clientHeight);
  const [menuKey, setMenuKey] = useState(0);
  const [is3DVolume, setIs3DVolume] = useState(false);

  const onSetColorbar = useCallback(() => {
<<<<<<< HEAD
    setViewportColorbar(viewportId, displaySets, commandsManager, serviceManager, {
=======
    setViewportColorbar(viewportId, displaySets, commandsManager, servicesManager, {
>>>>>>> origin/master
      colormaps,
      ticks: {
        position: colorbarTickPosition,
      },
      width: colorbarWidth,
      position: colorbarContainerPosition,
      activeColormapName: colorbarInitialColormap,
    });
  }, [commandsManager]);

  useEffect(() => {
    const newVpHeight = element?.clientHeight;
    if (vpHeight !== newVpHeight) {
      setVpHeight(newVpHeight);
    }
  }, [element, vpHeight]);

  useEffect(() => {
    if (!colorbarService.hasColorbar(viewportId)) {
      return;
    }
    window.setTimeout(() => {
      colorbarService.removeColorbar(viewportId);
      onSetColorbar();
    }, 0);
<<<<<<< HEAD
  }, [viewportId]);

  useEffect(() => {
    if (colorbarService.hasColorbar(viewportId)) {
      colorbarService.removeColorbar(viewportId);
    }
  }, [displaySets]);
=======
  }, [viewportId, displaySets, viewport]);
>>>>>>> origin/master

  useEffect(() => {
    setMenuKey(menuKey + 1);
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (viewport instanceof VolumeViewport3D) {
      setIs3DVolume(true);
    } else {
      setIs3DVolume(false);
    }
  }, [
    displaySets,
    viewportId,
    presets,
    volumeRenderingQualityRange,
    volumeRenderingPresets,
    colorbarProperties,
    activeViewportId,
    viewportGrid,
  ]);

  return (
    <AllInOneMenu.IconMenu
      icon="viewport-window-level"
      verticalDirection={verticalDirection}
      horizontalDirection={horizontalDirection}
      iconClassName={classNames(
        // Visible on hover and for the active viewport
        activeViewportId === viewportId ? 'visible' : 'invisible group-hover:visible',
<<<<<<< HEAD
        'flex shrink-0 cursor-pointer rounded active:text-white',
        isLight
          ? 'text-aqua-pale hover:bg-secondary-dark'
          : 'text-primary-light hover:bg-secondary-light/60'
=======
        'flex shrink-0 cursor-pointer rounded active:text-white text-primary-light',
        isLight ? ' hover:bg-secondary-dark' : 'hover:bg-secondary-light/60'
>>>>>>> origin/master
      )}
      menuStyle={{ maxHeight: vpHeight - 32, minWidth: 218 }}
      onVisibilityChange={() => {
        setVpHeight(element.clientHeight);
      }}
      menuKey={menuKey}
    >
      <AllInOneMenu.ItemPanel>
        {!is3DVolume && (
          <Colorbar
            viewportId={viewportId}
            displaySets={displaySets.filter(ds => !nonImageModalities.includes(ds.Modality))}
            commandsManager={commandsManager}
<<<<<<< HEAD
            serviceManager={serviceManager}
=======
            servicesManager={servicesManager}
>>>>>>> origin/master
            colorbarProperties={colorbarProperties}
          />
        )}

        {colormaps && !is3DVolume && (
          <AllInOneMenu.SubMenu
            key="colorLUTPresets"
            itemLabel="Color LUT"
            itemIcon="icon-color-lut"
          >
            <Colormap
              colormaps={colormaps}
              viewportId={viewportId}
              displaySets={displaySets.filter(ds => !nonImageModalities.includes(ds.Modality))}
              commandsManager={commandsManager}
<<<<<<< HEAD
              serviceManager={serviceManager}
=======
              servicesManager={servicesManager}
>>>>>>> origin/master
            />
          </AllInOneMenu.SubMenu>
        )}

<<<<<<< HEAD
        {presets && !is3DVolume && (
          <AllInOneMenu.SubMenu
            key="windowLevelPresets"
            itemLabel={t('Modality Window Presets', { modality: Object.keys(presets)[0] })}
=======
        {presets && presets.length > 0 && !is3DVolume && (
          <AllInOneMenu.SubMenu
            key="windowLevelPresets"
            itemLabel={t('Modality Window Presets')}
>>>>>>> origin/master
            itemIcon="viewport-window-level"
          >
            <WindowLevel
              viewportId={viewportId}
              commandsManager={commandsManager}
              presets={presets}
            />
          </AllInOneMenu.SubMenu>
        )}

        {volumeRenderingPresets && is3DVolume && (
          <VolumeRenderingPresets
<<<<<<< HEAD
            serviceManager={serviceManager}
=======
            servicesManager={servicesManager}
>>>>>>> origin/master
            viewportId={viewportId}
            commandsManager={commandsManager}
            volumeRenderingPresets={volumeRenderingPresets}
          />
        )}

        {volumeRenderingQualityRange && is3DVolume && (
          <AllInOneMenu.SubMenu itemLabel="Rendering Options">
            <VolumeRenderingOptions
              viewportId={viewportId}
              commandsManager={commandsManager}
              volumeRenderingQualityRange={volumeRenderingQualityRange}
<<<<<<< HEAD
              serviceManager={serviceManager}
=======
              servicesManager={servicesManager}
>>>>>>> origin/master
            />
          </AllInOneMenu.SubMenu>
        )}
      </AllInOneMenu.ItemPanel>
    </AllInOneMenu.IconMenu>
  );
}
