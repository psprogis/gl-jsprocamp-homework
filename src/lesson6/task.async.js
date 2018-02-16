
import axios from 'axios';

const API_URL = 'https://swapi.co/api';
const collections = {
  PLANETS: 'planets',
  PEOPLE: 'people',
  STARSHIPS: 'starships',
};

async function getItemByName(collection, name) {
  const supportedCollections = ['planets', 'people', 'starships'];

  if (supportedCollections.indexOf(collection) === -1) {
    throw new Error(`Unsupported collection: ${collection}`);
  }

  const resp = await axios.get(`${API_URL}/${collection}`);
  if (resp.status !== 200) {
    throw new Error(`Cannot fetch ${collection} info, got unexpected status ${resp.status}`);
  }

  const items = resp.data.results.filter(item => item.name === name);

  if (items.length === 0) {
    throw new Error(`Collection: ${collection}, no items found by name: ${name}`);
  }

  if (items.length > 1) {
    console.warn(`Collection ${collection}, more than one item found, return the first one.`);
  }

  return items[0];
}

// Climate on any planet by its name
// {planetName} – String
async function getClimate(planetName) {
  const planet = await getItemByName(collections.PLANETS, planetName);
  return planet.climate;
}

// Get profile info {Object} by name
// {name} – String
async function getProfile(name) {
  return getItemByName(collections.PEOPLE, name);
}

// Get all pilots names (array of strings of a ship by its name
// {starshipName} - String
async function getPilots(starshipName) {
  const starship = await getItemByName(collections.STARSHIPS, starshipName);
  const pilots = await axios.all(starship.pilots.map(pilot => axios.get(pilot)));

  return pilots.map(pilot => pilot.data.name);
}

export default {
  getClimate,
  getProfile,
  getPilots,
};
