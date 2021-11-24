const inquirer = require("inquirer");

/*
A constructor for a pet

TODO
- add dance/play
- play consequences/feels - makes happier, healthier, less nourished
- add read (include array of things that could be read)
-add set/get for read
  -- makes happier
- implement death.
*/

// Stat boundaries + related numbers
let health = {
  max: 100,
  high: 75,
  low: 25,
  starvationPenalty: -10,
  despairPenalty: -5,
};

let happy = {
  max: 100,
  high: 75,
  low: 25,
  min: 0,
  starvationPenalty: -5,
  fullnessBonus: 6,
  sicknessPenalty: -5,
  healthBonus: 7,
};

let nourished = {
  max: 100, // nourished can exceed max, but this causes illness
  high: 75,
  low: 25,
  min: 0,
  vomit: -10,
  food: 15,
  drink: 6,
};

let educated = {
  max: 100,
  high: 75,
  low: 25,
};

// Pet constructor, also contains all pet methods
const Pet = function (name, type, age, colour) {
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
    // mainIF();
  };

  /* works through get*Feels() funcs, each of which returns an emotional
  statement and causes the knock on effects if a stat crosses a threshold
  Once all emotional statements are collected, they are printed to page.*/
  this.output = () => {
    output = [this.getDigestiveFeels, this.getHappyFeels, this.getHealthFeels];

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
    tempHappy = this.happy + num;
    if (tempHappy > happy.max) {
      this.happy = happy.max;
    } else if (tempHappy < happy.min) {
      this.happy = happy.min;
    } else {
      this.happy = tempHappy;
    }
  };

  this.changeHealth = (num) => {
    tempHealth = this.health + num;
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
    tempNourished = this.nourished + num;
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
};

// birth Wiggles
const wiggles = new Pet("Wiggles", "pig", 21, "eau-de-nil");
wiggles.refresh();

// Interface for wiggles

const mainIF = () => {
  inquirer
    .prompt([
      {
        name: "mainIF",
        type: "list",
        message: "What will you do next?",
        choices: ["Food", "Drink", "Vomit"],
      },
    ])
    .then((answer) => {
      console.clear();
      switch (answer.mainIF) {
        case "Food":
          wiggles.digest(nourished.food, "eat");
          break;
        case "Drink":
          wiggles.digest(nourished.drink, "drink");
          break;
        case "Vomit":
          wiggles.digest(nourished.vomit, "vomit");
          break;
        default:
          break;
      }
      mainIF();
    });
};

console.clear();
mainIF();
