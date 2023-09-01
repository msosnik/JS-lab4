
import fs from 'fs-extra';
import { argv } from 'node:process';
/************************* */
function read_sync() {
    let data = fs.readFileSync(argv[1]);
}
function read_async() {
    fs.readFile(argv[1], (err, data) => {
        if (err) throw err;
    });
}
/************************* */
console.clear()

// Check for command-line options
const args = process.argv.slice(2); // Remove the first two elements (node and script path)

if (args.length === 0) {
  console.error('No arguments provided. Open shell.');
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
    });
    rl.close();
  });
} else if (args.includes('--sync')) {
  // The script was invoked with --sync
  console.log('Running in synchronous mode');
  // Your synchronous code here
} else if (args.includes('--async')) {
  // The script was invoked with --async
  console.log('Running in asynchronous mode');
  // Your asynchronous code here
} else {
  console.error('Usage: node src/console_script2.js [--sync | --async]');
  process.exit(1); // Exit with an error code
}








console.log(`\x1B[31mSynchroniczny odczyt pliku "${argv[1]}"\x1B[0m`);
read_sync();
console.log('------------------');
console.log(`\x1B[31mAsynchroniczny odczyt pliku "${argv[1]}"\x1B[0m`);
read_async();
console.log('\x1B[34mWykonano ostatnią linię skryptu\x1B[0m');    