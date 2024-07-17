interface IDisplaySet {
  displaySetInstanceUID: string;
  StudyInstanceUID: string;
  SeriesInstanceUID?: string;
  SeriesNumber?: string;
  unsupported?: boolean;
  Modality?: string;
  SeriesDate?: string;
  SeriesTime?: string;
  SeriesDescription?: string;
}

export default IDisplaySet;
