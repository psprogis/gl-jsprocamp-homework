import Hero from './Hero';
import AttackUnit from "./AttackUnit";

const monsterClasses = {
  zombie: {
    charClass: 'Zombie',
    life: 8,
    damage: 4,
  },
  skeleton: {
    charClass: 'Skeleton',
    life: 10,
    damage: 6,
  },
  holem: {
    charClass: 'Holem',
    life: 15,
    damage: 6,
  },
};

function Monster(charClass) {
  const classDescription = monsterClasses[charClass];
  if (classDescription === undefined) throw new Error('Incorrect character class provided');

  AttackUnit.call(this, charClass);

  this.charClass = classDescription.charClass;
  this.life = classDescription.life;
  this.damage = classDescription.damage;
}

Monster.prototype = Object.create(AttackUnit.prototype);
Monster.prototype.constructor = Monster;

// @override
Monster.prototype.getName = function getName() {
  return `I am ${this.charClass} I don\`t have name`;
};

Monster.prototype.attack = function attack(enemy) {
  if (!(enemy instanceof Hero)) {
    return 'I will attack only Hero';
  }

  const attackMsg = AttackUnit.prototype.attack.call(this, enemy);

  return `Monster attacked, ${attackMsg}`;

};

export default Monster;
