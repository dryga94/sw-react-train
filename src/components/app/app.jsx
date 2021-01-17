import React, {useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import AppHeader from '../app-header';
import ItemList from '../item-list/item-list';
import RandomPlanet from '../random-planet';
import { ItemDetails } from '../item-details/item-details';

import { Suspense } from '../ui/suspense/suspense';
import { swapiService } from '../../services/swapi.service';
import './app.css';

const DEFAULT_APP_STATE = { currentList: 'people', id: '3' };

export default function AppContainer() {
  const [state, setState] = useState(DEFAULT_APP_STATE);
  const { id, currentList } = state;

  const onItemClick = useCallback((el) => {
    setState({ ...state, id: el });
  }, []);

  const onNavClick = useCallback((name) => {
    setState({ ...state, currentList: name });
  }, []);

  const { data, isLoading, error } = useQuery(
    'starships',
    swapiService.getAllStarships,
  );

  // Tab Navigation
  // Tab Navigation Content
  //    - Tab Content List
  //        - Tab Content List Details

  return (
    <div className="container">
      <AppHeader onNavClick={onNavClick} />
      {/* <RandomPlanet /> */}
       <Suspense loading={isLoading} error={error}>
            <ItemList onItemClick={onItemClick} list={data} />
          </Suspense>
    </div>
  );
}
