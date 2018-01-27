/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/
// TODO: handle illegal arguments
export function sum(a = 0, b = 0) {
  return a + b;
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/
// TODO: handle illegal arguments
export function sumAll(...args) {
  return args.reduce((prev, next) => prev + next, 0);
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/
// TODO: handle illegal arguments
export function pow(x, n) {
  let res = 1;

  // yes, let's use i += 1 like fucking idiots, instead of ++i, just to avoid eslint warnings
  for (let i = 0; i < n; i += 1) {
    res *= x;
  }

  return res;
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/
// TODO: handle illegal arguments
export function random(from, to) {

  // TODO: find workaround for eslint to remove () and avoid errors
  let rand = (from - 0.5) + (Math.random() * (to - (from + 1)));
  rand = Math.round(rand);

  return rand;
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
