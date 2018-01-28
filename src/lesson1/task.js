// TODO: add jsdoc

/*
  Should accept one argument and return its type
*/
function getDataType(variable) {
  return typeof variable;
}

/*
  Should return:
  'primitive' if argument is a primitive datatype
  'primitive-special' if it is special primitive (null)
  'object' - for simple objects
  'object-array' - for arrays
  'object-function' - for functions
*/
function getDataTypePseudoName(variable) {
  const variableType = typeof variable;
  const primitiveTypes = ['number', 'string', 'boolean', 'symbol', 'undefined'];

  // let's break all the rules and create hydra with multiple returns

  if (primitiveTypes.includes(variableType)) return 'primitive';

  if (variable === null) return 'primitive-special';

  if (Array.isArray(variable)) return 'object-array';

  if (typeof variable === 'function') return 'object-function';

  // ok, return just typeof result
  return typeof variable;
}

/*
  Should return:
  1 if arguments types and values are equal
  0 if only arguments' values are equal
  -1 otherwise
*/
function compareByType(a, b) {
  if (typeof a === typeof b) return 1;

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
  Should return argument's value increased by 1 if it is number
  otherwise return -1
*/
function increase(value) {
  return isNumeric(value) ? value + 1 : -1;
}

/*
  Accepts 1 arguments (number)
  returns 'safe' if argument is not a NaN or Infinity
  otherwise returns 'danger'
*/
function testForSafeNumber(value) {
  return isNumeric(value) ? 'safe' : 'danger';
}

// Strings

/*
  Should accept 1 string argument
  Returns array of words in string
*/
function stringToArray(str) {
  return str.split(' ');
}

/*
  Shold accept 1 string argument
  Returns part of string before comma
*/
function getStringPart(str) {
  let commaPos = str.indexOf(',');
  commaPos = commaPos === -1 ? undefined : commaPos;

  return str.slice(0, commaPos);
}

/*
  Напишите функцию, которая принимает 2 аргумента (строку и симовл),
  и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
  false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
  const indexOfSymbol = str.indexOf(symbol);
  const isUnique = indexOfSymbol === str.lastIndexOf(symbol);

  return isUnique ? indexOfSymbol : false;
}

/*
  Напишите функцию, которая принимает 2 аргумента,
  массив в разделитель[опционально],
  и возвращает строку ввиде элементов массива c разделителями если разделитель задан
  или строку разделенную "-" если не задан
*/
function join(array, separator = '-') {
  return array.join(separator === '' ? '-' : separator);
}

/*
  Напишите функцию, которая принимает 2 массива,
  и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue(arrA, arrB) {
  // return [...arrA, ...arrB];
  return arrA.concat(arrB);
}

/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой массив отсортированный от большего к меньшему
*/
function order(arr) {
  return arr.sort((a, b) => a < b);
}

/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой без чисел которые меньше 0
*/
function removeNegative(arr) {
  return arr.filter(item => item >= 0);
}

/*
  Напишите функцию, которая принимает 2 числовых массива,
  и возвращает новый массив, состоящий из элементов первого но без элементов
  которые присутствуют во втром
  [1,2,3], [1, 3] => [2]
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

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение математической операции с двумя
  операндами (поддерживаются 4 базовых оператора + - / *).
  Функция вычисляет выражение и возвращает число либо NaN.
  '12/6' => 2
*/
function calcExpression(expression) {

}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение логической операции с двумя
  операндами (поддерживаются 5 базовых операторов > < = >= <=).
  Функция вычисляет выражение и возвращает true / false,
  либо бросает exception в случае ошибки.
  '100>5' => true
*/
function calcComparison(expression) {

}

/*
  Напишите функцию, которая принимает обьект и строку,
  содержащую выражение доступа к свойствам обьекта.
  Функция возвращает значение запрашиваемого свойства либо
  бросает exception в случае ошибки.
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception
*/
function evalKey(obj, expression) {

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
