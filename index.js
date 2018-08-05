#!/usr/bin/env node

const clear    = require('clear');
const chalk    = require('chalk');
const figlet   = require('figlet');
const cs       = require('./lib/constants');
const inquirer = require('./lib/inquirer');
const repo     = require('./lib/repo');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('w4kit', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  try {
    // Check initial choice
    const {create} = await inquirer.askInitialChoice();

    if(create === cs.QUIT) {
      return console.log(chalk.yellow(`Ok, bye ${process.env.USER}!`));
    }

    // Clone remote repository
    const folder = await repo.clone(create);

  } catch(err) {
    if (err) {
          console.log(err);
      }
    }
}

run();
