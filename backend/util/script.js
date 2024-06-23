const { exec } = require('child_process');
const path = require('path');

const currentDirectory = __dirname;
const script1 = path.join(currentDirectory, '../../url-csv-scripts', 'geenrate-company-url-csv.py');
const script2 = path.join(currentDirectory, '../../url-csv-scripts', 'search-keyword-in-pdf-url.py');

// Define the command line arguments (replace with your actual commands)
const commands = [
  `python -u "${script1}"`,
  `python -u "${script2}"`,
];

// Function to execute commands sequentially
const executeCommands = async () => {
  for (let command of commands) {
    await executeCommand(command);
  }
};

// Function to execute a single command
const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        reject(error);
      } else {
        console.log(`Command output:\n${stdout}`);
        resolve(stdout);
      }
    });
  });
};

module.exports = { executeCommands };
