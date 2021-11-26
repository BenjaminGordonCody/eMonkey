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

module.exports = {
  health,
  happy,
  nourished,
  educated,
};
