
// helper. May be useful when need to select random monster, if you need it
export function getRandomInt(min, max) {
  /* eslint-disable no-param-reassign */
  min = Math.ceil(min);
  max = Math.floor(max);

  /* eslint-disable no-mixed-operators */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uppercaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

