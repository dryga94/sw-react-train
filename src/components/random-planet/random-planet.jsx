import React, {useState, useEffect, useCallback} from 'react';
import { swapiService } from '../../services/swapi.service.js';

import { itemsMapper } from '../../mappers/item-mapper';

import Loader from '../loader'
import Error from '../error';

import './random-planet.css';
export default function RandomPlanet() {

  const { getPlanetQuery } = swapiService;
  const { planetDataMapper } = itemsMapper;

  const defalutState = {
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
  }
  const [id, setId] = useState(Math.floor(Math.random()*14) + 2)
  const [obj, setInfo] = useState(defalutState);

  const { isLoading, error, data } = getPlanetQuery;
  
  const {population, name, rotationPeriod, diameter} = planetDataMapper(data)

  const updatePlanet = useCallback(
    (id) => {
      swapiService.getPlanet(id)
      .then((planet) => {
        setInfo(planet)
      })
    },
    [],
  )
  useEffect(() => {
    updatePlanet(id)
    const interval = setInterval(() => {
        setId(Math.floor(Math.random()*14) + 2)
    }, 3000);
    return () => {
      clearInterval(interval)
    };
  }, [id, updatePlanet]);


  return (
    <div className="card random-planet">
      {!isLoading && !error && 
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
      {isLoading && !error && <Loader />}
      {error && <Error />}
    </div>
  )
}