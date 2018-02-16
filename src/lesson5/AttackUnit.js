
function AttackUnit() {

}

AttackUnit.prototype.getCharClass = function () {
  return this.charClass;
};

AttackUnit.prototype.getName = function getName() {
  throw new Error('should be implemented in sub-classes');
};

AttackUnit.prototype.attack = function (enemy) {
  if (!(enemy instanceof AttackUnit)) throw new Error('enemy should extend AttackUnit class');

  enemy.life -= this.damage;
  enemy.life = enemy.life < 0 ? 0 : enemy.life;

  if (enemy.life <= 0) {
    return `${enemy.charClass} killed`;
  }

  return `done ${this.damage} damage to ${enemy.getCharClass()}`;
};

export default AttackUnit;
