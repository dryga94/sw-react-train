import React, {useState, useEffect, useCallback} from 'react';
import SwapiService from '../../services/swapi.service.js';
import Loader from '../loader';

import Error from '../error';

import './person-details.css';
export default function PersonDetails({personId}) {

  
  const [person, setPerson] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onError = (err) => {
    setError(true)
  }

  const getPerson = useCallback(
    (id) => {
      const swapiService = new SwapiService();
      swapiService.getPerson(id)
      .then((person) => {
      setPerson(person)
      setLoaded(true)
    })
    .catch(onError)
    },
    [],
  )

  const setDefaultAvatar = (e) => {
    e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }

  const {name, birthYear, gender, skinColor} = person;

  useEffect(() => {
    getPerson(personId)
    return function cleanup() {
      setError(false)
      setLoaded(false)
    }
  }, [getPerson, personId])

  return (
    <div className="person-details card">
      <img onError={setDefaultAvatar} src={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`} alt="planet" className="person-details-image" />
      {loaded && !error && 
        <div className="person-details-info">
          <h3>{name}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Birth Year: &nbsp;{birthYear}</li>
            <li className="list-group-item">Gender: &nbsp;{gender}</li>
            <li className="list-group-item">Skin Color: &nbsp;{skinColor}</li>
          </ul>
        </div> }
        {!loaded && !error && <Loader />}
        {error && <Error />}
    </div>
  )
}
