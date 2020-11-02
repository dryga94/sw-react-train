export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
      throw new Error ('Could not fetch ' + url + '. Recieved 404')
    }
    const body = await res.json();
    return body;
  }

  async getAllPeople() {
     const res =  await this.getResource(`/people/`)
     return res.results;
  }

  async getAllPlanets() {
    const res =  await this.getResource(`/planets/`)
    return res.results;
 }

 async getAllStarships() {
  const res =  await this.getResource(`/starships/`)
  return res.results;
}

  async getPerson(id) {
    const data = await this.getResource(`/people/${id}/`)
    return this._transfromPersonData(data)
  }

  async getPlanet(id) {
    const data = await this.getResource(`/planets/${id}/`)
    return this._transfromPlanetData(data)
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`)
    return this._transfromStarshipData(starship)
  }

  _transfromPlanetData(planet) {
    return {
      url: planet.url,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transfromPersonData(person) {
    return {
      name: person.name, 
      birthYear: person.birth_year, 
      gender: person.gender, 
      skinColor: person.skin_color
    }
  }

  _transfromStarshipData(starship) {
    return {
      name: starship.name, 
      model: starship.model, 
      manufacturer: starship.manufacturer, 
      starshipClass: starship.starship_class
    }
  }
}

