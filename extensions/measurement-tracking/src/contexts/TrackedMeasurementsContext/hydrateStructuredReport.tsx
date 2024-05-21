import { hydrateStructuredReport as baseHydrateStructuredReport } from '@ohif/extension-cornerstone-dicom-sr';

<<<<<<< HEAD
function hydrateStructuredReport({ servicesManager, extensionManager, appConfig }, ctx, evt) {
=======
function hydrateStructuredReport(
  { servicesManager, extensionManager, appConfig }: withAppTypes,
  ctx,
  evt
) {
>>>>>>> origin/master
  const { displaySetService } = servicesManager.services;
  const { viewportId, displaySetInstanceUID } = evt;
  const srDisplaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

  return new Promise((resolve, reject) => {
    const hydrationResult = baseHydrateStructuredReport(
      { servicesManager, extensionManager, appConfig },
      displaySetInstanceUID
    );

    const StudyInstanceUID = hydrationResult.StudyInstanceUID;
    const SeriesInstanceUIDs = hydrationResult.SeriesInstanceUIDs;

    resolve({
      displaySetInstanceUID: evt.displaySetInstanceUID,
      srSeriesInstanceUID: srDisplaySet.SeriesInstanceUID,
      viewportId,
      StudyInstanceUID,
      SeriesInstanceUIDs,
    });
  });
}

export default hydrateStructuredReport;
