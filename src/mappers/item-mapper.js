
const planetDataMapper = (data) => {
  return {
    name: data.name,
    population: data.population,
    rotationPeriod: data.rotation_period,
    diameter: data.diameter,
  }
}

const personDataMapper = (data) => {
  return {
    name: data.name, 
    birthYear: data.birth_year, 
    gender: data.gender, 
    skinColor: data.skin_color
  }
}

const  starshipDataMapper = (data) => {
  return {
    name: data.name, 
    model: data.model, 
    manufacturer: data.manufacturer, 
    starshipClass: data.starship_class
  }
}

export const itemsMapper = {
  planetDataMapper,
  personDataMapper,
  starshipDataMapper
}