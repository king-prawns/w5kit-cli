const exec     = require('child_process').exec;
const fs       = require('fs-extra');
const Git      = require('nodegit');
const CLI      = require('clui');
const inquirer = require('./inquirer');
const cs       = require('./constants');

const Spinner  = CLI.Spinner;

module.exports = {

  clone: async (type) => {
    const {name} = await inquirer.askRepoDetails();

    const clone = Git.Clone.clone;
    const cloneOptions = new Git.CloneOptions();

    const repo = type === cs.TS ? cs.REPO_TS : cs.REPO_JS;
    const msg = `Cloning Webpack 4 Starter Kit${type === cs.TS ? ' - TS' : ''}...`

    const status = new Spinner(msg);

    status.start();
    const repository = await clone(repo, name, cloneOptions);
    status.stop();

    return {path: repository.workdir(), name};
  },

  setupRepo: async (path, name) => {
    // remove git folder
    await fs.remove(`${path}.git`);

    // edit package.json file
    const pkg = await fs.readJson(`${path}package.json`)
    pkg.name = name;
    pkg.description = '';
    pkg.version = '0.0.1'
    delete pkg.author;
    delete pkg.homepage;
    await fs.writeJson(`${path}package.json`, pkg, {spaces: 2});

    // edit manifest.json file
    const mft = await fs.readJson(`${path}src/manifest.json`);
    mft.name = name;
    mft.description = '';
    mft.version = '0.0.1';
    mft.short_name = '';
    await fs.writeJson(`${path}src/manifest.json`, mft, {spaces: 2});

    // installing packages
    const status = new Spinner('Installing packages. This might take a couple of minutes.');

    status.start();
    await new Promise((resolve, reject) => {
        exec(`cd ${path} && yarn`,
        (error, stdout, stderr) => {
          if (error !== null) {
            return reject();
          }
          return resolve();
      });
    });
    status.stop();

    return true;
  }

};
