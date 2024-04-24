window.config = {
  routerBasename: '/',
  // whiteLabeling: {},
  extensions: [],
  modes: [],
  customizationService: {
    // Shows a custom route -access via http://localhost:3000/custom
    // helloPage: '@ohif/extension-default.customizationModule.helloPage',
    worksheet: `zmed-common.customizationModule.worksheet`,
    dicomUploadComponent:
      '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  showStudyList: false,
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  // filterQueryParam: false,
  defaultDataSourceName: 'zmed-dicomweb',
  /* Dynamic config allows user to pass "configUrl" query string this allows to load config without recompiling application. The regex will ensure valid configuration source */
  // dangerouslyUseDynamicConfig: {
  //   enabled: true,
  //   // regex will ensure valid configuration source and default is /.*/ which matches any character. To use this, setup your own regex to choose a specific source of configuration only.
  //   // Example 1, to allow numbers and letters in an absolute or sub-path only.
  //   // regex: /(0-9A-Za-z.]+)(\/[0-9A-Za-z.]+)*/
  //   // Example 2, to restricts to either hosptial.com or othersite.com.
  //   // regex: /(https:\/\/hospital.com(\/[0-9A-Za-z.]+)*)|(https:\/\/othersite.com(\/[0-9A-Za-z.]+)*)/
  //   regex: /.*/,
  // },
  dataSources: [
    {
      namespace: 'zmed-common.dataSourcesModule.zmed-dicomweb',
      sourceName: 'zmed-dicomweb',
      configuration: {
        friendlyName: 'Orthanc Server',
        name: 'Orthanc',
        // wadoUriRoot: 'http://52.29.40.199:8042/wado',
        // qidoRoot: 'http://52.29.40.199:8042/dicom-web',
        // wadoRoot: 'http://52.29.40.199:8042/dicom-web',
        wadoUriRoot: 'https://app.zmed.z-union.ru/pacs/wado',
        qidoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
        wadoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
        // wadoUriRoot: 'https://app.zmed.z-union.ru/pacs/wado',
        // qidoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
        // wadoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        omitQuotationForMultipartRequest: true,
        supportsReject: false,
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: false,
        singlepart: 'bulkdata,video',
        dicomUploadEnabled: true,
        bulkDataURI: {
          enabled: true,
        },
        personalAccountUri: 'https://app.zmed.z-union.ru/personal',
      },
    },
    // {
    //   namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
    //   sourceName: 'zmed-dicomweb',
    //   configuration: {
    //     friendlyName: 'Orthanc Server',
    //     name: 'Orthanc',
    //     wadoUriRoot: 'https://app.zmed.z-union.ru/pacs/wado',
    //     qidoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
    //     wadoRoot: 'https://app.zmed.z-union.ru/pacs/dicom-web',
    //     qidoSupportsIncludeField: false,
    //     imageRendering: 'wadors',
    //     thumbnailRendering: 'wadors',
    //     omitQuotationForMultipartRequest: true,
    //     supportsReject: false,
    //     enableStudyLazyLoad: true,
    //     supportsFuzzyMatching: false,
    //     supportsWildcard: true,
    //     staticWado: false,
    //     singlepart: 'bulkdata,video',
    //     dicomUploadEnabled: true,
    //     bulkDataURI: {
    //       enabled: true,
    //     },
    //     omitQuotationForMultipartRequest: true,
    //   },
    // },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://app.zmed.z-union.ru/');
  },
  zmedtools: {
    covidURL: 'https://app.zmed.z-union.ru/zmedtools/',
    mammoURL: 'https://app.zmed.z-union.ru/zmedtools/',
    innpolisURL: 'https://app.zmed.z-union.ru/zmedtools/',
  },
  // This is an array, but we'll only use the first entry for now
  // oidc: [
  //   {
  //     // ~ REQUIRED
  //     // Authorization Server URL
  //     authority: 'http://localhost:18080/auth/realms/ohif',
  //     client_id: 'ohif-viewer',
  //     redirect_uri: 'http://localhost:3000/callback', // `OHIFStandaloneViewer.js`
  //     // "Authorization Code Flow"
  //     // Resource: https://medium.com/@darutk/diagrams-of-all-the-openid-connect-flows-6968e3990660
  //     response_type: 'code',
  //     scope: 'openid', // email profile openidl
  //     // ~ OPTIONAL
  //     post_logout_redirect_uri: '/logout-redirect.html',
  //   },
  // ],
  oidc: [
    {
      // ~ REQUIRED
      // Authorization Server URL
      authority: 'https://app.zmed.z-union.ru/auth/realms/ohif',
      client_id: 'ohif-viewer',
      redirect_uri: 'http://localhost:3000/callback', // `OHIFStandaloneViewer.js`
      // "Authorization Code Flow"
      // Resource: https://medium.com/@darutk/diagrams-of-all-the-openid-connect-flows-6968e3990660
      response_type: 'code',
      scope: 'openid', // email profile openid
      // ~ OPTIONAL
      post_logout_redirect_uri: '/logout-redirect.html',
    },
  ],
  whiteLabeling: {
    /* Optional: Should return a React component to be rendered in the "Logo" section of the application's Top Navigation bar */
    createLogoComponentFn: function(React) {
      return React.createElement(
        'a',
        {
          target: '_self',
          rel: 'noopener noreferrer',
          className: 'text-purple-600 line-through',
          href: '/',
        },
        React.createElement('img', {
          src: './zmed-logo.svg',
          // className: 'w-8 h-8',
        })
      );
    },
  },
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    // ~ Window level presets
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
};
