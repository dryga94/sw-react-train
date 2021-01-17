import React, {useState} from 'react';

import AppHeader from '../app-header';
import ItemList from '../item-list/item-list';
import RandomPlanet from '../random-planet';
import './app.css';
import { ItemDetails } from '../item-details/item-details';
export default function App() {
  const [state, setState] = useState({currentList: 'people', id: '3'});

  const {id, currentList} = state;

  const onItemClick = (el) => {
    setState({...state, id: el})
  }

  const onNavClick = (name) => {
    setState({...state, currentList: name})
  }


  return (
    <div className="container">
      <AppHeader onNavClick={onNavClick}/>
      <RandomPlanet />
      <div className="row">
        <div className="col-4">
          <ItemList 
            onItemClick={onItemClick}
            listName={currentList}
          />
        </div>
        <div className="col-8">
          <ItemDetails type={currentList} id={id}/>
        </div>
      </div>
    </div>
  );
}

