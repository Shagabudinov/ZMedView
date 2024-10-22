import { dict } from './mammodict';

export const getMammoLabel = label => {
  let splittedLabel = label.split('_');
  const categoryNumber = splittedLabel[0].split('.')[0];
  let category = `${dict[categoryNumber]}: `;

  if (dict[categoryNumber] === undefined) {
    return label;
  }
  splittedLabel = splittedLabel
    .map(el => {
      return `${dict[el]}`;
    })
    .join(', ');

  return category + splittedLabel;
};
