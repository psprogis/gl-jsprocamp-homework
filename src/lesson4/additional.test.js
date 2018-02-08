import lesson4 from '../lesson4';

const {
  createSet,
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
