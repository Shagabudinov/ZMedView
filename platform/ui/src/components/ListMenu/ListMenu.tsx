import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const flex = 'flex flex-row justify-between items-center';
const theme = 'bg-indigo-dark text-white';

const ListMenu = ({ items = [], renderer, onClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const ListItem = ({ item, index, isSelected }) => {
    const onClickHandler = () => {
      setSelectedIndex(index);
      onClick({ item, selectedIndex: index });
      item.onClick?.({ ...item, index, isSelected });
    };

    return (
      <div
        className={classnames(flex, theme, {
          'cursor-pointer': !item.disabled,
          'ohif-disabled': item.disabled,
        })}
        onClick={onClickHandler}
        data-cy={item.id}
      >
        {renderer && renderer({ ...item, index, isSelected })}
      </div>
    );
  };

  return (
<<<<<<< HEAD
    <div className="bg-secondary-dark flex flex-col rounded-md pt-2 pb-2">
=======
    <div
      className="bg-secondary-dark flex flex-col gap-[4px] overflow-scroll rounded-md p-1"
      style={{ maxHeight: 'calc(100vh - 5rem)' }}
    >
>>>>>>> origin/master
      {items.map((item, index) => {
        return (
          <ListItem
            key={`ListItem${index}`}
            index={index}
            isSelected={selectedIndex === index}
            item={item}
          />
        );
      })}
    </div>
  );
};

const noop = () => {};

ListMenu.propTypes = {
  items: PropTypes.array.isRequired,
  renderer: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

ListMenu.defaultProps = {
  onClick: noop,
};

export default ListMenu;
