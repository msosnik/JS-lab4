/**
 * This is a JSDoc comment.
 * @module server_script2
 */

// const http = require('node:http');
// const { URL } = require('node:url');
import http from 'node:http';
import { URL } from 'node:url';

import fs from 'fs-extra';
import { exec } from 'child_process';

const filePath = 'counter.txt';

/************************* */
function read_sync() {
  const data = String(fs.readFileSync(filePath, 'utf8'));
  const counter = parseInt(data, 10);
  return counter;
}

/**
     * Handles incoming requests.
     *
     * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
     * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
     * The answer sent by this stream must consist of two parts: the header and the body.
     * <ul>
     *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
     *  <li>The body contains the correct data, e.g. a form definition.
     * </ul>
     * @author Stanisław Polak <polak@agh.edu.pl>
*/
function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    // Create the URL object
    const url = new URL(request.url, `http://${request.headers.host}`);
    /* ************************************************** */
    if (!request.headers['user-agent'])
        console.log(url);  
        
    /* ******** */
    /* "Routes" */
    /* ******** */
    /* ---------------- */
    /* Route "GET('/')" */
    /* ---------------- */
    if (url.pathname === '/' && request.method === 'GET') {
        // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is HTML
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        /* ************************************************** */
        // Setting a response body
        response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Web Page</title>
  </head>
  <body>
  <h1>My Web Page</h1>
    <form method="GET" action="/submit">
      <label for="dropdown">Choose an option:</label>
      <select id="dropdown" name="option">
        <option value="---">---</option>
        <option value="sync">Sync</option>
        <option value="async">Async</option>
      </select>
      <br>
      <label for="textbox">Enter command (text):</label>
      <input type="text" id="textbox" name="text">
      <br>
      <input type="submit" value="Submit">
      <input type="reset" value="Reset">
    </form>
  </body>
</html>`);
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }
    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    else if (url.pathname === '/submit' && request.method === 'GET') {
        // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
        /* ************************************************** */
        if (url.searchParams.get('option') === 'sync') {
          console.log('Running in synchronous mode');
          const counterValue = read_sync() + 1;
          console.log(`Counter value: ${counterValue}`);
          fs.writeFileSync(filePath, String(counterValue));
          writeHTMLResponseCounter(response, counterValue);
        } else if (url.searchParams.get('option') === 'async') {
          console.log('Running in asynchronous mode');
          fs.readFile(filePath, 'utf8', (err, data)=> {
            if (err) {
                throw err;
            }    
            const counterValue = parseInt(data) + 1;
            console.log(`Counter value: ${counterValue}`);
            fs.writeFile(filePath, String(counterValue));
            writeHTMLResponseCounter(response, counterValue);
           });
        } else if (url.searchParams.get('option') === '---') {
          // Creating an answer header — we inform the browser that the returned data is plain text
          const command = url.searchParams.get('text');          
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              writeTextResponse(response, `exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            writeTextResponse(response, `stdout:\n ${stdout} \nstderr:\n ${stderr}`);    
          });
        } else {
          writeTextResponse(response, `Wrong option: ${url.searchParams.get('option')}`);   
        }
    }
    /* -------------------------- */
    /* If no route is implemented */
    /* -------------------------- */
    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}
/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');

function writeHTMLResponseCounter(response, counterValue) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Liczba uruchomien</title>
</head>
<body>
  <h1>Liczba uruchomien: ${counterValue}</h1>
</body>
</html>`);
  response.end();
}


function writeTextResponse(response, text) {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.write(text);
  response.end();
}
