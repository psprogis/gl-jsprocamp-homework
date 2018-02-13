
import Hero from './Hero';
import Monster from './Monster';

const statuses = {
  IDLE: 'Idle',
  PROGRESS: 'In progress',
  FINISHED: 'Finished',
};

const MAX_MONSTERS = 2;

// Should have properties
// status - String, representing current game status
// hero - Object, representing hero
// monsters - Array of Objects, representing monsters, max = maxMonsters

// Should have methods
// beginJourney - Change game status to "In Progress".
//     It should be impossible to begin journey if game misses heroe and 2 monsters
// addHero - To add hero to game
// addMoster - To add monster to the game


export default function Game() {
  this.status = statuses.IDLE;
  this.hero = undefined; // FIXME: try to avoid using undefined
  this.monsters = [];
}

// Change game status from "Idle" to "In progress", should be possible only if hero and monsters are defined
// returns: "Your journey has started, fight monsters" - if ok
// throw new Error("Cannot start journey, populate the world with hero and monsters first")
//     - if smth went wrong
Game.prototype.beginJourney = function beginJourney() {
  if (this.hero === null || this.monsters.length === 0) {
    throw new Error('Cannot start journey, populate the world with hero and monsters first');
  }

  this.status = statuses.PROGRESS;

  return 'Your journey has started, fight monsters';
};

// Change game status from "In progress" to "Finished",
// possible only if hero or both monsters are dead(their life equals 0)
// retures:
//        "The Game is finished. Monstrs are dead. Congratulations" - if both monsters are dead
//        "The Game is finished. Hero is dead :(" - if hero is dead
//        "Don`t stop. Some monsters are still alive. Kill`em all" - if its not time yet
Game.prototype.finishJourney = function finishJourney() {
  const isHeroDead = this.hero.life === 0;
  const areMonstersDead = this.monsters.every(monster => monster.life === 0);

  // vital units are still alive
  if (!isHeroDead && !areMonstersDead) {
    return 'Don`t stop. Some monsters are still alive. Kill`em all';
  }

  this.status = statuses.FINISHED;

  if (isHeroDead) return 'The Game is finished. Hero is dead :(';
  if (areMonstersDead) return 'The Game is finished. Monsters are dead. Congratulations';

  return 'Unexpected game state';
};

// set game.hero to hero instance
// accepts: instance of Hero class
// throw:
//        "Only one hero can exist" - if hero is already defined
//        "Only hero instance can be hero" - if not hero was passed to function
// returns:
//        "Hero created, welcome HERO_NAME" - if ok
Game.prototype.addHero = function addHero(hero) {
  if (!(hero instanceof Hero)) throw new Error('Only hero instance can be hero');

  if (this.hero) throw new Error('Only one hero can exist');

  this.hero = hero;

  return `Hero created, welcome ${this.name}`;
};

// adds monster to game.monsters array
// accepts: instance of Monster class
// throw:
//        "Only 2 monsters can exist" - if there are already 2 monsters defined
//        "Only monster Instances can become monsters" - if not monster was passed to function
// returns:
//        "Monster Created, MONSTER_CHARACTER_CLASS appeared in the world" - if ok
Game.prototype.addMonster = function addMonster(monster) {
  if (!(monster instanceof Monster)) throw new Error('Only monster Instances can become monsters');

  if (this.monsters.length === MAX_MONSTERS) throw new Error('Only 2 monsters can exist');

  this.monsters.push(monster);

  return `Monster Created, ${monster.getCharClass()} appeared in the world`;
};

// Initiate a battle between hero and monster, one after another,
// they should attack each other, starting from hero,
// and until someone life is not 0
// returns string 'Hero win' or 'Monster win', depending on who has life points left
Game.prototype.fight = function fight() {
  if (this.status !== statuses.PROGRESS) throw new Error('Begin your journey to start fighting monsters');

  const monster = this.monsters.filter(monster => monster.life !== 0)[0];
  const { hero } = this;

  while (true) {

    if (hero.life) {
      hero.attack(monster);
    } else {
      return 'Monster win';
    }

    if (monster.life) {
      monster.attack(hero);
    } else {
      return 'Hero win';
    }
  }
};
