import MySet from './MySet';

export default function MyMap(arr = []) {

  // make some special "private" properties not enumerable
  Object.defineProperties(this, {
    myKeys: {
      value: [],
      enumerable: false,
    },
    myValues: {
      value: [],
      enumerable: false,
    },
    size: {
      get: () => this.myKeys.length,
      enumerable: true,
    },
  });

  this.myInit(arr);
}

MyMap.prototype.myInit = function init(arr) {
  arr.forEach(([key, value]) => {
    this.set(key, value);
  });
};

MyMap.prototype.set = function set(key, value) {

  const keyIdx = this.myFindIndex(key);

  // this is new key
  if (keyIdx === -1) {
    this.myKeys.push(key);
    this.myValues.push(value);

    // update value
  } else {
    this.myValues[keyIdx] = value;
  }

  return this;
};

MyMap.prototype.get = function get(key) {
  const keyIdx = this.myFindIndex(key);

  return keyIdx !== -1 ? this.myValues[keyIdx] : undefined;
};

MyMap.prototype.clear = function clear() {
  this.myValues.length = 0;
  this.myKeys.length = 0;
};

MyMap.prototype.has = function has(key) {
  return this.myKeys.includes(key);
};

MyMap.prototype.delete = function del(key) {
  const keyIdx = this.myFindIndex(key);

  if (keyIdx === -1) return false;

  this.myKeys.splice(keyIdx, 1);
  this.myValues.splice(keyIdx, 1);

  return true;
};

MyMap.prototype.forEach = function forEach(callback) {

  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.myKeys.length; ++i) {
    callback.call(null, this.myValues[i], this.myKeys[i], this);
  }
};

MyMap.prototype.myFindIndex = function myFindIndex(key) {

  // use Object.is instead ?
  if (!Number.isNaN(key)) return this.myKeys.indexOf(key);

  // use normal for-loop since we need index of key
  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.myKeys.length; ++i) {
    if (Number.isNaN(this.myKeys[i])) return i;
  }

  return -1;
};

MySet.prototype[Symbol.toPrimitive] = function toPrimitive() {
  return '[object MyMap]';
};

// keys

// values

// entries

// for of support
