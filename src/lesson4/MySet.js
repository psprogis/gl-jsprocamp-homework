
export default function MySet(arr = []) {

  Object.defineProperties(this, {
    myValues: {
      enumerable: false,
      value: [],
    },
    size: {
      enumerable: true,
      get: () => this.myValues.length,
    },
  });

  this.myInit(arr);
}

MySet.prototype.add = function add(value) {
  if (this.myValues.includes(value)) return this;

  this.myValues.push(value);

  return this;
};

MySet.prototype.has = function has(value) {
  return this.myValues.includes(value);
};

MySet.prototype.delete = function del(value) {
  const valueIdx = this.myFindIndex(value);

  if (valueIdx === -1) return false;

  this.myValues.splice(valueIdx, 1);

  return true;
};

MySet.prototype.forEach = function forEach(callback) {
  this.myValues.forEach(value => {
    callback.call(null, value, value, this);
  });
};

MySet.prototype.clear = function clear() {
  this.myValues.length = 0;
};

MySet.prototype.myFindIndex = function myFindIndex(value) {

  // use Object.is to handle NaN?
  if (!Number.isNaN(value)) return this.myValues.indexOf(value);

  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.myValues.length; ++i) {
    if (Number.isNaN(this.myValues[i])) return i;
  }

  return -1;
};

MySet.prototype.myInit = function findUnique(arr) {
  arr.forEach(value => this.add(value));
};

MySet.prototype[Symbol.toPrimitive] = function toPrimitive() {
  // if (hint === 'number') {
  //   return this.myValues.reduce((prev, next) => prev + next);
  // }

  return '[object MySet]';
};

MySet.prototype.inspect = function inspect() {
  // FIXME

  return `MySet { ${this.myValues.toString().replace(',', ', ')} }`;
};

// keys

// values

// entries

// for of support
