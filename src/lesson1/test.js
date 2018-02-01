import lesson1 from '../lesson1';

const {
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
} = lesson1.task;

describe('Basic JavaScript', () => {

  describe('Main Data types', () => {
    it('should be possible to find out variable data type', () => {

      expect(getDataType('hello')).toEqual('string');
      expect(getDataType(null)).toEqual('object');
      expect(getDataType(4)).toEqual('number');
    });

    it('should be possible to find out variable data type pseudo name', () => {

      expect(getDataTypePseudoName('hello')).toEqual('primitive');
      expect(getDataTypePseudoName(100)).toEqual('primitive');
      expect(getDataTypePseudoName(true)).toEqual('primitive');
      expect(getDataTypePseudoName(Symbol('id'))).toEqual('primitive');

      expect(getDataTypePseudoName()).toEqual('primitive-special');
      expect(getDataTypePseudoName(undefined)).toEqual('primitive-special');
      expect(getDataTypePseudoName(null)).toEqual('primitive-special');

      expect(getDataTypePseudoName([1, 2, 4])).toEqual('object-array');
      expect(getDataTypePseudoName(() => {})).toEqual('object-function');

      expect(getDataTypePseudoName({})).toEqual('object');
      expect(getDataTypePseudoName(Math)).toEqual('object');
    });

    it('should be possible to compare with strict and non strict comparison', () => {

      expect(compareByType('hello', 'hello')).toEqual(1);
      expect(compareByType(100, 100)).toEqual(1);
      const obj = {};
      expect(compareByType(obj, obj)).toEqual(1);

      expect(compareByType('', 0)).toEqual(0);
      expect(compareByType('4', 4)).toEqual(0);

      expect(compareByType(10, 20)).toEqual(-1);
      expect(compareByType(4, undefined)).toEqual(-1);
      expect(compareByType('abc', Symbol('abc'))).toEqual(-1);
    });
  });

  describe('Numbers', () => {
    it('should be possible to increase only numbers', () => {

      expect(increase([])).toEqual(-1);
      expect(increase('5')).toEqual(-1);
      expect(increase(4)).toEqual(5);
      expect(increase(NaN)).toEqual(-1);
      expect(increase(Infinity)).toEqual(-1);
      expect(increase(4.75)).toEqual(5.75);
    });

    it('should be possible to test number for infinity or NaN', () => {

      expect(testForSafeNumber(25)).toEqual('safe');
      expect(testForSafeNumber('safe')).toEqual('danger');
      expect(testForSafeNumber({ 'i am': 'save' })).toEqual('danger');
      expect(testForSafeNumber(NaN)).toEqual('danger');
      expect(testForSafeNumber(Infinity)).toEqual('danger');
    });
  });

  describe('Strings', () => {
    it('should be possible to create array from string', () => {

      expect(stringToArray('this is JavaScript')).toEqual(['this', 'is', 'JavaScript']);
      expect(stringToArray('this is JavaScript ')).toEqual(['this', 'is', 'JavaScript']);
    });

    it('should be possible to fetch part of the string', () => {

      expect(getStringPart('this is JavaScript, my friend'))
        .toEqual('this is JavaScript');
      expect(getStringPart(',this is JavaScript, my friend')).toEqual('');
      expect(getStringPart('this is JavaScript my friend'))
        .toEqual('this is JavaScript my friend');
      expect(getStringPart('this is, JavaScript, my friend'))
        .toEqual('this is');
    });

    it('should be possible to test single entry of symbol into string', () => {

      expect(isSingleSymbolMatch('this is JavaScript, my friend', 's')).toEqual(false);
      expect(isSingleSymbolMatch('this is JavaScript, my friend', 'y')).toEqual(21);
      expect(isSingleSymbolMatch('this is JavaScript, my friend', 'c')).toEqual(13);
      expect(isSingleSymbolMatch('this is', 'j')).toEqual(false);
    });

  });

  describe('Arrays', () => {
    it('should be possible to stringify arrays with separators', () => {

      expect(join(['o', 'o', 'p'], '+')).toEqual('o+o+p');

      /* eslint-disable no-sparse-arrays */
      expect(join([1, , 3], '=')).toEqual('1==3');
      expect(join([1, 2, 3], '')).toEqual('1-2-3');
    });

    it('should be possible to make 1 array from two', () => {

      expect(glue(['o', 'o', 'p'], ['is', 'good'])).toEqual(['o', 'o', 'p', 'is', 'good']);
      expect(glue([1, , 3], [5, 7])).toEqual([1, , 3, 5, 7]);
      expect(glue([1, 2, 3], [])).toEqual([1, 2, 3]);
    });


    it('should be possible to sort array', () => {

      const arr1 = ['d', 'a', 't', 'm'];
      expect(order(arr1)).toEqual(['t', 'm', 'd', 'a']);
      expect(arr1).toEqual(['d', 'a', 't', 'm']);

      const arr2 = [1, 2, 3];
      expect(order(arr2)).toEqual([3, 2, 1]);
      expect(arr2).toEqual([1, 2, 3]);

      const arr3 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      expect(order(arr3)).toEqual(arr3);
      expect(arr3).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    it('should be possible to remove some items from array', () => {

      expect(removeNegative([1, 2, -4, 3])).toEqual([1, 2, 3]);
    });

    it('should be possible to build array without values from another one', () => {

      expect(without([1, 2, -4, 3], [1, 6, 12, -4, 8])).toEqual([2, 3]);
      expect(without([1, 2, 3], [1, 2, 3, 4])).toEqual([]);
    });

  });

  describe('Evaluation', () => {
    it('should calculate mathematical expression with different types of arguments', () => {

      expect(calcExpression('12/-4')).toEqual(-3);
      expect(calcExpression('7  *  4')).toEqual(28);
      expect(calcExpression('100/0')).toEqual(Infinity);
      expect(calcExpression('12+a8')).toEqual(NaN);
    });

    it('should evaluate logical expression with different types of arguments', () => {

      expect(calcComparison('12.1 > -88.1')).toEqual(true);
      expect(calcComparison('5<=12')).toEqual(true);
      expect(calcComparison('-25>=4.5')).toEqual(false);
      expect(calcComparison('1000>0')).toEqual(true);
      expect(calcComparison('95=5')).toEqual(false);
      expect(() => calcComparison('22>a')).toThrow();
    });

    it('should evaluate different keys', () => {

      expect(evalKey({ x: { y: 2 }, z: 5 }, '.x.y')).toEqual(2);
      expect(evalKey({ a: { b: { c: 8 } } }, '.a.b.c')).toEqual(8);
      expect(evalKey({ 1: { 2: { 3: 'c' } } }, '.1.2.3')).toEqual('c');
      expect(() => evalKey({ x: 'a' }, 'x')).toThrow();
      expect(() => evalKey({ x: { y: 2 }, z: 5 }, '.x.y.z')).toThrow();
    });
  });

});
