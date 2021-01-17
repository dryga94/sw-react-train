import React, {useState, useCallback, useEffect} from 'react'
import SwapiService from '../../services/swapi.service'

import setDefaultAvatar from '../../utils/set-default-avatar'
import convertToTitleCase from '../../utils/convert-to-regular-case'

import Loader from '../loader';
import Error from '../error';

import './item-details.css'

const typeMapper = {
  'people': {req: 'getPerson', url: 'characters'},
  'planets': {req: 'getPlanet', url: 'planets'},
  'starships': {req: 'getStarship', url: 'starships'},
}

const swapiService = new SwapiService();

export const ItemDetails = ({type, id}) => {

  const [item, setItem] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const params = Object.entries(item).slice(1);

  const { name } = item;

  const onError = () => {
    setError(true)
  }

  const getItem = useCallback(
    (id) => {
      swapiService[typeMapper[type].req](id)
      .then((item) => {
        setItem(item)
        setLoaded(true)
      })
      .catch(onError)
      },
    [type],
  )

  useEffect(() => {
    getItem(id)
    return () => {
      setLoaded(false)
      setError(false)
    }
  }, [getItem, id])

  
  return (
    <div className="item-details card">
      <img onError={setDefaultAvatar} src={`https://starwars-visualguide.com/assets/img/${typeMapper[type].url}/${id}.jpg`} alt="planet" className="item-details-image" />
      {loaded && !error &&
        <div className="item-details-info">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
          {params.map(([name, value]) => {
            return (
              <li key={name} className="list-group-item">{convertToTitleCase(name)}:&nbsp;{value}</li>
            )
          })}
            
          </ul>
        </div>}
        {!loaded && !error && <Loader />}
        {error && <Error />}
    </div>
  )
}
