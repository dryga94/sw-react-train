import React, {useState, useEffect, useCallback} from 'react';
import SwapiService from '../../services/swapi.service.js';

import Loader from '../loader'
import Error from '../error';

import './random-planet.css';
export default function RandomPlanet() {
  
  const swapiService = new SwapiService();

  const defalutState = {
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
  }
  const [id, setId] = useState(Math.floor(Math.random()*14) + 2)
  const [obj, setInfo] = useState(defalutState);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  
  const {population, name, rotationPeriod, diameter} = obj

  const onError = (err) => {
    setError(true)
  }

  const updatePlanet = useCallback(
    () => {
      swapiService.getPlanet(id)
      .then((planet) => {
        setError(false)
        setInfo(planet)
        setLoaded(true)
      })
      .catch(onError)
    },
    [swapiService, id],
  )
  useEffect(() => {
    updatePlanet()
    const interval = setInterval(() => {
        setId(Math.floor(Math.random()*14) + 2)
    }, 3000);
    return () => {
      clearInterval(interval)
    };
  }, [id]);


  return (
    <div className="card random-planet">
      {loaded && !error && 
      <>
        <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet" className="random-planet-image" />
        <div className="random-planet-info">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Population {population}</li>
            <li className="list-group-item">Rotation period {rotationPeriod}</li>
            <li className="list-group-item">Diameter {diameter}</li>
          </ul>
        </div>
      </>}
      {!loaded && !error && <Loader />}
      {error && <Error />}
    </div>
  )
}