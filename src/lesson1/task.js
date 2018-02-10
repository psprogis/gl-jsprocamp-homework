/*
  Should accept one argument and return its type

  @param {any} variable - any number, string, object, etc.
  @returns {string} variable type
*/
function getDataType(variable) {
  return typeof variable;
}

/*
  Returns argument's type pseudo name, possible values:
  'primitive' if argument is a primitive datatype
  'primitive-special' if it is special primitive (null)
  'object' - for simple objects
  'object-array' - for arrays
  'object-function' - for functions

  @param {any} variable - return type pseudo name of this variable
  @returns {string} type pseudo name
*/
function getDataTypePseudoName(variable) {
  const variableType = typeof variable;
  const primitiveTypes = ['number', 'string', 'boolean', 'symbol'];

  // let's break all the rules and create hydra with multiple returns

  if (primitiveTypes.includes(variableType)) return 'primitive';

  if (variable === null || variableType === 'undefined') return 'primitive-special';

  if (Array.isArray(variable)) return 'object-array';

  if (typeof variable === 'function') return 'object-function';

  // ok, return just typeof result, will work for simple objects
  return typeof variable;
}

/*
  Compare values with type

  @param a {any} - first value
  @param b {any} - second value
  @return {number} 1 if arguments types and values are equal
        0 if only arguments' values are equal
        -1 otherwise
*/
function compareByType(a, b) {

  /* eslint-disable eqeqeq */
  if ((typeof a === typeof b) && (a == b)) return 1;

  /* eslint-disable eqeqeq */
  if (a == b) return 0;

  return -1;
}

// Numbers

// helper function to check if argument is numeric type
function isNumeric(value) {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value);
}

/*
  Increase number by 1

  @param {number} - numeric value to increase
  @return {number} -  argument's value increased by 1 if it is number, otherwise -1
*/
function increase(value) {
  return (isNumeric(value) || (value === Infinity)) ? value + 1 : -1;
}

/*
  Check if argumen is 'safe' or 'danger' value

  @param {any} value - any value to test type
  @return {string} - 'safe' if argument is not a NaN or Infinity, otherwise returns 'danger'
*/
function testForSafeNumber(value) {
  return isNumeric(value) ? 'safe' : 'danger';
}

// Strings

/*
  Split word in string by whitespace and return array of words

  @param {string} str - any string
  @return {Array<String>} - array of words in string
*/
function stringToArray(str) {
  return str.trim().split(' ');
}

/*
  Get part of string before comma

  @param {string} str - any string
  @return {string} - part of string before comma
*/
function getStringPart(str) {
  let commaPos = str.indexOf(',');
  commaPos = commaPos === -1 ? undefined : commaPos;

  return str.slice(0, commaPos);
}

/*
  Finds position of a symbol in a string if string contains symbol only 1 time. or returns false.

  @param {string} str - input string
  @param {string} symbol - symbol to search for
  @return {boolean|number} - position of symbol if it was found exactly one time in string, otherwise - false
*/
function isSingleSymbolMatch(str, symbol) {
  const indexOfSymbol = str.indexOf(symbol);

  if (indexOfSymbol === -1) return false;

  const isUnique = indexOfSymbol === str.lastIndexOf(symbol);

  return isUnique ? indexOfSymbol : false;
}

/*
  Join array elements into string

  @param {Array} array - array of element to join
  @param {string} separator - separator to use with join, default is '-'
  @return {string} joined array
*/
function join(array, separator = '-') {
  return array.join(separator === '' ? '-' : separator);
}

/*
  Joins to arrays

  @param {Array} arrA - first array
  @param {Array} arrB - second array
  @return {Array} - joined array
*/
function glue(arrA, arrB) {
  // return [...arrA, ...arrB];
  return arrA.concat(arrB);
}

/*
  Sort array in descending order. Does not change order in original array

  @param {Array} arr - original array
  @return {Array} - sorted array
*/
function order(arr) {

  let compareFunction = null;

  if (arr[0].charCodeAt && arr[0].length === 1) {

    // compare strings
    compareFunction = (a, b) => a < b;
  } else {

    // compare numbers
    compareFunction = (a, b) => b - a;
  }

  return Array.from(arr).sort(compareFunction);
}

