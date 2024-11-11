import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';

const TreeNode = ({
  node,
  activeSegmentationId,
  onToggleSegmentVisibility,
  onToggleSegmentsVisibility,
  onColor,
  isAutoOpenTabs,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const uniqueSegmentIndices = [
    ...new Set(node.segmentationData.map(segment => segment.segmentIndex)),
  ];

  const isSegmentVisible =
    node.segmentationData.length > 0 && node.segmentationData.every(segment => segment?.isVisible);

  const getColor = segment =>
    node.segmentationData.length > 0
      ? `rgb(${segment.color[0]},${segment.color[1]},${segment.color[2]})`
      : '';

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (node.segmentationData.length > 0 && isAutoOpenTabs) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [node.segmentationData.length, isAutoOpenTabs]);

  return (
    <div
      style={{ marginLeft: node.level === 1 ? 0 : 20, marginBottom: '1px' }}
      className="font-semibold"
    >
      <div
        className={classnames(
          'group/row bg-primary-dark flex min-h-[28px] cursor-pointer flex-col overflow-hidden text-[#3d5871]',
          {
            'bg-primary-light border-primary-light rounded-l-[6px] border text-black':
              node.segmentationData.length > 0,
            'bg-primary-light border-primary-light rounded-l-[6px] border text-black opacity-60':
              node.segmentationData.length === 0,
          }
        )}
        onClick={e => {
          e.stopPropagation();
          toggle();
        }}
        tabIndex={0}
      >
        <div className="flex min-h-[28px] select-none">
          <div
            className={classnames('group/number grid w-[28px] place-items-center', {
              'bg-primary-light border-primary-light rounded-l-[4px] border text-black':
                node.segmentationData.length > 0,
              'bg-primary-light border-primary-light rounded-l-[4px] border text-black opacity-60':
                node.segmentationData.length === 0,
            })}
          >
            <div>{node.id}</div>
          </div>
          <div
            className={classnames('text-aqua-pale relative flex w-full gap-1 pl-1 pr-14', {
              'border border-l-0 border-transparent': !node.isActive,
            })}
            style={{
              width: 'calc(100% - 28px)',
            }}
          >
            <div className="bg-primary-dark flex h-full flex-grow items-center">
              <div className="flex items-center gap-1 pl-1 hover:cursor-pointer">
                <div className="grid h-[18px] w-[18px] place-items-center">
                  {node.children.length > 0 ? (
                    <div className="flex h-[18px] w-[18px] items-center justify-center">
                      <Icon
                        name={isOpen ? 'chevron-down-new' : 'chevron-left-new'}
                        style={{ transform: 'scaleX(-1)' }}
                      />
                    </div>
                  ) : (
                    <div className="h-[18px] w-[18px]" />
                  )}
                </div>
                {node.title}
              </div>
            </div>
            <div
              className={classnames(
                'absolute right-[32px] top-2 flex flex-row items-center justify-center rounded-lg',
                {}
              )}
            >
              {uniqueSegmentIndices.length === 1 && uniqueSegmentIndices.length !== 0 ? (
                <div className="flex h-[10px] w-[10px] items-center justify-center">
                  <div
                    className={classnames(
                      'h-[10px] w-[10px] rounded-full border-[0.5px] border-white',
                      {
                        'hover:cursor-pointer hover:opacity-60': !node.disableEditing,
                      }
                    )}
                    style={{ backgroundColor: getColor(node.segmentationData[0]) }}
                    onClick={e => {
                      if (node.disableEditing) {
                        return;
                      }
                      e.stopPropagation();
                      onColor(activeSegmentationId, node.segmentationData[0]?.segmentIndex);
                    }}
                  />
                </div>
              ) : (
                <div
                  className={classnames(
                    'mt-[-2px] flex h-[15px] flex-row-reverse items-center gap-[4px]',
                    {
                      [`w-[${uniqueSegmentIndices.length * 15}px]`]: true,
                    }
                  )}
                >
                  {[
                    ...new Map(
                      node.segmentationData.map(segment => [segment.segmentIndex, segment])
                    ).values(),
                  ].map((uniqueSegment, index) => (
                    <div
                      key={index}
                      className={classnames(
                        'h-[10px] w-[10px] grow-0 rounded-full border-[0.5px] border-white',
                        {
                          'hover:cursor-pointer hover:opacity-60': !uniqueSegment.disableEditing,
                        }
                      )}
                      style={{
                        backgroundColor: getColor(uniqueSegment),
                      }}
                      onClick={e => {
                        if (uniqueSegment.disableEditing) {
                          return;
                        }
                        e.stopPropagation();
                        onColor(activeSegmentationId, uniqueSegment.segmentIndex);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div
              className={classnames(
                'absolute right-[8px] top-0 flex flex-row-reverse rounded-lg pt-[3px]',
                {}
              )}
            >
              <div className="group-hover/row:hidden">
                {node.segmentationData.length > 0 && (
                  <Icon
                    name={isSegmentVisible ? 'row-shown' : 'row-hidden'}
                    className="h-5 w-5 text-[#3d5871]"
                  />
                )}
              </div>

              {/* Icon for 'row-lock' that shows when NOT hovering and 'isLocked' is true */}

              {/* Icons that show only when hovering */}
              <div className="hidden group-hover/row:flex">
                <HoveringIcons
                  isVisible={isSegmentVisible}
                  onToggleSegmentsVisibility={onToggleSegmentsVisibility}
                  segmentationId={activeSegmentationId}
                  segmentIndices={uniqueSegmentIndices}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen &&
        node.children.map(child => (
          <TreeNode
            key={child.id}
            node={child}
            activeSegmentationId={activeSegmentationId}
            onToggleSegmentVisibility={onToggleSegmentVisibility}
            onToggleSegmentsVisibility={onToggleSegmentsVisibility}
            onColor={onColor}
            isAutoOpenTabs={isAutoOpenTabs}
          />
        ))}
    </div>
  );
};

const TreeView = ({
  data,
  activeSegmentationId,
  onToggleSegmentVisibility,
  onToggleSegmentsVisibility,
  onColor,
  isAutoOpenTabs,
}) => {
  return (
    <div>
      {data !== null &&
        data !== undefined &&
        data.length > 0 &&
        data.map(node => (
          <TreeNode
            key={node.id}
            node={node}
            activeSegmentationId={activeSegmentationId}
            onToggleSegmentVisibility={onToggleSegmentVisibility}
            onToggleSegmentsVisibility={onToggleSegmentsVisibility}
            onColor={onColor}
            isAutoOpenTabs={isAutoOpenTabs}
          />
        ))}
    </div>
  );
};

const Tree = ({
  hierarchyData,
  activeSegmentationId,
  onToggleSegmentVisibility,
  onToggleSegmentsVisibility,
  onColor,
  isAutoOpenTabs,
}) => {
  return (
    <div>
      <TreeView
        data={hierarchyData}
        activeSegmentationId={activeSegmentationId}
        onToggleSegmentVisibility={onToggleSegmentVisibility}
        onToggleSegmentsVisibility={onToggleSegmentsVisibility}
        onColor={onColor}
        isAutoOpenTabs={isAutoOpenTabs}
      />
    </div>
  );
};

const HoveringIcons = ({
  isVisible,
  onToggleSegmentsVisibility,
  segmentationId,
  segmentIndices,
}) => {
  const iconClass = 'w-5 h-5 hover:cursor-pointer hover:opacity-60';

  const handleIconClick = e => {
    e.stopPropagation();

    if (!isVisible) {
      onToggleSegmentsVisibility(segmentationId, segmentIndices, true);
    } else {
      onToggleSegmentsVisibility(segmentationId, segmentIndices);
    }
  };

  const createIcon = (name, action, color = null) => (
    <Icon
      name={name}
      className={classnames(iconClass, color ?? 'text-white')}
      onClick={e => handleIconClick(e, action)}
    />
  );

  return (
    <div className="flex flex-row items-center gap-1">
      {createIcon(
        isVisible ? 'row-shown' : 'row-hidden',
        onToggleSegmentsVisibility,
        !isVisible ? 'text-[#3d5871]' : null
      )}
    </div>
  );
};

export default Tree;
