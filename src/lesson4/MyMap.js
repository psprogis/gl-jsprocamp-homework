
export default function MyMap(arr = []) {

  // TODO: use define property
  this.myKeys = [];
  this.myValues = [];

  this.init(arr);

  Object.defineProperty(this, 'size', {
    get: () => this.myKeys.length,
  });
}

MyMap.prototype.init = function init(arr) {
  arr.forEach(([key, value]) => {
    this.set(key, value);
  });
};

MyMap.prototype.set = function set(key, value) {

  const keyIdx = this.findIndex(key);

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
  const keyIdx = this.findIndex(key);

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
  const keyIdx = this.myKeys.indexOf(key);

  if (!keyIdx) return false;

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

MyMap.prototype.findIndex = function findIndex(key) {
  if (!Number.isNaN(key)) return this.myKeys.indexOf(key);

  /* eslint-disable no-plusplus */
  for (let i = 0; i < this.myKeys.length; ++i) {
    if (Number.isNaN(this.myKeys[i])) return i;
  }

  return -1;
};
