
import { useQuery } from 'react-query';


const _apiBase = 'https://swapi.dev/api';
const getResource = (url) =>  {
  fetch(`${_apiBase}${url}`).then(res => res.json());
}

const getAllPeopleQuery = () => useQuery('peopleQuery', () => getResource(`/people/`));

const getAllPlanetsQuery = () => useQuery('planetsQuery', () => getResource(`/planets/`));

const getAllStarshipsQuery = () => useQuery('starshipsQuery', () => getResource(`/starships/`));

const getPersonQuery = (id) => useQuery('personQuery', () => getResource(`/people/${id}/`));

const getPlanetQuery = (id) => useQuery('planetQuery', () => getResource(`/planets/${id}/`));

const getStarshipQuery = (id) => useQuery('starshipQuery', () => getResource(`/starships/${id}/`));

export const swapiService = {
  getResource,
  getAllPeopleQuery,
  getAllPlanetsQuery,
  getAllStarshipsQuery,
  getPersonQuery,
  getPlanetQuery,
  getStarshipQuery,

}

