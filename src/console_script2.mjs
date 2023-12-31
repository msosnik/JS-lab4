/**
 * This is a JSDoc comment.
 * @module console_script2
 */

import fs from 'fs-extra';
import readline from 'readline';
import { exec } from 'child_process';
import { argv } from 'node:process';


const filePath = 'counter.txt';

/************************* */
function read_sync() {
  const data = String(fs.readFileSync(filePath, 'utf8'));
  const counter = parseInt(data, 10);
  return counter;
}
/************************* */
console.clear()

// Check for command-line options
const args = argv.slice(2); // Remove the first two elements (node and script path)

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '0');
}

if (args.length === 0) {
  console.error('No arguments provided. Open shell.');
  runShell();
} else if (args.includes('--sync')) {
  // The script was invoked with --sync
  console.log('Running in synchronous mode');
  const counterValue = read_sync() + 1;
  console.log(`Counter value: ${counterValue}`);
  fs.writeFileSync(filePath, String(counterValue));
} else if (args.includes('--async')) {
  // The script was invoked with --async
  console.log('Running in asynchronous mode');
  fs.readFile(filePath, 'utf8', (err, data)=> {
    if (err) {
        throw err;
    }    
    const counterValue = parseInt(data) + 1;
    console.log(`Counter value: ${counterValue}`);
    fs.writeFile(filePath, String(counterValue));
  });
} else {
  console.error('Usage: node src/console_script2.js [--sync | --async]');
  process.exit(1); // Exit with an error code
}


function runShell() {
  console.log("Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter a shell command: ', (command) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      runShell(); // Continue to the next command
    });
    rl.close();
  });
}

