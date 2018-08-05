
const Git      = require('nodegit');
const CLI      = require('clui')
const path     = require('path');
const inquirer = require('./inquirer');
const cs       = require('./constants');

const Spinner  = CLI.Spinner;

module.exports = {

  clone: async (type) => {
    const {name} = await inquirer.askRepoDetails();

    const clone = Git.Clone.clone;
    const cloneOptions = new Git.CloneOptions();

    if(type === cs.TS) {
      cloneOptions.checkoutBranch = 'typescript';
    }

    const status = new Spinner('Cloning repository...');
    status.start();

    try {
      await clone(cs.REPO, name, cloneOptions);
      return true;
    } catch(err) {
      throw err;
    } finally {
      status.stop();
    }
  }

};
