
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
          if (/\s/g.test(value)) {
            return 'Please enter a valid name for the repository.';
          } else {
            return true;
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
}
