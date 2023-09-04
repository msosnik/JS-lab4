# JS-lab4
JavaScript course at AGH lab 4

## Overview
This project contains node.js server/console application. It shows file read/write in sync and async way

## Packages and Tools
To run the project in VS Code, you will need following packages:
- fs-extra

        npm install fs-extra

## Console Application
Start the console application from command-line:

    node ./src/console_script2.mjs [--async --sync]

Example usage:

    node ./src/console_script2.mjs --async
    node ./src/console_script2.mjs --async
    
    node ./src/console_script2.mjs --sync

    node ./src/console_script2.mjs

## Server Application 1
Start your server as a standard node.js application from command-line:

    node ./src/server_script1.mjs

The server handles two routes:
- Route: GET "/" - displays a basic UI
- Route: GET "/submit" - displays a simple text depending on `name` parameter
- Route: POST "/" - displays a simple text (same as GET /submit) depending on `name` parameter which is passed in request body (payload)

Example usage (open links in web browser)

    http://localhost:8000
    http://localhost:8000/submit?name=ala
    http://localhost:8000/submit?name=ola

Execute a POST using curl and passing `name` parameter in request body

    curl -X POST -d "name=ola" http://localhost:8000

## Server Application 2
Start your server as a standard node.js application from command-line:

    node ./src/server_script2.mjs

The server handles two routes:
- Route: GET "/" - displays a basic UI
- Route: GET "/submit" - displays a simple text depending on `option` and `text` parameter

Example usage (open links in web browser)

    http://localhost:8000
    http://localhost:8000/submit?option=sync
    http://localhost:8000/submit?option=async
    http://localhost:8000/submit?option=---&text=cd


## Tests 
Client tests are written using mocha.
They can be started in 2 steps (in 2 terminals):

    # start server
    node src/server_script1

    # start test script
    npx mocha

To run tests supertest package is required.

    npm install supertest --save-dev

## Optional Tools
- Code Runner

        code --install-extension formulahendry.code-runner

- eslint

        code --install-extension dbaeumer.vscode-eslint # installation
        npm init @eslint/config # configuration

        npx eslint --fix 'src/*.js' # execution
        npx jsdoc src --verbose # jsdoc generation

