
// helper functions to work with numbers
function isNumeric(value) {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value);
}

/* eslint-disable no-bitwise */
function isInteger(x) {
  return (x ^ 0) === x;
}

/**
 * Sum two numbers
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function sum(a, b) {

  // handle error cases
  if (arguments.length < 2) throw new Error('Not enough arguments, should be two numbers');
  if (!isNumeric(a)) throw new Error('Illegal first argument, should be a number');
  if (!isNumeric(b)) throw new Error('Illegal second argument, should be a number');

  return a + b;
}

/**
 * Sum all passed numbers
 *
 * @param args - numbers to sum
 * @returns {number} - sum of all arguments
 */
export function sumAll(...args) {
  return args.reduce((prev, next) => prev + next, 0);
}

/**
 * Calculates the n-th power of x
 *
 * @param {number} x - base
 * @param {number} n - exponent, should be positive integer
 * @returns {number} x in power n
 */
export function pow(x, n) {
  if (!isNumeric(x)) throw new Error('Illegal value of base, should be a number');
  if (!isInteger(n)) throw new Error('Illegal value of exponent, should be a positive integer number');

  if (n < 0) throw new Error('Exponent cannot be negative value');

  let res = 1;

  /* eslint-disable no-plusplus */
  for (let i = 0; i < n; ++i) {
    res *= x;
  }

  return res;
}

/**
 * Generates random number from 'from' to 'to' inclusively
 *
 * @param {number} from - lower bound
 * @param {number} to - upper bound
 * @returns {number} - random number from <= number <= to
 */
export function random(from, to) {
  if (!isNumeric(from)) throw new Error('Illegal value of lower bound, should be a number');
  if (!isNumeric(to)) throw new Error('Illegal value of upper bound, should be a number');

  if (to <= from) throw new Error('from argument should be less than to');

  // let's not invent your own wrong solution and use the correct and proven one
  // origin: https://learn.javascript.ru/task/random-int-min-max

  let rand = (from - 0.5) + (Math.random() * (to - (from + 1)));
  rand = Math.round(rand);

  return rand;
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
