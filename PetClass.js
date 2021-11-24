let { health, happy, nourished, educated } = require("./boundaries.js");

// Pet constructor, also contains all pet methods
class Pet {
  constructor(name, type, age, colour) {
    this.name = name;
    this.typeOfPet = type;
    this.age = age;
    this.colour = colour;
    this.nourished = 15;
    this.health = 100;
    this.happy = 100;

    // Refreshes pages and enacts consequences
    this.refresh = () => {
      this.output();
      this.stats();
    };

    /* works through get*Feels() funcs, each of which returns an emotional
        statement and causes the knock on effects if a stat crosses a threshold
        Once all emotional statements are collected, they are printed to page.*/
    this.output = () => {
      let output = [
        this.getDigestiveFeels,
        this.getHappyFeels,
        this.getHealthFeels,
      ];

      for (let item in output) {
        output[item] = `${this.name} ${output[item]()}`;
        console.log(output[item]);
      }
    };

    //Prints pet's stats in full
    this.stats = () => {
      console.log(`Your pet's stats:\n`);
      for (const key in this) {
        if (typeof this[key] != "function") {
          console.log(`${key}: ${this[key]}`);
        }
      }
    };

    /// STAT SETTERS
    // Thse methods alter the pet's stats, but stop them crossing max/min values
    this.changeHappy = (num) => {
      let tempHappy = this.happy + num;
      if (tempHappy > happy.max) {
        this.happy = happy.max;
      } else if (tempHappy < happy.min) {
        this.happy = happy.min;
      } else {
        this.happy = tempHappy;
      }
    };

    this.changeHealth = (num) => {
      let tempHealth = this.health + num;
      if (tempHealth > health.max) {
        this.health = health.max;
      }
      if (tempHealth < health.min) {
        this.health = health.min;
      } else {
        this.health = tempHealth;
      }
    };

    this.changeNourished = (num) => {
      let tempNourished = this.nourished + num;
      if (tempNourished > nourished.max) {
        this.nourished = nourished.max;
      }
      if (tempNourished < nourished.min) {
        this.nourished = nourished.min;
      } else {
        this.nourished = tempNourished;
      }
    };

    /// FEELING GETTERS
    // These functions check what a particular stat is, enact any related
    // consequences, and return a string describing the pet's state.
    this.getHealthFeels = () => {
      if (this.health < health.low / 2) {
        this.changeHappy(happy.sicknessPenalty);
        return "is dying.";
      } else if (this.health <= health.low) {
        this.changeHappy(happy.sicknessPenalty);
        return "isn't well.";
      } else if (this.health >= health.high) {
        this.changeHappy(happy.healthBonus);
        return "is physically spectacular";
      }
      return "is physically adequate";
    };

    this.getDigestiveFeels = () => {
      if (this.nourished <= 0) {
        this.changeHealth(health.starvationPenalty);
        this.changeHappy(happy.starvationPenalty);
        return "is starving.";
      }
      if (this.nourished >= nourished.high) {
        this.changeHealth(this.nourished - nourished.high);
        if (this.nourished >= nourished.max) {
          this.nourished -= nourished.vomit;
          return "is vomiting."; //this.digest not used as causes loop
        } else {
          return "has overeaten";
        }
      }
      if (this.nourished >= nourished.low) {
        this.changeHappy(happy.fullnessBonus);
        return "feels full.";
      } else if (this.nourished < nourished.low) {
        return "is hungry";
      }
    };

    this.getHappyFeels = () => {
      if (this.happy == happy.max) {
        return "couldn't be happier";
      } else if (this.happy >= happy.high) {
        return "is very happy";
      } else if (this.happy >= happy.low) {
        return "is happy";
      } else if (this.happy > 0) {
        return "is unhappy";
      } else {
        this.changeHealth(health.despairPenalty);
        return "is in despair";
      }
    };
    /// ACTIONS THE PET CAN DO
    this.digest = (nutrition, verb) => {
      this.changeNourished(nutrition);
      console.log(`${this.name} is ${verb}ing!`);
      this.refresh();
    };
  }
}

module.exports = {
  Pet,
};
