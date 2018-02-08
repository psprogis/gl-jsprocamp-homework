import lesson4 from '../lesson4';

const {
  createSet,
  createMap,
} = lesson4.task;

describe('Set additional tests', () => {

  it('should have chainable method add', () => {
    const mySet = createSet().add(10).add(20);
    expect(mySet.size).toBe(2);
    expect(mySet.inspect()).toBe('MySet { 10, 20 }');
  });

  it('should not allow to create set with duplicate initial data', () => {
    const mySet = createSet([1, 1, NaN, NaN, {}, {}]);
    expect(mySet.size).toBe(4);

    const obj = {};
    const mySecondSet = createSet([10, 10, obj, obj]);
    expect(mySecondSet.size).toBe(2);
  });

  it('should clear all elements', () => {
    const mySet = createSet([1, 2, 3]);
    mySet.clear();

    expect(mySet.size).toBe(0);
  });

  it('should support deletion of NaN values', () => {
    const mySet = createSet([NaN, 100, 0]);

    mySet.delete(NaN);

    expect(mySet.size).toBe(2);
    expect(mySet.inspect()).toBe('MySet { 100, 0 }');
  });

  it('should not allow to add duplicates', () => {
    const mySet = createSet([NaN, 10, 20]);
    mySet.add(NaN);

    expect(mySet.size).toBe(3);
  });
});

describe('Map additional tests', () => {

  it('should use NaN as key', () => {
    const myMap = createMap([[NaN, 10]]);

    expect(myMap.size).toBe(1);
    expect(myMap.get(NaN)).toBe(10);
  });

  it('should set NaN key', () => {
    const myMap = createMap([['first key', 10]]);
    myMap.set(NaN, 200);

    expect(myMap.size).toBe(2);
    expect(myMap.get(NaN)).toBe(200);

    myMap.set(NaN, 500);

    expect(myMap.size).toBe(2);
    expect(myMap.get(NaN)).toBe(500);
  });

  it('should delete NaN key', () => {
    const myMap = createMap()
      .set(NaN, 10)
      .set('second', 20);

    myMap.delete(NaN);

    expect(myMap.size).toBe(1);
  });

  it('should support object keys', () => {

    const obj = { a: 1 };
    const myMap = createMap([['first', 10], [obj, 20]])
      .set({ name: 'third key' }, 30);

    expect(myMap.size).toBe(3);
    expect(myMap.get(obj)).toBe(20);
  });

  it('should not create map with duplicate keys and use latest value', () => {
    const obj = {};
    const myMap = createMap([
      [1, 2], [1, 5],
      [NaN, 8], [NaN, 9],
      [obj, 1], [obj, 2],
    ]);

    expect(myMap.size).toBe(3);
    expect(myMap.get(1)).toBe(5);
    expect(myMap.get(NaN)).toBe(9);
    expect(myMap.get(obj)).toBe(2);
  });

});
