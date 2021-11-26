const inquirer = require("inquirer");
const ListPrompt = require("inquirer/lib/prompts/list");
let { health, happy, nourished, educated } = require("./boundaries.js");
let { Pet } = require("./PetClass.js");

// TODO
// refactor recursive "mainIF" to use whilst/gameloop instead.
// - add dance/play
// - add consequences/feelings for play - makes happier, healthier, less nourished
// - add read (include array of things that could be read)
// -add consequences/feelings for read
//   -- makes happier
// - implement death.
// implement "time" somehow, stats changing, time before evolution etc
// -implement evolutions ala pokemon for each pet species
// decide on boundaries for stats (boundaries.js)
//remove vomit function (it was only there for testing)

async function getOrderForm() {
  let promise = await inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is your pet's name?",
      },
      {
        name: "age",
        type: "number",
        message: "What age pet would you like to adopt?",
      },
      {
        name: "species",
        type: "list",
        message: "What species of animal would you like to adopt",
        choices: [
          "Ardvark",
          "A small rock with inscrutable energy",
          "Biblical Angel (Plagues)",
          "Biblical Angel (Sexy)",
          "Cultural Commentator Germaine Greer",
          "Dog",
          "Nematode",
          "Trumpet",
          "Utilitarian Shift Dress",
        ],
      },
      {
        name: "colour",
        type: "input",
        message: "What colour would you like your pet's coat to be?",
      },
    ])
    .then((answer) => {
      orderForm = answer;
    });
  return orderForm;
}

const mainIF = (wiggles) => {
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
      mainIF(wiggles);
    });
};

async function main() {
  // Let user specify pet details
  let orderForm = await getOrderForm();

  // birth Wiggles
  const wiggles = new Pet(
    orderForm.name,
    orderForm.species,
    orderForm.age,
    orderForm.colour
  );

  // Main Interfaces for Wiggles

  console.clear();
  wiggles.refresh();
  mainIF(wiggles);
}

main();
