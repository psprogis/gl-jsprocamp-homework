import Hero from './Hero';
import Monster from './Monster';
import Game from './Game';
import { getRandomInt } from './helpers';

/* Game Population mechanism should go below */
/* eslint-disable no-unused-vars */
function getRandomMonster() {
  const monsterClasses = ['zombie', 'skeleton', 'holem'];
  const randomIdx = getRandomInt(0, 2);

  return new Monster(monsterClasses[randomIdx]);
}

function getRandomHero(name) {
  const monsterClasses = ['warrior', 'rogue', 'sorcerer'];
  const randomIdx = getRandomInt(0, 2);

  return new Hero(name, monsterClasses[randomIdx]);
}
/* eslint-enable no-unused-vars */

// @example
// const game = new Game();
// game.addMonster(getRandomMonster());
// game.addMonster(getRandomMonster());
// game.addHero(getRandomHero('hero'));
//
// game.beginJourney();
//
// while (game.status === 'In progress') {
//   game.fight();
//   game.finishJourney();
// }
/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster,
};
