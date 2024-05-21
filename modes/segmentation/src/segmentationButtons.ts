import type { Button } from '@ohif/core/types';

<<<<<<< HEAD
function _createSetToolActiveCommands(toolName) {
  return [
    {
      commandName: 'setToolActive',
      commandOptions: {
        toolName,
      },
    },
  ];
}

=======
>>>>>>> origin/master
const toolbarButtons: Button[] = [
  {
    id: 'BrushTools',
    uiType: 'ohif.buttonGroup',
    props: {
      groupId: 'BrushTools',
      items: [
        {
          id: 'Brush',
          icon: 'icon-tool-brush',
          label: 'Brush',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
<<<<<<< HEAD
            options: { toolNames: ['CircularBrush', 'SphereBrush'] },
            disabledText: 'Create new segmentation to enable this tool.',
          },
          commands: _createSetToolActiveCommands('CircularBrush'),
=======
            toolNames: ['CircularBrush', 'SphereBrush'],
            disabledText: 'Create new segmentation to enable this tool.',
          },
>>>>>>> origin/master
          options: [
            {
              name: 'Radius (mm)',
              id: 'brush-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: { toolNames: ['CircularBrush', 'SphereBrush'] },
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'brush-mode',
              value: 'CircularBrush',
              values: [
                { value: 'CircularBrush', label: 'Circle' },
                { value: 'SphereBrush', label: 'Sphere' },
              ],
              commands: 'setToolActiveToolbar',
            },
          ],
        },
        {
          id: 'Eraser',
          icon: 'icon-tool-eraser',
          label: 'Eraser',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
<<<<<<< HEAD
            options: {
              toolNames: ['CircularEraser', 'SphereEraser'],
            },
          },
          commands: _createSetToolActiveCommands('CircularEraser'),
=======
            toolNames: ['CircularEraser', 'SphereEraser'],
          },
>>>>>>> origin/master
          options: [
            {
              name: 'Radius (mm)',
              id: 'eraser-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: { toolNames: ['CircularEraser', 'SphereEraser'] },
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'eraser-mode',
              value: 'CircularEraser',
              values: [
                { value: 'CircularEraser', label: 'Circle' },
                { value: 'SphereEraser', label: 'Sphere' },
              ],
              commands: 'setToolActiveToolbar',
            },
          ],
        },
        {
          id: 'Threshold',
          icon: 'icon-tool-threshold',
          label: 'Threshold Tool',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
<<<<<<< HEAD
            options: { toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'] },
          },
          commands: _createSetToolActiveCommands('ThresholdCircularBrush'),
=======
            toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
          },
>>>>>>> origin/master
          options: [
            {
              name: 'Radius (mm)',
              id: 'threshold-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: {
<<<<<<< HEAD
                  toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
                },
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'eraser-mode',
              value: 'ThresholdCircularBrush',
              values: [
                { value: 'ThresholdCircularBrush', label: 'Circle' },
                { value: 'ThresholdSphereBrush', label: 'Sphere' },
              ],
              commands: 'setToolActiveToolbar',
            },
=======
                  toolNames: [
                    'ThresholdCircularBrush',
                    'ThresholdSphereBrush',
                    'ThresholdCircularBrushDynamic',
                  ],
                },
              },
            },

>>>>>>> origin/master
            {
              name: 'Threshold',
              type: 'radio',
              id: 'dynamic-mode',
              value: 'ThresholdRange',
              values: [
                { value: 'ThresholdDynamic', label: 'Dynamic' },
                { value: 'ThresholdRange', label: 'Range' },
              ],
<<<<<<< HEAD
              commands: {
                commandName: 'toggleThresholdRangeAndDynamic',
              },
            },
            {
=======
              commands: ({ value, commandsManager, options }) => {
                if (value === 'ThresholdDynamic') {
                  commandsManager.run('setToolActive', {
                    toolName: 'ThresholdCircularBrushDynamic',
                  });

                  return;
                }

                // check the condition of the threshold-range option
                const thresholdRangeOption = options.find(
                  option => option.id === 'threshold-shape'
                );

                commandsManager.run('setToolActiveToolbar', {
                  toolName: thresholdRangeOption.value,
                });
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'threshold-shape',
              value: 'ThresholdCircularBrush',
              values: [
                { value: 'ThresholdCircularBrush', label: 'Circle' },
                { value: 'ThresholdSphereBrush', label: 'Sphere' },
              ],
              condition: ({ options }) =>
                options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
              commands: 'setToolActiveToolbar',
            },
            {
>>>>>>> origin/master
              name: 'ThresholdRange',
              type: 'double-range',
              id: 'threshold-range',
              min: -1000,
              max: 1000,
              step: 1,
<<<<<<< HEAD
              values: [100, 600],
=======
              value: [100, 600],
>>>>>>> origin/master
              condition: ({ options }) =>
                options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
              commands: {
                commandName: 'setThresholdRange',
                commandOptions: {
                  toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'Shapes',
    uiType: 'ohif.radioGroup',
    props: {
      label: 'Shapes',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
<<<<<<< HEAD
        options: { toolNames: ['CircleScissor', 'SphereScissor', 'RectangleScissor'] },
      },
      icon: 'icon-tool-shape',
      commands: _createSetToolActiveCommands('CircleScissor'),
=======
        toolNames: ['CircleScissor', 'SphereScissor', 'RectangleScissor'],
      },
      icon: 'icon-tool-shape',
>>>>>>> origin/master
      options: [
        {
          name: 'Shape',
          type: 'radio',
          value: 'CircleScissor',
          id: 'shape-mode',
          values: [
            { value: 'CircleScissor', label: 'Circle' },
            { value: 'SphereScissor', label: 'Sphere' },
            { value: 'RectangleScissor', label: 'Rectangle' },
          ],
          commands: 'setToolActiveToolbar',
        },
      ],
    },
  },
];

export default toolbarButtons;
