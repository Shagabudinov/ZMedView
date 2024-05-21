import { ButtonEnums } from '@ohif/ui';

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  HYDRATE_SEG: 5,
};

function promptHydrateSEG({
  servicesManager,
  segDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateSEGDisplaySet,
<<<<<<< HEAD
}) {
=======
}: withAppTypes) {
>>>>>>> origin/master
  const { uiViewportDialogService } = servicesManager.services;
  const extensionManager = servicesManager._extensionManager;
  const appConfig = extensionManager._appConfig;

  return new Promise(async function (resolve, reject) {
<<<<<<< HEAD
    const promptResult = await _askHydrate(uiViewportDialogService, viewportId);
=======
    const promptResult = appConfig?.disableConfirmationPrompts
      ? RESPONSE.HYDRATE_SEG
      : await _askHydrate(uiViewportDialogService, viewportId);
>>>>>>> origin/master

    if (promptResult === RESPONSE.HYDRATE_SEG) {
      preHydrateCallbacks?.forEach(callback => {
        callback();
      });

<<<<<<< HEAD
      const isHydrated = await hydrateSEGDisplaySet({
        segDisplaySet,
        viewportId,
      });
=======
      window.setTimeout(async () => {
        const isHydrated = await hydrateSEGDisplaySet({
          segDisplaySet,
          viewportId,
        });
>>>>>>> origin/master

        resolve(isHydrated);
      }, 0);
    }
  });
}

function _askHydrate(uiViewportDialogService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to open this Segmentation?';
    const actions = [
      {
        type: ButtonEnums.type.secondary,
        text: 'No',
        value: RESPONSE.CANCEL,
      },
      {
        type: ButtonEnums.type.primary,
        text: 'Yes',
        value: RESPONSE.HYDRATE_SEG,
      },
    ];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };

    uiViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          onSubmit(RESPONSE.HYDRATE_SEG);
        }
      },
    });
  });
}

export default promptHydrateSEG;
