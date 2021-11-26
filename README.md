# eMonkey
 A virtual pet project for CLI or browser.

## TODO
- [x] ~~The original version of this project assumed the user would interact via the browser. The current goal is to refactor the code to provide a CLI native version using inquirer.~~ [26/11/2021]
- [ ] The next task will be to refactor the CLI version to use a game-loop.
- [ ] Then I will add more activities for the user to do with the pet.
- [ ] Then implement age, death and evolution events.
- [ ] I will add reactive styling (via CSS or Chalk, depending on platform) so that pet stats have a visual effect.
- [ ] I will draw and animate CSS stylable character sprites for the browser version of the game.

## Structure
 - Both versions rely on a Pet class to create a pet object. This object contains the majority of functions for the app, including generating outputs, and also the stats for the pet. 
 - The browser version uses vanilla JS to output to browser via DOM. HTML and CSS are barebones. 
 - The CLI version uses Inquirer to handle the interface, which requires the introduction of async functions to handle user interaction. Currently, the interface is called recursively. Whilst the demand on the system is fairly low, this will be refactored to use a more traditional game-loop structure. 
