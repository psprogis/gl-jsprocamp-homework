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
    expect(mySet.has(1)).toBe(false);
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

  it('should return false if delete non-existent value', () => {
    const mySet = createSet().add(10).add(20);

    expect(mySet.delete(100)).toBe(false);
  });
});

describe('Map additional tests', () => {

  it('should use NaN as key in constructor', () => {
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

  it('should check if it has some key', () => {
    const myMap = createMap([['a', 1], ['b', 2], ['c', 3]]);

    expect(myMap.has('b')).toBe(true);
    expect(myMap.has('d')).toBe(false);
  });

  it('should delete 1 element', () => {
    const myMap = createMap([['a', 1], ['b', 2], ['c', 3]]);

    expect(myMap.delete('b')).toBe(true);
    expect(myMap.size).toBe(2);

    expect(myMap.delete('d')).toBe(false);
    expect(myMap.size).toBe(2);
  });

  it('should clear all elements', () => {
    const myMap = createMap([['a', 1]]);
    myMap.set('b', 2).set('c', 3);

    myMap.clear();
    expect(myMap.size).toBe(0);
    expect(myMap.get('a')).toBeUndefined();
  });

});
