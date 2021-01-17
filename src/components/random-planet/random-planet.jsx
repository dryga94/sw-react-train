import React, { useState, useEffect, useCallback } from 'react';
import { swapiService } from '../../services/swapi.service.js';

import { itemsMapper } from '../../mappers/item-mapper';
import { useQuery } from 'react-query';

import Loader from '../ui/loader';
import Error from '../ui/error';

import './random-planet.css';

export default function RandomPlanet() {
  const { getPlanet } = swapiService;
  const { planetDataMapper } = itemsMapper;

  // const defalutState = {
  //   name: null,
  //   population: null,
  //   rotationPeriod: null,
  //   diameter: null,
  // };
  const [id, setId] = useState(Math.floor(Math.random() * 14) + 2);
  // const [obj, setInfo] = useState(defalutState);

  const { isLoading, error, data } = useQuery('planet', getPlanet(id));

  const { population, name, rotationPeriod, diameter } = planetDataMapper(data);

  // const updatePlanet = useCallback(
  //   // (id) => {
  //   //   swapiService.getPlanet(id)
  //   // },
  //   () => console.log('update planet'),
  //   [],
  // );
  // useEffect(() => {
  //   updatePlanet(id);
  //   const interval = setInterval(() => {
  //     setId(Math.floor(Math.random() * 14) + 2);
  //   }, 3000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [id, updatePlanet]);

  if (error) return <Error />;
  if (isLoading) return <Loader />;

  return (
    <div className="card random-planet">
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="planet"
        className="random-planet-image"
      />
      <div className="random-planet-info">
        <h3>{name}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Population {population}</li>
          <li className="list-group-item">Rotation period {rotationPeriod}</li>
          <li className="list-group-item">Diameter {diameter}</li>
        </ul>
      </div>
    </div>
  );
}
