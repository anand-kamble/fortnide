/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const program = require('child_process');
let chalk = require('chalk'),
  prompts;

try {
  prompts = require('prompts');
  main();
} catch (error) {
  console.log(chalk.greenBright('\nInstalling required packages for this script'));
  program.exec('npm i prompts --save-dev', (error, stdout, stderr) => {
    import('prompts').then(pack => {
      prompts = pack;
      main();
    });
  });
}

function print(msg) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(String(msg));
}

function runProgram(command) {
  return new Promise((resolve, reject) => {
    program.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stdout) {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  let packageManager = ''; //can be npm or yarn.
  packageManager = await prompts([
    {
      type: 'select',
      name: 'value',
      message: 'Select your preffered package manager.',
      choices: [
        { title: 'NPM', value: 'npm' },
        { title: 'Yarn', value: 'yarn' },
      ],
    },
  ]);

  if (packageManager.value === 'yarn') {
    try {
      program.exec('npm list -g yarn --json', (error, stdout, stderr) => {
        if (stdout) {
          if (Object.keys(JSON.parse(stdout).dependencies).includes('yarn')) {
            prepare(packageManager.value);
          }
        }
      });
    } catch (e) {}
  } else if (packageManager.value === 'npm') {
    prepare(packageManager.value);
  }
}

async function prepare(packageManager) {
  let packagesReq = ['husky'];

  let testingPackage = await prompts([
    {
      type: 'select',
      name: 'value',
      message: 'Select your preffered testing library.',
      choices: [
        { title: 'Cypress', value: 'cypress' },
        { title: 'Jest', value: 'jest' },
      ],
    },
  ]);

  packagesReq.push(testingPackage.value);
  for (const package of packagesReq) {
    let commandPrefix = '';
    if (packageManager === 'yarn') {
      commandPrefix = 'yarn add ';
    } else if (packageManager === 'npm') {
      commandPrefix = 'npm i ';
    }
    let a = 0;
    let loop = setInterval(() => {
      a++;
      print(chalk.yellowBright(`Installing ${package} ${'.'.repeat(a)}`));
    }, 200);
    await runProgram(commandPrefix + package);
    clearInterval(loop);
    console.log('\n');
  }
}

// program.exec('npm list husky', (error, stdout, stderr) => {
//   //   console.log('stdout: ' + stdout);
//   //   console.log('stderr: ' + stderr);
//   if (error !== null) {
//     console.log(chalk.cyanBright("\nLooks like you don't have husky installed.\n"));
//     // console.log('exec error: ' + error);
//   }
// });
