
// instance of hero should have

// .name // string
//   .charClass // sting
//   .life // number
//   .damage // number
//   .getName() // function returning name
//   .getCharClass() // function returning character class
//
//   // accepts - target - instance of Monster
//   // returns:
//   //         "I will attack only monsters" - in not monster was passed as target
//   //         "Hero attacked, " + GENERAL_ATTACK_MESSAGE
//   .attack(target) //

import { uppercaseFirstLetter } from './helpers';
import Monster from './Monster';

export default function Hero(name, charClass) {
  this.name = name;

  const supportedClasses = ['Warrior', 'Rogue', 'Sorcerer'];
  if (supportedClasses.indexOf(uppercaseFirstLetter(charClass)) === -1) {
    throw new Error('Incorrect character class provided');
  }

  this.charClass = uppercaseFirstLetter(charClass);
  this.life = 0;

  switch (this.charClass) {
    case 'Warrior':
      this.life = 30;
      this.damage = 4;
      break;

    case 'Rogue':
      this.life = 25;
      this.damage = 3;
      break;

    case 'Sorcerer':
      this.life = 20;
      this.damage = 5;
      break;

    default:
      throw new Error('how did you get here ?');
  }
}

Hero.prototype.getCharClass = function getCharClass() {
  return this.charClass;
};

Hero.prototype.getName = function getName() {
  return this.name;
};

// attack logic
// decrease amount of target life on the value of attackers damage
// accepts - target - instance of Monster or Hero
// returns GENERAL_ATACK_MESSAGE:
//         "CHARACTER_CLASS killed" - this action will kill target
//         "done AMOUNT_OF_DAMAGE damage to CHARACTER_CLASS";
// .attack(target)

// decrease amount of target life on the value of attackers damage
// accepts - target - instance of Monster or Hero
// returns:
//         "CHARACTER_CLASS killed" - this action will kill target
//         "done AMOUNT_OF_DAMAGE damage to CHARACTER_CLASS";
// .attack(target)

Hero.prototype.attack = function attack(enemy) {
  if (!(enemy instanceof Monster)) {
    return 'I will attack only monsters';
  }

  enemy.life -= this.damage;
  enemy.life = enemy.life < 0 ? 0 : enemy.life;

  if (enemy.life <= 0) {
    return `Hero attacked, ${enemy.charClass} killed`;
  }

  return `Hero attacked, done ${this.damage} damage to ${enemy.charClass}`;
};
