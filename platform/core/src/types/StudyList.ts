interface StudiesInfo {
  pages: number;
  size: number;
  total: number;
}

interface StudiesWithMatadata {
  study_instance_uid: string;
  uploaded_at?: string;
}

export interface StudiesMetadata {
  accession: string;
  date: string;
  description: string;
  instances: number;
  modalities: string;
  mrn: string;
  patientName: string;
  studyInstanceUid: string;
  time: string;
  uploadedAt?: string;
}

export interface StudyListWithPaginationQuery extends StudiesInfo {
  items: StudiesWithMatadata[];
}

export interface StudyListWithPagination extends StudiesInfo {
  studies: StudiesMetadata[];
}

export type SearchStudies = StudiesMetadata[] | StudyListWithPagination;

export type SearchParams = {
  me: boolean;
  pageNumber: number;
  resultsPerPage: number;
  size: number;
  studyInstanceUid: string[];
};
