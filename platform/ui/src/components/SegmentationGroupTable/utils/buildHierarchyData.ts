export function buildHierarchy(dict, activeSingleSegmentations) {
  const tree = {};

  Object.keys(dict).forEach(key => {
    const levels = key.split('.');
    let current = tree;

    levels.forEach((level, index) => {
      if (!current[level]) {
        current[level] = {
          title: index === levels.length - 1 ? dict[key] : null,
          children: {},
          segmentationData: [],
          level: index + 1,
        };
      }
      current = current[level].children;
    });
  });

  activeSingleSegmentations.forEach(segmentation => {
    const levels = segmentation.label.split('.');
    let current = tree;

    levels.forEach((level, index) => {
      if (current[level]) {
        current[level].segmentationData.push(segmentation);
        current = current[level].children;
      }
    });
  });

  function convertToArray(node) {
    return Object.entries(node).map(([key, value]) => ({
      id: key,
      title: value.title,
      segmentationData: value.segmentationData,
      level: value.level,
      children: convertToArray(value.children),
    }));
  }

  return convertToArray(tree);
}
