
export default function MySet(arr = []) {

  Object.defineProperty(this, 'arr', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: this.filterUnique(arr),
  });

  Object.defineProperty(this, 'size', {
    get: () => this.arr.length,
  });

}

MySet.prototype[Symbol.toPrimitive] = function toPrimitive() {
  // if (hint === 'number') {
  //   return this.arr.reduce((prev, next) => prev + next);
  // }

  return '[object MySet]';
};

MySet.prototype.inspect = function inspect() {
  // FIXME

  return `MySet { ${this.arr.toString().replace(',', ', ')} }`;
};

MySet.prototype.add = function add(value) {
  if (this.arr.includes(value)) return this;

  this.arr.push(value);

  return this;
};

MySet.prototype.has = function has(value) {
  return this.arr.includes(value);
};

MySet.prototype.delete = function del(value) {
  const valueIdx = this.findIndex(value);

  if (valueIdx === -1) return false;

  this.arr.splice(valueIdx, 1);

  return true;
};

MySet.prototype.forEach = function forEach(callback) {
  this.arr.forEach(value => {
    callback.call(null, value, value, this);
  });
};

MySet.prototype.clear = function clear() {
  this.arr.length = 0;
};

MySet.prototype.findIndex = function findIndex(value) {
  if (!Number.isNaN(value)) return this.arr.indexOf(value);

  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.arr.length; ++i) {
    if (Number.isNaN(this.arr[i])) return i;
  }

  return -1;
};

MySet.prototype.filterUnique = function findUnique(arr) {
  // return arr.filter(item, idx) => arr.indexOf(item) === idx;
  const result = [];

  // use for of to support any iterable
  /* eslint-disable no-restricted-syntax */
  for (const value of arr) {
    if (!result.includes(value)) {
      result.push(value);
    }
  }

  return result;
};

// keys

// values

// entries

// for of support
