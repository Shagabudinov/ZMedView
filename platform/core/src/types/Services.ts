import {
  HangingProtocolService,
  CustomizationService,
  MeasurementService,
  ViewportGridService,
  ToolbarService,
  DisplaySetService,
  StateSyncService,
  UINotificationService,
  UIModalService,
  WorkflowStepsService,
  CineService,
  UserAuthenticationService,
  PanelService,
  UIDialogService,
  UIViewportDialogService,
} from '../services';

/**
 * The interface for the services object
 */

interface Services {
  hangingProtocolService?: HangingProtocolService;
  customizationService?: CustomizationService;
  measurementService?: MeasurementService;
  displaySetService?: DisplaySetService;
  toolbarService?: ToolbarService;
  viewportGridService?: ViewportGridService;
  uiModalService?: UIModalService;
  uiNotificationService?: UINotificationService;
  stateSyncService?: StateSyncService;
<<<<<<< HEAD
  cineService?: unknown;
  userAuthenticationService?: unknown;
  cornerstoneViewportService?: unknown;
  uiDialogService?: unknown;
  toolGroupService?: unknown;
  uiViewportDialogService?: unknown;
  syncGroupService?: unknown;
  cornerstoneCacheService?: unknown;
  segmentationService?: unknown;
  panelService?: unknown;
  colorbarService?: unknown;
=======
  workflowStepsService: WorkflowStepsService;
  cineService?: CineService;
  userAuthenticationService?: UserAuthenticationService;
  uiDialogService?: UIDialogService;
  uiViewportDialogService?: UIViewportDialogService;
  panelService?: PanelService;
>>>>>>> origin/master
}

export default Services;
