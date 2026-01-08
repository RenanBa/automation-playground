# Overview:
This is to demonstrate proficiency in Full API Test Suite skills.

I'm using: Jest / Supertest / Playwright API testing / TypeScript

This will have CI integration (GitHub Actions or Jenkins)

# Steps:

Ensure node and npm are installed: 
    node --version
    npm --version

How to install node: https://kinsta.com/blog/how-to-install-node-js/#how-to-install-nodejs-on-macos


Initialize npm project:
    npm init -y

Learn about Jest: https://jestjs.io/docs/getting-started
How to install Jest:
    npm install --save-dev jest

Learn about SuperTest: https://www.npmjs.com/package/supertest
How to install SuperTest:
    npm install supertest --save-dev

Install specific version:
    npm i jest@29.5.0 supertest@6.3.3

Install TypeScript with Jest, also jest and supertest types definition:
    npm install --save-dev jest typescript ts-jest @types/jest @types/supertest
        Make sure the "@types/jest" and "jest" have the same version

Create basic configuration:
    npx ts-jest config:init

Executing Jest test
    npx jest specs/poc.spec.ts