/*
  Filter out negative values from array

  @param {Array} - input array
  @return {Array} - array w/o negative numbers
*/
function removeNegative(arr) {
  return arr.filter(item => item >= 0);
}

/*
  Find difference between 2 arrays

  @param {Array} arrA - first array
  @param {Array} arrB - second array
  @return {Array} - result of arrA - arrB
*/
function without(arrA, arrB) {
  const result = [];

  arrA.forEach(aElement => {
    if (arrB.indexOf(aElement) === -1) {
      result.push(aElement);
    }
  });

  return result;
}

// helper functions for calcExpression and calcComparison
function readNumber(str) {
  // let result = '';
  // let end = start;
  //
  // const validChars = '0123456789';
  // const validFirstChar = '+-0123456789';
  //
  // for (let i = start; i < str.length; ++i) {
  //
  // }

  return parseFloat(str);
}

function calculateOperation(operator, operand1, operand2) {
  let result;

  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    case '/':
      result = operand1 / operand2;
      break;
    case '>':
      result = operand1 > operand2;
      break;
    case '<':
      result = operand1 < operand2;
      break;
    case '=':
      result = operand1 === operand2;
      break;
    case '>=':
      result = operand1 >= operand2;
      break;
    case '<=':
      result = operand1 <= operand2;
      break;
    default:
      console.warn(`Unsupported operator: ${operator}`);
  }

  return result;
}

function parseOperator(expression, supportedOperators) {
  let operator = expression.slice(0, 2);
  if (supportedOperators.indexOf(operator) === -1) {
    [operator] = expression;
    if (supportedOperators.indexOf(operator) === -1) {
      console.warn(`Unsupported operator: ${operator}`);
      return '';
    }
  }

  return operator;
}

function calculate(expression, supportedOperators, errorArgHandler) {
  const trimmedExpression = expression.trim();

  const firstOperand = readNumber(trimmedExpression);
  if (Number.isNaN(firstOperand)) return errorArgHandler(firstOperand);

  const remainingExpression = trimmedExpression.split(firstOperand).pop().trim();

  const operator = parseOperator(remainingExpression, supportedOperators);

  const secondOperand = readNumber(remainingExpression.slice(operator.length));
  if (Number.isNaN(secondOperand)) return errorArgHandler(secondOperand);

  return calculateOperation(operator, firstOperand, secondOperand);
}

/*
  Calculates basic mathematical expression

  @param {string} expression - string with 2 operands and operator: +, -, /, *.
  @return {number} - expression result or NaN
*/
function calcExpression(expression) {
  return calculate(expression, ['+', '-', '*', '/'], () => NaN);
}

/*
  Evaluates property value of the object

  @param {Object} obj - object to evaluate property for
  @param {string} expression - property path with dots
  @return {any} - property value or throw exception
*/
function calcComparison(expression) {
  return calculate(expression, ['>', '<', '=', '>=', '<='], () => {
    throw new Error('Invalid argument');
  });
}

/*
  Returns object's property value by its path, e.g.:
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception

  @param {obj} - object to eval property for
  @param {string} - property path
  @return {any} - value of the property
*/

// let's have more fun (and problems) and use recursion
function evalKey(obj, expression) {
  const secondDot = expression.indexOf('.', 1);

  if (secondDot === -1) {
    if (expression[0] !== '.') throw new Error('Invalid property name, should start with "."');

    const propName = expression.replace('.', '').trim();
    const propValue = obj[propName];

    if (propValue === undefined) {
      throw new Error(`property ${propName} is undefined`);
    }

    return propValue;
  }

  const propName = expression.slice(1, secondDot).trim();
  const remainingExpression = expression.slice(secondDot);

  return evalKey(obj[propName], remainingExpression);
}

export default {
  getDataType,
  getDataTypePseudoName,
  compareByType,
  increase,
  testForSafeNumber,
  stringToArray,
  getStringPart,
  isSingleSymbolMatch,
  join,
  glue,
  order,
  removeNegative,
  without,
  calcExpression,
  calcComparison,
  evalKey,
};
