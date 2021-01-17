import React, { useState } from 'react';
import { ItemDetails } from '../item-details/item-details';

import './item-list.css';

export default function ItemList({ list = [] }) {
  const [currentItem, setCurrentItem] = useState();

  return (
    <div className="row">
      <div className="col-4">
        <div className="card item-list">
          <ul className="list-group">
            {list.map((item) => (
              <div
                key={item.id}
                className="list-group-item list-group-item-action"
                onClick={() => setCurrentItem(item)}
              >
                {item.name}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-8">
        {currentItem ? <ItemDetails item={currentItem} /> : <p>Go to hell</p>}
      </div>
    </div>
  );
}
