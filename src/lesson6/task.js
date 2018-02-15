// using Fetch API and swapi.co API get the following info

const API_URL = 'https://swapi.co/api';
const DEFAULT_OPTS = {
  mode: 'cors',
  cache: 'default',
  method: 'GET',
};
const collections = {
  PLANETS: 'planets',
  PEOPLE: 'people',
  STARSHIPS: 'starships',
};

/* global fetch */
function getItemByName(collection, name, opts) {
  const supportedCollections = ['planets', 'people', 'starships'];

  if (supportedCollections.indexOf(collection) === -1) {
    throw new Error(`Unsupported collection: ${collection}`);
  }

  // special workaround for people collection
  /* eslint-disable  no-param-reassign */
  if (collection === 'people') collection += '?format=json';

  return fetch(`${API_URL}/${collection}`, opts)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(`Cannot fetch ${collection} info, got unexpected status ${resp.status}`);
      }

      return resp.json();
    })
    .then(json => {
      if (!json.results) {
        throw new Error('No results array found in response');
      }

      const items = json.results.filter(item => item.name === name);

      if (items.length === 0) {
        throw new Error(`Collection: ${collection}, no items found by name: ${name}`);
      }

      if (items.length > 1) {
        console.warn(`Collection ${collection}, more than one item found, return the first one.`);
      }

      return items[0];
    });
}

// Climate on any planet by its name
// {planetName} – String
function getClimate(planetName) {
  return getItemByName(collections.PLANETS, planetName, DEFAULT_OPTS)
    .then(planet => planet.climate);
}

// Get profile info {Object} by name
// {name} – String
function getProfile(name) {
  return getItemByName(collections.PEOPLE, name, DEFAULT_OPTS);
}

// Get all pilots names (array of strings of a ship by its name
// {starshipName} - String
function getPilots(starshipName) {
  return getItemByName(collections.STARSHIPS, starshipName, DEFAULT_OPTS)
    .then(starship => Promise.all(starship.pilots.map(pilot => fetch(pilot))))
    .then(responses => Promise.all(responses.map(resp => resp.json())))
    .then(pilots => pilots.map(pilot => pilot.name));
}

export default {
  getClimate,
  getProfile,
  getPilots,
};
