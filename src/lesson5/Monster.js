
// instance of Monster should have

// .charClass // sting
//   .life	// number
//   .damage	// number
//   .getName() // function returning "I am MONSTER_CHARACTER_CLASS I don`t have name"
//   .getCharClass() // function returning character class
//
//   // accepts - target - instance of Hero
//   // returns:
//   //         "I will attack only Hero" - in not hero was passed as target
//   //         "Monster attacked, " + GENERAL_ATTACK_MESSAGE
//   .attack(target) //

import {uppercaseFirstLetter} from './helpers';
import Hero from './Hero';

export default function Monster (charClass) {

  const supportedClasses = ['Zombie', 'Skeleton', 'Holem'];
  if (supportedClasses.indexOf(uppercaseFirstLetter(charClass)) === -1) {
    throw new Error('Incorrect character class provided');
  }

  this.charClass = uppercaseFirstLetter(charClass);
  this.life = 0;


  switch (this.charClass) {
    case 'Zombie':
      this.life = 8;
      this.damage = 4;
      break;

    case 'Skeleton':
      this.life = 10;
      this.damage = 6;
      break;

    case 'Holem':
      this.life = 15;
      this.damage = 6;
      break;
  }
}

Monster.prototype.getCharClass = function() {
  return this.charClass;
};

Monster.prototype.getName = function() {
  return `I am ${this.charClass} I don\`t have name`;
};

// attack logic
// decrease amount of target life on the value of attackers damage
// accepts - target - instance of Monster or Hero
// returns GENERAL_ATACK_MESSAGE:
//         "CHARACTER_CLASS killed" - this action will kill target
//         "done AMOUNT_OF_DAMAGE damage to CHARACTER_CLASS";
// .attack(target)

Monster.prototype.attack = function(enemy) {
  if (!(enemy instanceof Hero)) {
    return 'I will attack only Hero';
  }

  enemy.life -= this.damage;
  enemy.life = enemy.life < 0 ? 0 : enemy.life;

  if (enemy.life <= 0) {
    return `Monster attacked, ${enemy.charClass} killed`;
  }

  return `Monster attacked, done ${this.damage} damage to ${enemy.charClass}`;

};
