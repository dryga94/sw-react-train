import React, {useState} from 'react';

import AppHeader from '../app-header';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import RandomPlanet from '../random-planet';
import './app.css';
import StarShipDetails from '../starship-details';
import PlanetDetails from '../planet-details';
export default function App() {
  const [state, setState] = useState({currentList: 'people', id: '1'});

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
            listName={state.currentList}
          />
        </div>
        <div className="col-8">
          {currentList === 'people' && id && <PersonDetails personId={id}/>}
          {currentList === 'starships' && id && <StarShipDetails starshipId={id}/>}
          {currentList === 'planets' && id && <PlanetDetails planetId={id}/>}
        </div>
      </div>
    </div>
  );
}

