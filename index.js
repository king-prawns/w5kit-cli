#!/usr/bin/env node

const clear    = require('clear');
const cs       = require('./lib/constants');
const msg      = require('./lib/messages');
const inquirer = require('./lib/inquirer');
const repo     = require('./lib/repo');

clear();

msg.welcome();

const run = async () => {
  try {
    // Initial choice
    const {create} = await inquirer.askInitialChoice();

    if(create === cs.QUIT) {
      return msg.goodbye();
    }

    // Clone remote repository
    const {path, name} = await repo.clone(create);

    // Setup local repository
    const done = await repo.setupRepo(path, name);

    if(done) {
      msg.done(name);
    }
  } catch(err) {
    if (err) {
      console.log(err);
    }
  }
}

run();
