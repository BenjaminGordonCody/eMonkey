const inquirer = require("inquirer");
let { health, happy, nourished, educated } = require("./boundaries.js");
let { Pet } = require("./PetClass.js");
console.log(Pet);

// TODO
// - add dance/play
// - play consequences/feels - makes happier, healthier, less nourished
// - add read (include array of things that could be read)
// -add set/get for read
//   -- makes happier
// - implement death.

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
