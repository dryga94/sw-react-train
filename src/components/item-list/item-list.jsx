import React, {useState, useEffect, useCallback} from 'react';

import SwapiService from '../../services/swapi.service.js';
import Loader from '../loader'
import Error from '../error';

import './item-list.css';

export default function ItemList({onItemClick, listName}) {

  const [list, setList] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const onError = (err) => {
    setError(true)
  }
  const getList = useCallback(
    (listName) => {
      const swapiService = new SwapiService();
      switch (listName) {
        case 'people':
          swapiService.getAllPeople()
          .then((peopleList) => {
            setList(peopleList)
            setLoaded(true)
          })
          .catch(onError)
          break
        case 'planets' :
          swapiService.getAllPlanets()
          .then((planetList) => {
            setList(planetList)
            setLoaded(true)
          })
          .catch(onError)
          break
        case 'starships':
          swapiService.getAllStarships()
          .then((starshipList) => {
            setList(starshipList)
            setLoaded(true)
          })
          .catch(onError)
          break
  
          default :
            setError(onError)
  
      }
    },
    [],
  )
  
  const separateUrl = (url) => {
    
    const reg = /[0-9]*\/$/
    const cutted = url.match(reg)[0].match(/[^/]*/)[0];
    return cutted
  }

  useEffect(()=> {
    getList(listName)
    return function cleanup() {
      setError(false)
      setLoaded(false)
    }
  }, [listName, getList])

  return (
    <div className="card item-list">
      {loaded && !error && <ul className="list-group">
          {list && list.map(({name, url})=> {
            return (
            <div key={name} 
              className="list-group-item list-group-item-action"
              onClick={()=> onItemClick(separateUrl(url))}
              >
              {name}
            </div>
            )
          })}
        </ul>}
      {!loaded && !error && <Loader />}
      {error && <Error />}
    </div>
  )
}
