import { uppercaseFirstLetter } from './helpers';

function AttackUnit(charClass, life, damage) {
  this.charClass = charClass;
  this.life = life;
  this.damage = damage;
}

AttackUnit.prototype.getCharClass = function getCharClass() {
  return uppercaseFirstLetter(this.charClass);
};

AttackUnit.prototype.getName = function getName() {
  throw new Error('should be implemented in sub-classes');
};

AttackUnit.prototype.attack = function attack(enemy) {
  if (!(enemy instanceof AttackUnit)) throw new Error('enemy should extend AttackUnit class');

  enemy.life -= this.damage;
  enemy.life = enemy.life < 0 ? 0 : enemy.life;

  if (enemy.life <= 0) {
    return `${enemy.getCharClass()} killed`;
  }

  return `done ${this.damage} damage to ${enemy.getCharClass()}`;
};

export default AttackUnit;
