import React from 'react';

import setDefaultAvatar from '../../utils/set-default-avatar';
import convertToTitleCase from '../../utils/convert-to-regular-case';

export const ItemDetails = ({ item = {} }) => {
  const params = Object.entries(item).slice(1);
  const { name } = item || {};

  return (
    <div className="item-details card">
      <img
        onError={setDefaultAvatar}
        src={item.url}
        alt="planet"
        className="item-details-image"
      />
      <div className="item-details-info">
        <h3>{name}</h3>
        <ul className="list-group list-group-flush">
          {params.map(([name, value]) => (
            <li key={name} className="list-group-item">
              {convertToTitleCase(name)}:&nbsp;{value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
