<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { SidePanel } from '@ohif/ui';
import { PanelService, ServicesManager } from '@ohif/core';

export type SidePanelWithServicesProps = {
  servicesManager: ServicesManager;
=======
import React, { useEffect, useState, useCallback } from 'react';
import { SidePanel } from '@ohif/ui';
import { Types } from '@ohif/core';

export type SidePanelWithServicesProps = {
  servicesManager: AppTypes.ServicesManager;
>>>>>>> origin/master
  side: 'left' | 'right';
  className: string;
  activeTabIndex: number;
  tabs: any;
  expandedWidth?: number;
};

const SidePanelWithServices = ({
  servicesManager,
  side,
<<<<<<< HEAD
  className,
  activeTabIndex: activeTabIndexProp,
  tabs,
  expandedWidth,
}: SidePanelWithServicesProps) => {
  const panelService: PanelService = servicesManager?.services?.panelService;
=======
  activeTabIndex: activeTabIndexProp,
  tabs: tabsProp,
  expandedWidth,
  ...props
}: SidePanelWithServicesProps) => {
  const panelService = servicesManager?.services?.panelService;
>>>>>>> origin/master

  // Tracks whether this SidePanel has been opened at least once since this SidePanel was inserted into the DOM.
  // Thus going to the Study List page and back to the viewer resets this flag for a SidePanel.
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(activeTabIndexProp);
<<<<<<< HEAD

  useEffect(() => {
    if (panelService) {
      const activatePanelSubscription = panelService.subscribe(
        panelService.EVENTS.ACTIVATE_PANEL,
        (activatePanelEvent: Types.ActivatePanelEvent) => {
          if (!hasBeenOpened || activatePanelEvent.forceActive) {
            const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
            if (tabIndex !== -1) {
              setActiveTabIndex(tabIndex);
            }
          }
        }
      );

      return () => {
        activatePanelSubscription.unsubscribe();
      };
    }
=======
  const [tabs, setTabs] = useState(tabsProp ?? panelService.getPanels(side));

  const handleSidePanelOpen = useCallback(() => {
    setHasBeenOpened(true);
  }, []);

  const handleActiveTabIndexChange = useCallback(({ activeTabIndex }) => {
    setActiveTabIndex(activeTabIndex);
  }, []);

  /** update the active tab index from outside */
  useEffect(() => {
    setActiveTabIndex(activeTabIndexProp);
  }, [activeTabIndexProp]);

  useEffect(() => {
    const { unsubscribe } = panelService.subscribe(
      panelService.EVENTS.PANELS_CHANGED,
      panelChangedEvent => {
        if (panelChangedEvent.position !== side) {
          return;
        }

        setTabs(panelService.getPanels(side));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [panelService, side]);

  useEffect(() => {
    const activatePanelSubscription = panelService.subscribe(
      panelService.EVENTS.ACTIVATE_PANEL,
      (activatePanelEvent: Types.ActivatePanelEvent) => {
        if (!hasBeenOpened || activatePanelEvent.forceActive) {
          const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
          if (tabIndex !== -1) {
            setActiveTabIndex(tabIndex);
          }
        }
      }
    );

    return () => {
      activatePanelSubscription.unsubscribe();
    };
>>>>>>> origin/master
  }, [tabs, hasBeenOpened, panelService]);

  return (
    <SidePanel
<<<<<<< HEAD
      side={side}
      className={className}
      activeTabIndex={activeTabIndex}
      tabs={tabs}
      onOpen={() => {
        setHasBeenOpened(true);
      }}
=======
      {...props}
      side={side}
      tabs={tabs}
      activeTabIndex={activeTabIndex}
      onOpen={handleSidePanelOpen}
      onActiveTabIndexChange={handleActiveTabIndexChange}
>>>>>>> origin/master
      expandedWidth={expandedWidth}
    ></SidePanel>
  );
};

export default SidePanelWithServices;
