import Monster from './Monster';
import AttackUnit from './AttackUnit';

const heroClasses = {
  warrior: {
    charClass: 'Warrior',
    life: 30,
    damage: 4,
  },
  rogue: {
    charClass: 'Rogue',
    life: 25,
    damage: 3,
  },
  sorcerer: {
    charClass: 'Sorcerer',
    life: 20,
    damage: 5,
  },
};

function Hero(name, charClass) {
  const classDescription = heroClasses[charClass];
  if (classDescription === undefined) throw new Error('Incorrect character class provided');

  AttackUnit.call(this, charClass, classDescription.life, classDescription.damage);

  this.name = name;
}

// inherit from AttackUnit
Hero.prototype = Object.create(AttackUnit.prototype);
Hero.prototype.constructor = Hero;

// @override
Hero.prototype.getName = function getName() {
  return this.name;
};

Hero.prototype.attack = function attack(enemy) {
  if (!(enemy instanceof Monster)) return 'I will attack only monsters';

  const attackMsg = AttackUnit.prototype.attack.call(this, enemy);

  return `Hero attacked, ${attackMsg}`;
};

export default Hero;
