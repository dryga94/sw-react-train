import { getDetailsImage } from '../utils/get-details-image';

const planetDataMapper = (data) => {
  return {
    name: data?.name,
    population: data?.population,
    rotationPeriod: data?.rotation_period,
    diameter: data?.diameter,
    url: getDetailsImage({ url: 'planets', id: data?.id }),
  };
};

const personDataMapper = (data) => {
  return {
    name: data?.name,
    birthYear: data?.birth_year,
    gender: data?.gender,
    skinColor: data?.skin_color,
    url: getDetailsImage({ url: 'characters', id: data?.id }),
  };
};

const starshipDataMapper = (data) => {
  return {
    name: data?.name,
    model: data?.model,
    manufacturer: data?.manufacturer,
    starshipClass: data?.starship_class,
    url: getDetailsImage({ url: 'starships', id: data?.id }),
  };
};

export const itemsMapper = {
  planetDataMapper,
  personDataMapper,
  starshipDataMapper,
};
