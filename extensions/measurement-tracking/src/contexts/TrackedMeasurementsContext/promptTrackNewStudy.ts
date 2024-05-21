import i18n from 'i18next';

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4,
};

<<<<<<< HEAD:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js
function promptTrackNewStudy({ servicesManager, extensionManager }, ctx, evt) {
  const { UIViewportDialogService } = servicesManager.services;
  const { viewportId, StudyInstanceUID, SeriesInstanceUID } = evt;

  return new Promise(async function (resolve, reject) {
    let promptResult = await _askTrackMeasurements(UIViewportDialogService, viewportId);

    if (promptResult === RESPONSE.SET_STUDY_AND_SERIES) {
      promptResult = ctx.isDirty
        ? await _askSaveDiscardOrCancel(UIViewportDialogService, viewportId)
=======
function promptTrackNewStudy({ servicesManager, extensionManager }: withAppTypes, ctx, evt) {
  const { uiViewportDialogService } = servicesManager.services;
  // When the state change happens after a promise, the state machine sends the retult in evt.data;
  // In case of direct transition to the state, the state machine sends the data in evt;
  const { viewportId, StudyInstanceUID, SeriesInstanceUID } = evt.data || evt;

  return new Promise(async function (resolve, reject) {
    let promptResult = await _askTrackMeasurements(uiViewportDialogService, viewportId);

    if (promptResult === RESPONSE.SET_STUDY_AND_SERIES) {
      promptResult = ctx.isDirty
        ? await _askSaveDiscardOrCancel(uiViewportDialogService, viewportId)
>>>>>>> origin/master:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts
        : RESPONSE.SET_STUDY_AND_SERIES;
    }

    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave: false,
    });
  });
}

<<<<<<< HEAD:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js
function _askTrackMeasurements(UIViewportDialogService, viewportId) {
=======
function _askTrackMeasurements(
  UIViewportDialogService: AppTypes.UIViewportDialogService,
  viewportId
) {
>>>>>>> origin/master:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts
  return new Promise(function (resolve, reject) {
    const message = i18n.t('MeasurementTable:Track measurements for this series?');
    const actions = [
      { type: 'cancel', text: i18n.t('MeasurementTable:No'), value: RESPONSE.CANCEL },
      {
        type: 'secondary',
        text: i18n.t('MeasurementTable:No, do not ask again'),
        value: RESPONSE.NO_NOT_FOR_SERIES,
      },
      {
        type: 'primary',
        text: i18n.t('MeasurementTable:Yes'),
        value: RESPONSE.SET_STUDY_AND_SERIES,
      },
    ];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };

    UIViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          const action = actions.find(action => action.value === RESPONSE.SET_STUDY_AND_SERIES);
          onSubmit(action.value);
        }
      },
    });
  });
}

<<<<<<< HEAD:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.js
function _askSaveDiscardOrCancel(UIViewportDialogService, viewportId) {
=======
function _askSaveDiscardOrCancel(
  UIViewportDialogService: AppTypes.UIViewportDialogService,
  viewportId
) {
>>>>>>> origin/master:extensions/measurement-tracking/src/contexts/TrackedMeasurementsContext/promptTrackNewStudy.ts
  return new Promise(function (resolve, reject) {
    const message =
      'Measurements cannot span across multiple studies. Do you want to save your tracked measurements?';
    const actions = [
      { type: 'cancel', text: 'Cancel', value: RESPONSE.CANCEL },
      {
        type: 'secondary',
        text: 'No, discard previously tracked series & measurements',
        value: RESPONSE.SET_STUDY_AND_SERIES,
      },
      {
        type: 'primary',
        text: 'Yes',
        value: RESPONSE.CREATE_REPORT,
      },
    ];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };

    UIViewportDialogService.show({
      viewportId,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
    });
  });
}

export default promptTrackNewStudy;
