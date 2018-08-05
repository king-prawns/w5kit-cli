
const chalk    = require('chalk');
const figlet   = require('figlet');

module.exports = {

  welcome: () => {
    console.log(
      chalk.yellow(
        figlet.textSync('w4kit', { horizontalLayout: 'full' })
      )
    );
  },

  goodbye: () => {
    console.log(chalk.yellow(`Ok, bye ${process.env.USER}!`));
  },

  done: (name) => {
    console.log();
    console.log(chalk.green('All done! 🎉'));
    console.log();
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan('yarn dev'));
    console.log('  Starts the development server.');
    console.log();
    console.log(chalk.cyan('yarn build'));
    console.log('  Bundles the app into static files for production.');
    console.log();
    console.log(chalk.cyan('yarn lint'));
    console.log('  Starts the linter tool.');
    console.log();
    console.log(chalk.cyan('yarn test'));
    console.log('  Starts the test runner.');
    console.log();
    console.log();
    console.log('I suggest that you begin by typing:');
    console.log();
    console.log(`cd ${chalk.cyan(name)}`);
    console.log(chalk.cyan('yarn dev'));
    console.log();
  }

}
