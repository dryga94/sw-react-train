const _apiBase = 'https://swapi.dev/api';

const getResource = (url) =>
  fetch(`${_apiBase}${url}`)
    .then((res) => res.json())
    .then((res) => res.results);

const getAllPeople = () => getResource(`/people/`);

const getAllPlanets = () => getResource(`/planets/`);

const getAllStarships = () => getResource(`/starships/`);

const getPerson = (id) => getResource(`/people/${id}/`);

const getPlanet = (id) => getResource(`/planets/${id}/`);

const getStarship = (id) => getResource(`/starships/${id}/`);

// const getAllPeopleQuery = () => useQuery('peopleQuery', () => getResource(`/people/`));

// const getAllPlanetsQuery = () => useQuery('planetsQuery', () => getResource(`/planets/`));

// const getAllStarshipsQuery = () => useQuery('starshipsQuery', () => getResource(`/starships/`));

// const getPersonQuery = (id) => useQuery('personQuery', () => getResource(`/people/${id}/`));

// const getPlanetQuery = (id) => useQuery('planetQuery', () => getResource(`/planets/${id}/`));

// const getStarshipQuery = (id) => useQuery('starshipQuery', () => getResource(`/starships/${id}/`));

export const swapiService = {
  getResource,
  getAllPeople,
  getAllPlanets,
  getAllStarships,
  getPerson,
  getPlanet,
  getStarship,
};
