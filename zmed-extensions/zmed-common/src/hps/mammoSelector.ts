const currentStudyMatchingRules = [
  {
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: { value: 0 },
    },
  },
];

const LCCSeriesMatchingRules = [
  {
    weight: 5,
    attribute: 'ImageLaterality',
    constraint: {
      contains: 'L',
    },
  },
  {
    weight: 20,
    attribute: 'ViewPosition',
    constraint: {
      contains: 'CC',
    },
  },
];

const RCCSeriesMatchingRules = [
  {
    weight: 5,
    attribute: 'ImageLaterality',
    constraint: {
      contains: 'R',
    },
  },
  {
    weight: 20,
    attribute: 'ViewPosition',
    constraint: {
      contains: 'CC',
    },
  },
];

const LMLOSeriesMatchingRules = [
  {
    weight: 5,
    attribute: 'ImageLaterality',
    constraint: {
      contains: 'L',
    },
  },
  {
    weight: 20,
    attribute: 'ViewPosition',
    constraint: {
      contains: 'ML' || 'MLO',
    },
  },
];

const RMLOSeriesMatchingRules = [
  {
    weight: 5,
    attribute: 'ImageLaterality',
    constraint: {
      contains: 'R',
    },
  },
  {
    weight: 20,
    attribute: 'ViewPosition',
    constraint: {
      contains: 'ML' || 'MLO',
    },
  },
];

const RCC = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules,
};

const LCC = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules,
};

const RMLO = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules,
};

const LMLO = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules,
};

export { RCC, LCC, RMLO, LMLO };
