<<<<<<< HEAD
import React from 'react';
import { PanelSection, ToolSettings, Tooltip } from '../../components';
=======
import React, { useEffect, useRef } from 'react';
import { PanelSection, ToolSettings } from '../../components';
>>>>>>> origin/master
import classnames from 'classnames';

const ItemsPerRow = 4;

<<<<<<< HEAD
/**
 * Just refactoring from the toolbox component to make it more readable
 */
function ToolboxUI(props) {
=======
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Just refactoring from the toolbox component to make it more readable
 */
function ToolboxUI(props: withAppTypes) {
>>>>>>> origin/master
  const {
    toolbarButtons,
    handleToolSelect,
    activeToolOptions,
    numRows,
    servicesManager,
    title,
    useCollapsedPanel = true,
  } = props;

<<<<<<< HEAD
=======
  const prevToolOptions = usePrevious(activeToolOptions);

  useEffect(() => {
    if (!activeToolOptions) {
      return;
    }

    activeToolOptions.forEach((option, index) => {
      const prevOption = prevToolOptions ? prevToolOptions[index] : undefined;
      if (!prevOption || option.value !== prevOption.value) {
        const isOptionValid = option.condition
          ? option.condition({ options: activeToolOptions })
          : true;
        if (isOptionValid) {
          const { commands } = option;
          commands(option.value);
        }
      }
    });
  }, [activeToolOptions]);

>>>>>>> origin/master
  const render = () => {
    return (
      <>
        <div className="flex flex-col bg-black">
          <div className="bg-primary-dark mt-0.5 flex flex-wrap py-2">
            {toolbarButtons.map((toolDef, index) => {
              if (!toolDef) {
                return null;
              }

              const { id, Component, componentProps } = toolDef;
              const isLastRow = Math.floor(index / ItemsPerRow) + 1 === numRows;

              const toolClasses = `ml-1 ${isLastRow ? '' : 'mb-2'}`;

              const onInteraction = ({ itemId, id, commands }) => {
<<<<<<< HEAD
                handleToolSelect(itemId || id);
=======
                const idToUse = itemId || id;
                handleToolSelect(idToUse);
>>>>>>> origin/master
                props.onInteraction({
                  itemId,
                  commands,
                });
              };

              return (
                <div
                  key={id}
                  className={classnames({
                    [toolClasses]: true,
<<<<<<< HEAD
                    'flex flex-col items-center justify-center': true,
                  })}
                >
                  {componentProps.disabled ? (
                    <Tooltip
                      position="bottom"
                      content={componentProps.label}
                      secondaryContent={componentProps.disabledText}
                    >
                      <div className="border-secondary-light rounded border bg-black">
                        <Component
                          {...componentProps}
                          {...props}
                          id={id}
                          servicesManager={servicesManager}
                          onInteraction={onInteraction}
                          size="toolbox"
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <div className="border-secondary-light rounded border bg-black">
                      <Component
                        {...componentProps}
                        {...props}
                        id={id}
                        servicesManager={servicesManager}
                        onInteraction={onInteraction}
                        size="toolbox"
                      />
                    </div>
                  )}
=======
                    'border-secondary-light flex flex-col items-center justify-center rounded-md border':
                      true,
                  })}
                >
                  <div className="flex rounded-md bg-black">
                    <Component
                      {...componentProps}
                      {...props}
                      id={id}
                      servicesManager={servicesManager}
                      onInteraction={onInteraction}
                      size="toolbox"
                    />
                  </div>
>>>>>>> origin/master
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-primary-dark h-auto px-2">
          {activeToolOptions && <ToolSettings options={activeToolOptions} />}
        </div>
      </>
    );
  };

<<<<<<< HEAD
  return useCollapsedPanel ? <PanelSection title={title}>{render()}</PanelSection> : render();
=======
  return useCollapsedPanel ? (
    <PanelSection
      childrenClassName="flex-shrink-0"
      title={title}
    >
      {render()}
    </PanelSection>
  ) : (
    render()
  );
>>>>>>> origin/master
}

export { ToolboxUI };
