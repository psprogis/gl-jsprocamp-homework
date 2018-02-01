import lesson2 from '../lesson2';

const {
  sum,
  sumAll,
  pow,
  random,
} = lesson2.task;

describe('sum function', () => {
  it('should work with 2 numbers', () => {
    expect(sum(10, 20)).toBe(30);
    expect(sum(-10, 20)).toBe(10);
  });

  it('should throw exception if one of the arguments in not numeric', () => {
    expect(() => sum('abc', 10)).toThrow('Illegal first argument, should be a number');
    expect(() => sum(200, true)).toThrow('Illegal second argument, should be a number');
  });

  it('should throw exception with less then 2 arguments', () => {
    expect(() => sum(10)).toThrow('Not enough arguments, should be two numbers');
    expect(() => sum()).toThrow('Not enough arguments, should be two numbers');
  });
});


describe('sumAll function', () => {
  it('should return sum of all arguments', () => {
    expect(sumAll(1, 2, 3)).toBe(6);
    expect(sumAll(-100, 0, 50, 10.25, 1e5)).toBe(99960.25);
  });

  it('should return 0 w/o arguments', () => {
    expect(sumAll()).toBe(0);
  });

  // it('should ignore/skip illegal arguments')
});


describe('pow function', () => {
  it('should works with positive exponent', () => {
    expect(pow(2, 5)).toBe(32);
    expect(pow(-2, 2)).toBe(4);
    expect(pow(-10, 3)).toBe(-1000);
    expect(pow(-10, 0)).toBe(1);
  });

  it('should throw exception if base or exponent are not numeric', () => {
    expect(() => pow('bar', 5)).toThrow('Illegal value of base, should be a number');
    expect(() => pow(32, {})).toThrow('Illegal value of exponent, should be a positive integer number');
  });

  it('should throw exception if exponent is a float value', () => {
    expect(() => pow(2, 5.23)).toThrow('Illegal value of exponent, should be a positive integer number');
  });

  it('should throw exception if exponent is negative value', () => {
    expect(() => pow(2, -5)).toThrow('Exponent cannot be negative value');
  });
});

describe('random function', () => {
  it('should generate value with correct arguments', () => {
    const result = random(2, 100);

    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('should throw error if to argument is less than or equal to', () => {
    expect(() => random(2, 2)).toThrow('from argument should be less than to');
    expect(() => random(50, 40)).toThrow('from argument should be less than to');
  });

  it('should throw error if from or to are not numbric numbers', () => {
    expect(() => random('five', 2)).toThrow('Illegal value of lower bound, should be a number');
    expect(() => random(7, {})).toThrow('Illegal value of upper bound, should be a number');
  });
});
