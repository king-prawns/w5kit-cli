
const inquirer = require('inquirer');
const cs       = require('./constants');

module.exports = {

  askInitialChoice: () => {
    const questions = [
      {
        type: 'list',
        name: 'create',
        message: 'What do you prefer?',
        choices: [
          cs.JS,
          cs.TS,
          new inquirer.Separator(),
          cs.QUIT,
        ],
        default: cs.JS
      }
    ];
    return inquirer.prompt(questions);
  },

  askRepoDetails: () => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: 'webpack-4-starter-kit',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
}
