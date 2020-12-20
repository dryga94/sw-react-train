import React, {useState, useEffect, useCallback} from 'react';
import SwapiService from '../../services/swapi.service.js';
import Loader from '../loader';
import Error from '../error';

export default function PlanetDetails({planetId}) {
  const [planet, setPlanet] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true)
  }

  const getPlanet = useCallback(
    (id) => {
      const swapiService = new SwapiService();
      swapiService.getPlanet(id)
      .then((planet) => {
        setPlanet(planet)
        setLoaded(true)
      })
      .catch(onError)
      },
    [],
  )

  const setDefaultAvatar = (e) => {
    e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }

  const {name, population, rotationPeriod, diameter} = planet;

  useEffect(() => {
    getPlanet(planetId)
    return function cleanup() {
      setLoaded(false)
      setError(false)
    }
  }, [planetId, getPlanet])

  return (
    <div className="person-details card">
      <img onError={setDefaultAvatar} src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} alt="planet" className="person-details-image" />
      {loaded && !error &&
        <div className="person-details-info">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Population: &nbsp;{population}</li>
            <li className="list-group-item">Rotation Period: &nbsp;{rotationPeriod}</li>
            <li className="list-group-item">Diameter: &nbsp;{diameter}</li>
          </ul>
        </div>}
        {!loaded && !error && <Loader />}
        {error && <Error />}
    </div>
  )
}
