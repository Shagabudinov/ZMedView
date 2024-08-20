const rightDisplayArea = {
  type: 'FIT',
  storeAsInitialCamera: true,
  imageCanvasPoint: {
    imagePoint: [0, 0.5],
    canvasPoint: [0, 0.5],
  },
};

const leftDisplayArea = {
  type: 'FIT',
  storeAsInitialCamera: true,
  interpolationType: 'bicubic',
  imageCanvasPoint: {
    imagePoint: [1, 0.5],
    canvasPoint: [1, 0.5],
  },
};

const centerDisplayArea = {
  type: 'FIT',
  storeAsInitialCamera: true,
  imageCanvasPoint: {
    imagePoint: [0.5, 0.5],
    canvasPoint: [0.5, 0.5],
  },
};

const preset1 = {
  name: 'MLO/CC',
  icon: 'layout-common-2x2',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 2,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
      },
      displaySets: [
        {
          id: 'RMLO',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
      },
      displaySets: [
        {
          id: 'LMLO',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
      },
      displaySets: [
        {
          id: 'RCC',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
      },
      displaySets: [
        {
          id: 'LCC',
        },
      ],
    },
  ],
};

const preset2 = {
  name: 'RMLO/RCC',
  icon: 'layout-common-1x2',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 2,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: false,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RMLO',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        flipHorizontal: true,
        displayArea: rightDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RCC',
        },
      ],
    },
  ],
};

const preset3 = {
  name: 'LMLO/LCC',
  icon: 'layout-common-1x2',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 2,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LMLO',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LCC',
        },
      ],
    },
  ],
};

const preset4 = {
  name: 'MLO',
  icon: 'layout-common-1x2',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 2,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RMLO',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LMLO',
        },
      ],
    },
  ],
};

const preset5 = {
  name: 'CC',
  icon: 'layout-common-1x2',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 2,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RCC',
        },
      ],
    },
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LCC',
        },
      ],
    },
  ],
};

const preset6 = {
  name: 'RMLO',
  icon: 'layout-common-1x1',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 1,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: centerDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RMLO',
        },
      ],
    },
  ],
};

const preset7 = {
  name: 'RCC',
  icon: 'layout-common-1x1',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 1,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: centerDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'RCC',
        },
      ],
    },
  ],
};

const preset8 = {
  name: 'LMLO',
  icon: 'layout-common-1x1',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 1,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: centerDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LMLO',
        },
      ],
    },
  ],
};

const preset9 = {
  name: 'LCC',
  icon: 'layout-common-1x1',
  availableHps: ['@zmed/mammo'],
  viewportStructure: {
    type: 'grid',
    layoutType: 'grid',
    properties: {
      rows: 1,
      columns: 1,
    },
  },
  viewports: [
    {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: centerDisplayArea,
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'LCC',
        },
      ],
    },
  ],
};

const mammoPresets = [
  preset1,
  preset2,
  preset3,
  preset4,
  preset5,
  preset6,
  preset7,
  preset8,
  preset9,
];

export default mammoPresets;
