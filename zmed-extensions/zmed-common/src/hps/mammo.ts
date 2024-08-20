import {
  RCC,
  RMLO,
  LCC,
  LMLO,
} from './mammoSelector';

import stages from './mammoPresets';

const hpMammography = {
  id: '@zmed/mammo',
  hasUpdatedPriorsInformation: true,
  name: 'Mammography Breast Screening',
  protocolMatchingRules: [
    {
      id: 'Mammography',
      weight: 150,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: 'MG',
      },
      required: true,
    },
    {
      id: 'numberOfImages',
      attribute: 'numberOfDisplaySetsWithImages',
      constraint: {
        greaterThan: 2,
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    RCC,
    LCC,
    RMLO,
    LMLO,
  },

  stages: stages,
  // Indicates it is prior aware, but will work with no priors
  numberOfPriorsReferenced: 0,
};

export default hpMammography;
