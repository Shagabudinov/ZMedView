import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from '@ohif/ui';

const baseClasses =
  'first:border-0 border-t border-secondary-light cursor-pointer select-none outline-none';

const StudyItem = ({
  title,
  value,
}) => {
  return (
    <div
      className={classnames(
        'bg-black hover:bg-secondary-main',
        {
          'rounded overflow-hidden border-primary-light': true,
        }
      )}
    >
      <div className="flex flex-row items-center flex-1 pt-2 text-base text-blue-300">
          <div className="mr-4">
            <span className="font-bold text-primary-main">{title + ': '}</span>
          </div>
          <div className="flex flex-row items-center flex-1">
            {value}
          </div>
      </div>
    </div>
  );
};

StudyItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default StudyItem;
