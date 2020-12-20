import React, {useState, useEffect, useCallback} from 'react';
import SwapiService from '../../services/swapi.service.js';
import Loader from '../loader';
import Error from '../error';

export default function StarShipDetails({starshipId}) {

  const [starships, setStarship] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false)

  const onError = (err) => {
    setError(true)
  }
   
  const getStarship = useCallback(
    (id) => {
      const swapiService = new SwapiService();
      swapiService.getStarship(id)
      .then((starships) => {
        setStarship(starships)
        setLoaded(true)
      })
      .catch(onError)
      },
    [],
  )

  const {name, model, manufacturer, starshipClass} = starships;

  useEffect(() => {
    getStarship(starshipId)
    return function cleanup() {
      setLoaded(false)
      setError(false)
    }
  }, [starshipId, getStarship])

  const setDefaultAvatar = (e) => {
    e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }

  return (
    <div className="person-details card">
      <img onError={setDefaultAvatar} src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`} alt="planet" className="person-details-image" />
      {loaded && !error && 
        <div className="person-details-info">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Model: &nbsp;{model}</li>
            <li className="list-group-item">Manufacturer: &nbsp;{manufacturer}</li>
            <li className="list-group-item">Class: &nbsp;{starshipClass}</li>
          </ul>
        </div>}
        {!loaded && !error && <Loader />}
        {error && <Error />}
    </div>
  )
}
