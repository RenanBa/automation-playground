# Overview:
This is to demonstrate proficiency in Full API Test Suite skills.
Testing apprach based on a Company that sells e-commerce products.

## Project Goal
* Build automated testing framework for a mock e-commerce web application, designed to meet the requirements for Test Automation Engineer position.
* Testing Tech Stack: Jest / Supertest / API testing / TypeScript / CI integration (Jenkins).
* Key Responsibilities Addressed
    1. Design and implement automated tests for API endpoints using JavaScript ecosystem.
    2. Write and execute automated tests for RESTfull web services.
    3. Continuously improve test automation framework and processes.
    4. Assist with continuous integration and deployment.


#### Learn about:
 * Jest: https://jestjs.io/docs/getting-started
 * SuperTest: https://www.npmjs.com/package/supertest
 * Jenkins: https://www.jenkins.io/

# Steps to install Jest, SuperTest and execute test:

#### Ensure node and npm are installed: 
    node --version
    npm --version

#### How to install node:
    https://kinsta.com/blog/how-to-install-node-js/#how-to-install-nodejs-on-macos

#### Initialize npm project:
    npm init -y

#### Install Jest:
    npm install --save-dev jest

#### Install SuperTest:
    npm install supertest --save-dev

#### How to install specific version of jest and/or supertest:
    npm i jest@29.5.0 supertest@6.3.3

#### Install TypeScript with Jest, also jest and supertest types definition:
    npm install --save-dev jest typescript ts-jest @types/jest @types/supertest
Make sure the "@types/jest" and "jest" have the same version to avoid conflicts.

#### Create basic configuration:
    npx ts-jest config:init

#### Executing Jest test
    npx jest specs/poc.spec.ts

# Steps for test Reporting setup
### JUnit reporter:
 1. Install Jest JUnit Reporter.
 2. Update Jest configuration to add reports.
 3. Add the report to the report directory.
 4. Execute test and generate test report.

#### Setting up JUnit reporter:
 1. Go to https://www.npmjs.com/ and search for jest-junit.
    1. https://www.npmjs.com/package/jest-junit
    2. npm install jest-junit --save-dev
 2. Update jest.config.js to tell jest to use jest-junit for report.
    1. Add this block to the module.exports:
        > reporters: [ "default", "jest-junit" ],
    1. Now, whenever we run the test, Jest will check the config and generate a default report on the terminal. Then, generate an XML report for Jest-Junit.
 3. Update the jest.config.js, so Jest knows where to save the report.
    1. Update the reporters block as below:
        > reporters: ["default", ["jest-junit", { outputDirectory: "./reports", outputName: "junit.xml", } ] ],
    2. Now a new report folder named 'reports' is creatd by JUnit if the folder doesn't exist, and then create the 'junit.xlm' file in the reports folder.
 4. Report XML Screenshot
    * ![Report XML.](/API-test-automation-with-TypeScript/images/report-img/report-xml-1.png "This is a sample image.")


### HTML reporter:
 1. Install Jest HTML reporter.
 2. Update Jest configuration to add a reporter.
 3. Execute test and generate test report.

#### Setting up Jest HTML reporter
 1. Go to https://www.npmjs.com/ and search for jest-html-reporters
    1. https://www.npmjs.com/package/jest-html-reporters
    2. npm install jest-html-reporters --save-dev
 2. Update jest.config.js to tell jest where to save the html report:
    1. Add this block to the module.exports int the 'reporters' array:
        > ["jest-html-reporters" , { publicPath: "./reports", filename: "report.html", expand: true, } ]
 3. Report HTML screenshot:
    * ![Report dashboard.](/API-test-automation-with-TypeScript/images/report-img/report-dashboard-1.png "This is a sample image.")
    * ![Report dashboard.](/API-test-automation-with-TypeScript/images/report-img/report-dashboard-2.png "This is a sample image.")



# Implementing tests with Jenkins
### Jenkins Setup
 1. Download Jenkins https://www.jenkins.io/download/
 2. Install necessary packages (default)
 3. Verify successful installation
    1. Jenkins and Tomcat use port 8080 by default. To resolve this, you need to change the Jenkins port.
        1. Step 1: $ brew services stop jenkins-lts
        2. Step 2:  $ vim /usr/local/Cellar/jenkins-lts/2.528.3/homebrew.mxcl.jenkins-lts.plist
        3. Step 3: Update port with 9090: <string>--httpPort=9090</string>
        4. Step 4: Start Jenkins: $ brew services start jenkins-lts
        5. Step 5: Open http://localhost:9090/ in the browser to access the Jenkins dashboard
 
##### Nice to know
1. Note that it is important to set up a “statically configured or provided by clouds” node so Jenkins doesn’t use the built-in node in your system and expose it to malicious users.
    1. More info: https://www.jenkins.io/doc/book/security/controller-isolation/
2. User Handbook: https://www.jenkins.io/doc/book/getting-started/
3. Managing Plugins: https://www.jenkins.io/doc/book/managing/plugins/#install-with-cli

### Link Jenkins with your GitHub project:
1. Create a new project
2. Select Free Style project
3. Under Source Code Management select Git
    1. Add Reporsitory URL (from browser)
    2. For Credentials select Add
    3. Select Username with password
    4. In Username field add your GitHub Username
    5. In Password field add your GitHub Access token
        1. Go to your GitHub profile settings -> Developers settings -> Personal Access Token -> Token (classic) -> Generate new token
    6. In Branch to build, make sure to use the same branch name as your repo, in my case it is main
4. Select Save.
5. To test the Jenkins and GitHub setup, Go to your jenkins project and select Build Now.
6. After the Build is completed, Select the build that just finished
7. In the Console Output you should see a green checkmark indicating the build was successful along with the build logs with steps Jenkins took to build
8. Now you can go back to your jenkins project Workspace and see all the files from your GitHub repository project


# Run Tests on Jenkins
 * Install NodeJS
 * Setup NodeJS in the job
 * Setup run scripts to execute tests
 * Verify successful run

### Install NodeJS:
1. Go to Jenkins Dashboard 
2. Then Manage Jenkins
3. Then Plugins
4. Then Available Plugins
5. Search for NodeJS 
6. Select NodeJS and click Install

### Setup NodeJS in the job (Add NodeJS to Jenkins environment):
1. Go to Manage Jenkins
2. Then Tools
3. Scroll down to see NodeJS and click Add NodeJS
4. For the name you can add NodeJS
5. For version it is better to match the version you have in your machine to avoid any issue
6. Then select Save
7. Now you can go back to Tools and validate if NodeJS is added

### Setup run scripts to execute tests (Build Environment)
1. Go to the jenkins project
2. Then Configuration
3. Scroll down to Environment
4. Find the option: “Provide Node & npm bin/ folder to PATH” and select it. No need to update anything else in that dropdown now.
5. Scroll down to Build Steps and select Add Build Steps
6. On the Add Build Steps dropdown select Execute Shell
    1. Add these two lines for now:
        1. cd API-test-automation-with-TypeScript
        2. npm install
        3. npx jest
    2. Note that in my “automation-playground” repo, the tests is located in a subdirectory called “API-test-automation-with-TypeScript”. With that, it is necessary to tell Jenkins to navigate to that directory before installing npm.
7. Select Save
8. Note that after this step, you may need to double check the steps in “Setup NodeJS in the job” as it may not stick and repeat the steps and apply and save.

### Verify successful run:
 * Select Build Now (Select the new build to see Jenkins in action)
<details>
  <summary>Success build output</summary>
  Started by user Renan
Running as SYSTEM
Building in workspace /Users/workspace/.jenkins/workspace/jest-api-test
The recommended git tool is: NONE
using credential REDACTED
 > git rev-parse --resolve-git-dir /Users/workspace/.jenkins/workspace/jest-api-test/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/RenanBa/automation-playground # timeout=10
Fetching upstream changes from https://github.com/RenanBa/automation-playground
 > git --version # timeout=10
 > git --version # 'git version 2.37.1 (Apple Git-137.1)'
using GIT_ASKPASS to set credentials 
 > git fetch --tags --force --progress -- https://github.com/RenanBa/automation-playground +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git rev-parse refs/remotes/origin/main^{commit} # timeout=10
Checking out Revision REDACTED (refs/remotes/origin/main)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f REDACTED # timeout=10
Commit message: "Update README"
 > git rev-list --no-walk REDACTED # timeout=10
[jest-api-test] $ /bin/sh -xe /var/folders/m0/2cxl6g7s43sb1wwd47dfx_6r0000gn/T/jenkins7598437598372894o85u4.sh
+ cd API-test-automation-with-TypeScript
+ npm install
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported

added 369 packages, and audited 370 packages in 38s

63 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
+ npx jest
ts-jest[config] (WARN) [94mmessage[0m[90m TS151001: [0mIf you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
ts-jest[config] (WARN) [94mmessage[0m[90m TS151001: [0mIf you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
ts-jest[config] (WARN) [94mmessage[0m[90m TS151001: [0mIf you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
PASS specs/fileupload.spec.ts (18.091 s)
  ● Console

    console.log
      {
        mimetype: 'image/jpeg',
        filename: 'yayazinha.jpeg',
        size: '21939',
        _id: '696ea3e2986188d4dce627ee',
        __v: 0
      }

      at specs/fileupload.spec.ts:8:17

    console.log
      [
        {
          mimetype: 'image/jpeg',
          filename: 'yayazinha.jpeg',
          size: '21939',
          _id: '696ea3e4986188d4dce627f2',
          __v: 0
        },
        {
          mimetype: 'image/png',
          filename: 'listening-ears.png',
          size: '25639',
          _id: '696ea3e4986188d4dce627f3',
          __v: 0
        }
      ]

      at specs/fileupload.spec.ts:20:17

PASS specs/poc.spec.ts
  ● Console

    console.log
      <ref *2> Response {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        res: <ref *1> IncomingMessage {
          _events: {
            close: [Function: bound emit],
            error: [Array],
            data: undefined,
            end: [Function: responseOnEnd],
            readable: undefined
          },
          _readableState: ReadableState {
            highWaterMark: 65536,
            buffer: [],
            bufferIndex: 0,
            length: 0,
            pipes: [],
            awaitDrainWriters: null,
            [Symbol(kState)]: 110626684
          },
          _maxListeners: undefined,
          socket: TLSSocket {
            _tlsOptions: [Object],
            _secureEstablished: true,
            _securePending: false,
            _newSessionPending: false,
            _controlReleased: true,
            secureConnecting: false,
            _SNICallback: null,
            servername: 'jsonplaceholder.typicode.com',
            alpnProtocol: false,
            authorized: true,
            authorizationError: null,
            encrypted: true,
            _events: [Object: null prototype],
            _eventsCount: 9,
            connecting: false,
            _hadError: false,
            _parent: null,
            _host: 'jsonplaceholder.typicode.com',
            _closeAfterHandlingError: false,
            _readableState: [ReadableState],
            _writableState: [WritableState],
            allowHalfOpen: false,
            _maxListeners: undefined,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server: undefined,
            _server: null,
            ssl: null,
            _requestCert: true,
            _rejectUnauthorized: true,
            parser: null,
            _httpMessage: [ClientRequest],
            autoSelectFamilyAttemptedAddresses: [Array],
            write: [Function: writeAfterFIN],
            [Symbol(alpncallback)]: null,
            [Symbol(res)]: null,
            [Symbol(verified)]: true,
            [Symbol(pendingSession)]: null,
            [Symbol(async_id_symbol)]: 895,
            [Symbol(kHandle)]: null,
            [Symbol(lastWriteQueueSize)]: 0,
            [Symbol(timeout)]: null,
            [Symbol(kBuffer)]: null,
            [Symbol(kBufferCb)]: null,
            [Symbol(kBufferGen)]: null,
            [Symbol(shapeMode)]: true,
            [Symbol(kCapture)]: false,
            [Symbol(kSetNoDelay)]: true,
            [Symbol(kSetKeepAlive)]: false,
            [Symbol(kSetKeepAliveInitialDelay)]: 0,
            [Symbol(kBytesRead)]: 8318,
            [Symbol(kBytesWritten)]: 110,
            [Symbol(connect-options)]: [Object]
          },
          httpVersionMajor: 1,
          httpVersionMinor: 1,
          httpVersion: '1.1',
          complete: true,
          rawHeaders: [
            'Date',
            'Mon, 19 Jan 2026 21:36:38 GMT',
            'Content-Type',
            'application/json; charset=utf-8',
            'Transfer-Encoding',
            'chunked',
            'Connection',
            'close',
            'access-control-allow-credentials',
            'true',
            'Cache-Control',
            'max-age=43200',
            'Content-Encoding',
            'gzip',
            'etag',
            'W/"6b80-Ybsq/K6GwwqrYkAsFxqDXGC7DoM"',
            'expires',
            '-1',
            'nel',
            '{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}',
            'pragma',
            'no-cache',
            'report-to',
            '{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D\\u0026sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d\\u0026ts=1764590345"}],"max_age":3600}',
            'reporting-endpoints',
            'heroku-nel="https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&ts=1764590345"',
            'retry-after',
            '60',
            'Server',
            'cloudflare',
            'vary',
            'Origin, Accept-Encoding',
            'via',
            '2.0 heroku-router',
            'x-content-type-options',
            'nosniff',
            'x-powered-by',
            'Express',
            'x-ratelimit-limit',
            '1000',
            'x-ratelimit-remaining',
            '0',
            'x-ratelimit-reset',
            '1764590369',
            'Age',
            '14427',
            'cf-cache-status',
            'HIT',
            'Server-Timing',
            'cfCacheStatus;desc="HIT"',
            'Server-Timing',
            'cfEdge;dur=3,cfOrigin;dur=0',
            'CF-RAY',
            '9c0977ffcf1ec132-SJC',
            'alt-svc',
            'h3=":443"; ma=86400'
          ],
          rawTrailers: [],
          joinDuplicateHeaders: undefined,
          aborted: false,
          upgrade: false,
          url: '',
          method: null,
          statusCode: 200,
          statusMessage: 'OK',
          client: TLSSocket {
            _tlsOptions: [Object],
            _secureEstablished: true,
            _securePending: false,
            _newSessionPending: false,
            _controlReleased: true,
            secureConnecting: false,
            _SNICallback: null,
            servername: 'jsonplaceholder.typicode.com',
            alpnProtocol: false,
            authorized: true,
            authorizationError: null,
            encrypted: true,
            _events: [Object: null prototype],
            _eventsCount: 9,
            connecting: false,
            _hadError: false,
            _parent: null,
            _host: 'jsonplaceholder.typicode.com',
            _closeAfterHandlingError: false,
            _readableState: [ReadableState],
            _writableState: [WritableState],
            allowHalfOpen: false,
            _maxListeners: undefined,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server: undefined,
            _server: null,
            ssl: null,
            _requestCert: true,
            _rejectUnauthorized: true,
            parser: null,
            _httpMessage: [ClientRequest],
            autoSelectFamilyAttemptedAddresses: [Array],
            write: [Function: writeAfterFIN],
            [Symbol(alpncallback)]: null,
            [Symbol(res)]: null,
            [Symbol(verified)]: true,
            [Symbol(pendingSession)]: null,
            [Symbol(async_id_symbol)]: 895,
            [Symbol(kHandle)]: null,
            [Symbol(lastWriteQueueSize)]: 0,
            [Symbol(timeout)]: null,
            [Symbol(kBuffer)]: null,
            [Symbol(kBufferCb)]: null,
            [Symbol(kBufferGen)]: null,
            [Symbol(shapeMode)]: true,
            [Symbol(kCapture)]: false,
            [Symbol(kSetNoDelay)]: true,
            [Symbol(kSetKeepAlive)]: false,
            [Symbol(kSetKeepAliveInitialDelay)]: 0,
            [Symbol(kBytesRead)]: 8318,
            [Symbol(kBytesWritten)]: 110,
            [Symbol(connect-options)]: [Object]
          },
          _consuming: true,
          _dumped: false,
          req: ClientRequest {
            _events: [Object: null prototype],
            _eventsCount: 3,
            _maxListeners: undefined,
            outputData: [],
            outputSize: 0,
            writable: true,
            destroyed: true,
            _last: true,
            chunkedEncoding: false,
            shouldKeepAlive: false,
            maxRequestsOnConnectionReached: false,
            _defaultKeepAlive: true,
            useChunkedEncodingByDefault: false,
            sendDate: false,
            _removedConnection: false,
            _removedContLen: false,
            _removedTE: false,
            strictContentLength: false,
            _contentLength: 0,
            _hasBody: true,
            _trailer: '',
            finished: true,
            _headerSent: true,
            _closed: true,
            _header: 'GET /posts HTTP/1.1\r\n' +
              'Host: jsonplaceholder.typicode.com\r\n' +
              'Accept-Encoding: gzip, deflate\r\n' +
              'Connection: close\r\n' +
              '\r\n',
            _keepAliveTimeout: 0,
            _onPendingData: [Function: nop],
            agent: [Agent],
            socketPath: undefined,
            method: 'GET',
            maxHeaderSize: undefined,
            insecureHTTPParser: undefined,
            joinDuplicateHeaders: undefined,
            path: '/posts',
            _ended: true,
            res: [Circular *1],
            aborted: false,
            timeoutCb: null,
            upgradeOrConnect: false,
            parser: null,
            maxHeadersCount: null,
            reusedSocket: false,
            host: 'jsonplaceholder.typicode.com',
            protocol: 'https:',
            [Symbol(shapeMode)]: false,
            [Symbol(kCapture)]: false,
            [Symbol(kBytesWritten)]: 0,
            [Symbol(kNeedDrain)]: false,
            [Symbol(corked)]: 0,
            [Symbol(kChunkedBuffer)]: [],
            [Symbol(kChunkedLength)]: 0,
            [Symbol(kSocket)]: [TLSSocket],
            [Symbol(kOutHeaders)]: [Object: null prototype],
            [Symbol(errored)]: null,
            [Symbol(kHighWaterMark)]: 65536,
            [Symbol(kRejectNonStandardBodyWrites)]: false,
            [Symbol(kUniqueHeaders)]: null
          },
          _eventsCount: 3,
          setEncoding: [Function (anonymous)],
          on: [Function (anonymous)],
          text: '[\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 1,\n' +
            '    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n' +
            '    "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 2,\n' +
            '    "title": "qui est esse",\n' +
            '    "body": "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 3,\n' +
            '    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",\n' +
            '    "body": "et iusto sed quo iure\\nvoluptatem occaecati omnis eligendi aut ad\\nvoluptatem doloribus vel accusantium quis pariatur\\nmolestiae porro eius odio et labore et velit aut"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 4,\n' +
            '    "title": "eum et est occaecati",\n' +
            '    "body": "ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 5,\n' +
            '    "title": "nesciunt quas odio",\n' +
            '    "body": "repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 6,\n' +
            '    "title": "dolorem eum magni eos aperiam quia",\n' +
            '    "body": "ut aspernatur corporis harum nihil quis provident sequi\\nmollitia nobis aliquid molestiae\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\nvoluptate dolores velit et doloremque molestiae"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 7,\n' +
            '    "title": "magnam facilis autem",\n' +
            '    "body": "dolore placeat quibusdam ea quo vitae\\nmagni quis enim qui quis quo nemo aut saepe\\nquidem repellat excepturi ut quia\\nsunt ut sequi eos ea sed quas"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 8,\n' +
            '    "title": "dolorem dolore est ipsam",\n' +
            '    "body": "dignissimos aperiam dolorem qui eum\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\nquaerat magni maiores excepturi\\nipsam ut commodi dolor voluptatum modi aut vitae"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 9,\n' +
            '    "title": "nesciunt iure omnis dolorem tempora et accusantium",\n' +
            '    "body": "consectetur animi nesciunt iure dolore\\nenim quia ad\\nveniam autem ut quam aut nobis\\net est aut quod aut provident voluptas autem voluptas"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 1,\n' +
            '    "id": 10,\n' +
            '    "title": "optio molestias id quia eum",\n' +
            '    "body": "quo et expedita modi cum officia vel magni\\ndoloribus qui repudiandae\\nvero nisi sit\\nquos veniam quod sed accusamus veritatis error"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 11,\n' +
            '    "title": "et ea vero quia laudantium autem",\n' +
            '    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\\naccusamus in eum beatae sit\\nvel qui neque voluptates ut commodi qui incidunt\\nut animi commodi"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 12,\n' +
            '    "title": "in quibusdam tempore odit est dolorem",\n' +
            '    "body": "itaque id aut magnam\\npraesentium quia et ea odit et ea voluptas et\\nsapiente quia nihil amet occaecati quia id voluptatem\\nincidunt ea est distinctio odio"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 13,\n' +
            '    "title": "dolorum ut in voluptas mollitia et saepe quo animi",\n' +
            '    "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\\niste corrupti reiciendis voluptatem eius rerum\\nsit cumque quod eligendi laborum minima\\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 14,\n' +
            '    "title": "voluptatem eligendi optio",\n' +
            '    "body": "fuga et accusamus dolorum perferendis illo voluptas\\nnon doloremque neque facere\\nad qui dolorum molestiae beatae\\nsed aut voluptas totam sit illum"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 15,\n' +
            '    "title": "eveniet quod temporibus",\n' +
            '    "body": "reprehenderit quos placeat\\nvelit minima officia dolores impedit repudiandae molestiae nam\\nvoluptas recusandae quis delectus\\nofficiis harum fugiat vitae"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 16,\n' +
            '    "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",\n' +
            '    "body": "suscipit nam nisi quo aperiam aut\\nasperiores eos fugit maiores voluptatibus quia\\nvoluptatem quis ullam qui in alias quia est\\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 17,\n' +
            '    "title": "fugit voluptas sed molestias voluptatem provident",\n' +
            '    "body": "eos voluptas et aut odit natus earum\\naspernatur fuga molestiae ullam\\ndeserunt ratione qui eos\\nqui nihil ratione nemo velit ut aut id quo"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 18,\n' +
            '    "title": "voluptate et itaque vero tempora molestiae",\n' +
            '    "body": "eveniet quo quis\\nlaborum totam consequatur non dolor\\nut et est repudiandae\\nest voluptatem vel debitis et magnam"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 19,\n' +
            '    "title": "adipisci placeat illum aut reiciendis qui",\n' +
            '    "body": "illum quis cupiditate provident sit magnam\\nea sed aut omnis\\nveniam maiores ullam consequatur atque\\nadipisci quo iste expedita sit quos voluptas"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 2,\n' +
            '    "id": 20,\n' +
            '    "title": "doloribus ad provident suscipit at",\n' +
            '    "body": "qui consequuntur ducimus possimus quisquam amet similique\\nsuscipit porro ipsam amet\\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\\nomnis rerum consequatur expedita quidem cumque explicabo"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 21,\n' +
            '    "title": "asperiores ea ipsam voluptatibus modi minima quia sint",\n' +
            '    "body": "repellat aliquid praesentium dolorem quo\\nsed totam minus non itaque\\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\\ntempora et tenetur expedita sunt"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 22,\n' +
            '    "title": "dolor sint quo a velit explicabo quia nam",\n' +
            '    "body": "eos qui et ipsum ipsam suscipit aut\\nsed omnis non odio\\nexpedita earum mollitia molestiae aut atque rem suscipit\\nnam impedit esse"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 23,\n' +
            '    "title": "maxime id vitae nihil numquam",\n' +
            '    "body": "veritatis unde neque eligendi\\nquae quod architecto quo neque vitae\\nest illo sit tempora doloremque fugit quod\\net et vel beatae sequi ullam sed tenetur perspiciatis"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 24,\n' +
            '    "title": "autem hic labore sunt dolores incidunt",\n' +
            '    "body": "enim et ex nulla\\nomnis voluptas quia qui\\nvoluptatem consequatur numquam aliquam sunt\\ntotam recusandae id dignissimos aut sed asperiores deserunt"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 25,\n' +
            '    "title": "rem alias distinctio quo quis",\n' +
            '    "body": "ullam consequatur ut\\nomnis quis sit vel consequuntur\\nipsa eligendi ipsum molestiae et omnis error nostrum\\nmolestiae illo tempore quia et distinctio"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 26,\n' +
            '    "title": "est et quae odit qui non",\n' +
            '    "body": "similique esse doloribus nihil accusamus\\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\\nperspiciatis cum ut laudantium\\nomnis aut molestiae vel vero"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 27,\n' +
            '    "title": "quasi id et eos tenetur aut quo autem",\n' +
            '    "body": "eum sed dolores ipsam sint possimus debitis occaecati\\ndebitis qui qui et\\nut placeat enim earum aut odit facilis\\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 28,\n' +
            '    "title": "delectus ullam et corporis nulla voluptas sequi",\n' +
            '    "body": "non et quaerat ex quae ad maiores\\nmaiores recusandae totam aut blanditiis mollitia quas illo\\nut voluptatibus voluptatem\\nsimilique nostrum eum"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 29,\n' +
            '    "title": "iusto eius quod necessitatibus culpa ea",\n' +
            '    "body": "odit magnam ut saepe sed non qui\\ntempora atque nihil\\naccusamus illum doloribus illo dolor\\neligendi repudiandae odit magni similique sed cum maiores"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 3,\n' +
            '    "id": 30,\n' +
            '    "title": "a quo magni similique perferendis",\n' +
            '    "body": "alias dolor cumque\\nimpedit blanditiis non eveniet odio maxime\\nblanditiis amet eius quis tempora quia autem rem\\na provident perspiciatis quia"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 31,\n' +
            '    "title": "ullam ut quidem id aut vel consequuntur",\n' +
            '    "body": "debitis eius sed quibusdam non quis consectetur vitae\\nimpedit ut qui consequatur sed aut in\\nquidem sit nostrum et maiores adipisci atque\\nquaerat voluptatem adipisci repudiandae"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 32,\n' +
            '    "title": "doloremque illum aliquid sunt",\n' +
            '    "body": "deserunt eos nobis asperiores et hic\\nest debitis repellat molestiae optio\\nnihil ratione ut eos beatae quibusdam distinctio maiores\\nearum voluptates et aut adipisci ea maiores voluptas maxime"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 33,\n' +
            '    "title": "qui explicabo molestiae dolorem",\n' +
            '    "body": "rerum ut et numquam laborum odit est sit\\nid qui sint in\\nquasi tenetur tempore aperiam et quaerat qui in\\nrerum officiis sequi cumque quod"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 34,\n' +
            '    "title": "magnam ut rerum iure",\n' +
            '    "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\\ntotam pariatur in\\nnemo voluptatem voluptatem autem magni tempora minima in\\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 35,\n' +
            '    "title": "id nihil consequatur molestias animi provident",\n' +
            '    "body": "nisi error delectus possimus ut eligendi vitae\\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\\nmodi ducimus quo illum voluptas eligendi\\net nobis quia fugit"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 36,\n' +
            '    "title": "fuga nam accusamus voluptas reiciendis itaque",\n' +
            '    "body": "ad mollitia et omnis minus architecto odit\\nvoluptas doloremque maxime aut non ipsa qui alias veniam\\nblanditiis culpa aut quia nihil cumque facere et occaecati\\nqui aspernatur quia eaque ut aperiam inventore"\n' +
            '  },\n' +
            '  {\n' +
            '    "userId": 4,\n' +
            '    "id": 37,\n' +
            '    "title": "provident vel ut sit ratione est'... 17520 more characters,
          [Symbol(shapeMode)]: true,
          [Symbol(kCapture)]: false,
          [Symbol(kHeaders)]: {
            date: 'Mon, 19 Jan 2026 21:36:38 GMT',
            'content-type': 'application/json; charset=utf-8',
            'transfer-encoding': 'chunked',
            connection: 'close',
            'access-control-allow-credentials': 'true',
            'cache-control': 'max-age=43200',
            'content-encoding': 'gzip',
            etag: 'W/"6b80-Ybsq/K6GwwqrYkAsFxqDXGC7DoM"',
            expires: '-1',
            nel: '{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}',
            pragma: 'no-cache',
            'report-to': '{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D\\u0026sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d\\u0026ts=1764590345"}],"max_age":3600}',
            'reporting-endpoints': 'heroku-nel="https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&ts=1764590345"',
            'retry-after': '60',
            server: 'cloudflare',
            vary: 'Origin, Accept-Encoding',
            via: '2.0 heroku-router',
            'x-content-type-options': 'nosniff',
            'x-powered-by': 'Express',
            'x-ratelimit-limit': '1000',
            'x-ratelimit-remaining': '0',
            'x-ratelimit-reset': '1764590369',
            age: '14427',
            'cf-cache-status': 'HIT',
            'server-timing': 'cfCacheStatus;desc="HIT", cfEdge;dur=3,cfOrigin;dur=0',
            'cf-ray': '9c0977ffcf1ec132-SJC',
            'alt-svc': 'h3=":443"; ma=86400'
          },
          [Symbol(kHeadersCount)]: 56,
          [Symbol(kTrailers)]: null,
          [Symbol(kTrailersCount)]: 0
        },
        request: Test {
          _events: [Object: null prototype] { abort: [Function (anonymous)] },
          _eventsCount: 1,
          _maxListeners: undefined,
          _enableHttp2: false,
          _agent: false,
          _formData: null,
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts',
          _header: {},
          header: {},
          writable: true,
          _redirects: 0,
          _maxRedirects: 0,
          cookies: '',
          qs: {},
          _query: [],
          qsRaw: [],
          _redirectList: [],
          _streamRequest: false,
          _lookup: undefined,
          _buffer: true,
          app: 'https://jsonplaceholder.typicode.com',
          _asserts: [],
          req: ClientRequest {
            _events: [Object: null prototype],
            _eventsCount: 3,
            _maxListeners: undefined,
            outputData: [],
            outputSize: 0,
            writable: true,
            destroyed: true,
            _last: true,
            chunkedEncoding: false,
            shouldKeepAlive: false,
            maxRequestsOnConnectionReached: false,
            _defaultKeepAlive: true,
            useChunkedEncodingByDefault: false,
            sendDate: false,
            _removedConnection: false,
            _removedContLen: false,
            _removedTE: false,
            strictContentLength: false,
            _contentLength: 0,
            _hasBody: true,
            _trailer: '',
            finished: true,
            _headerSent: true,
            _closed: true,
            _header: 'GET /posts HTTP/1.1\r\n' +
              'Host: jsonplaceholder.typicode.com\r\n' +
              'Accept-Encoding: gzip, deflate\r\n' +
              'Connection: close\r\n' +
              '\r\n',
            _keepAliveTimeout: 0,
            _onPendingData: [Function: nop],
            agent: [Agent],
            socketPath: undefined,
            method: 'GET',
            maxHeaderSize: undefined,
            insecureHTTPParser: undefined,
            joinDuplicateHeaders: undefined,
            path: '/posts',
            _ended: true,
            res: [IncomingMessage],
            aborted: false,
            timeoutCb: null,
            upgradeOrConnect: false,
            parser: null,
            maxHeadersCount: null,
            reusedSocket: false,
            host: 'jsonplaceholder.typicode.com',
            protocol: 'https:',
            [Symbol(shapeMode)]: false,
            [Symbol(kCapture)]: false,
            [Symbol(kBytesWritten)]: 0,
            [Symbol(kNeedDrain)]: false,
            [Symbol(corked)]: 0,
            [Symbol(kChunkedBuffer)]: [],
            [Symbol(kChunkedLength)]: 0,
            [Symbol(kSocket)]: [TLSSocket],
            [Symbol(kOutHeaders)]: [Object: null prototype],
            [Symbol(errored)]: null,
            [Symbol(kHighWaterMark)]: 65536,
            [Symbol(kRejectNonStandardBodyWrites)]: false,
            [Symbol(kUniqueHeaders)]: null
          },
          protocol: 'https:',
          host: 'jsonplaceholder.typicode.com',
          _endCalled: true,
          _callback: [Function (anonymous)],
          _fullfilledPromise: Promise {
            [Circular *2],
            [Symbol(async_id_symbol)]: 893,
            [Symbol(trigger_async_id_symbol)]: 887,
            [Symbol(kResourceStore)]: undefined,
            [Symbol(kResourceStore)]: 'POC Tests GET /posts'
          },
          res: <ref *1> IncomingMessage {
            _events: [Object],
            _readableState: [ReadableState],
            _maxListeners: undefined,
            socket: [TLSSocket],
            httpVersionMajor: 1,
            httpVersionMinor: 1,
            httpVersion: '1.1',
            complete: true,
            rawHeaders: [Array],
            rawTrailers: [],
            joinDuplicateHeaders: undefined,
            aborted: false,
            upgrade: false,
            url: '',
            method: null,
            statusCode: 200,
            statusMessage: 'OK',
            client: [TLSSocket],
            _consuming: true,
            _dumped: false,
            req: [ClientRequest],
            _eventsCount: 3,
            setEncoding: [Function (anonymous)],
            on: [Function (anonymous)],
            text: '[\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 1,\n' +
              '    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n' +
              '    "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 2,\n' +
              '    "title": "qui est esse",\n' +
              '    "body": "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 3,\n' +
              '    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",\n' +
              '    "body": "et iusto sed quo iure\\nvoluptatem occaecati omnis eligendi aut ad\\nvoluptatem doloribus vel accusantium quis pariatur\\nmolestiae porro eius odio et labore et velit aut"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 4,\n' +
              '    "title": "eum et est occaecati",\n' +
              '    "body": "ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 5,\n' +
              '    "title": "nesciunt quas odio",\n' +
              '    "body": "repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 6,\n' +
              '    "title": "dolorem eum magni eos aperiam quia",\n' +
              '    "body": "ut aspernatur corporis harum nihil quis provident sequi\\nmollitia nobis aliquid molestiae\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\nvoluptate dolores velit et doloremque molestiae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 7,\n' +
              '    "title": "magnam facilis autem",\n' +
              '    "body": "dolore placeat quibusdam ea quo vitae\\nmagni quis enim qui quis quo nemo aut saepe\\nquidem repellat excepturi ut quia\\nsunt ut sequi eos ea sed quas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 8,\n' +
              '    "title": "dolorem dolore est ipsam",\n' +
              '    "body": "dignissimos aperiam dolorem qui eum\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\nquaerat magni maiores excepturi\\nipsam ut commodi dolor voluptatum modi aut vitae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 9,\n' +
              '    "title": "nesciunt iure omnis dolorem tempora et accusantium",\n' +
              '    "body": "consectetur animi nesciunt iure dolore\\nenim quia ad\\nveniam autem ut quam aut nobis\\net est aut quod aut provident voluptas autem voluptas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 10,\n' +
              '    "title": "optio molestias id quia eum",\n' +
              '    "body": "quo et expedita modi cum officia vel magni\\ndoloribus qui repudiandae\\nvero nisi sit\\nquos veniam quod sed accusamus veritatis error"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 11,\n' +
              '    "title": "et ea vero quia laudantium autem",\n' +
              '    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\\naccusamus in eum beatae sit\\nvel qui neque voluptates ut commodi qui incidunt\\nut animi commodi"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 12,\n' +
              '    "title": "in quibusdam tempore odit est dolorem",\n' +
              '    "body": "itaque id aut magnam\\npraesentium quia et ea odit et ea voluptas et\\nsapiente quia nihil amet occaecati quia id voluptatem\\nincidunt ea est distinctio odio"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 13,\n' +
              '    "title": "dolorum ut in voluptas mollitia et saepe quo animi",\n' +
              '    "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\\niste corrupti reiciendis voluptatem eius rerum\\nsit cumque quod eligendi laborum minima\\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 14,\n' +
              '    "title": "voluptatem eligendi optio",\n' +
              '    "body": "fuga et accusamus dolorum perferendis illo voluptas\\nnon doloremque neque facere\\nad qui dolorum molestiae beatae\\nsed aut voluptas totam sit illum"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 15,\n' +
              '    "title": "eveniet quod temporibus",\n' +
              '    "body": "reprehenderit quos placeat\\nvelit minima officia dolores impedit repudiandae molestiae nam\\nvoluptas recusandae quis delectus\\nofficiis harum fugiat vitae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 16,\n' +
              '    "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",\n' +
              '    "body": "suscipit nam nisi quo aperiam aut\\nasperiores eos fugit maiores voluptatibus quia\\nvoluptatem quis ullam qui in alias quia est\\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 17,\n' +
              '    "title": "fugit voluptas sed molestias voluptatem provident",\n' +
              '    "body": "eos voluptas et aut odit natus earum\\naspernatur fuga molestiae ullam\\ndeserunt ratione qui eos\\nqui nihil ratione nemo velit ut aut id quo"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 18,\n' +
              '    "title": "voluptate et itaque vero tempora molestiae",\n' +
              '    "body": "eveniet quo quis\\nlaborum totam consequatur non dolor\\nut et est repudiandae\\nest voluptatem vel debitis et magnam"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 19,\n' +
              '    "title": "adipisci placeat illum aut reiciendis qui",\n' +
              '    "body": "illum quis cupiditate provident sit magnam\\nea sed aut omnis\\nveniam maiores ullam consequatur atque\\nadipisci quo iste expedita sit quos voluptas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 20,\n' +
              '    "title": "doloribus ad provident suscipit at",\n' +
              '    "body": "qui consequuntur ducimus possimus quisquam amet similique\\nsuscipit porro ipsam amet\\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\\nomnis rerum consequatur expedita quidem cumque explicabo"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 21,\n' +
              '    "title": "asperiores ea ipsam voluptatibus modi minima quia sint",\n' +
              '    "body": "repellat aliquid praesentium dolorem quo\\nsed totam minus non itaque\\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\\ntempora et tenetur expedita sunt"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 22,\n' +
              '    "title": "dolor sint quo a velit explicabo quia nam",\n' +
              '    "body": "eos qui et ipsum ipsam suscipit aut\\nsed omnis non odio\\nexpedita earum mollitia molestiae aut atque rem suscipit\\nnam impedit esse"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 23,\n' +
              '    "title": "maxime id vitae nihil numquam",\n' +
              '    "body": "veritatis unde neque eligendi\\nquae quod architecto quo neque vitae\\nest illo sit tempora doloremque fugit quod\\net et vel beatae sequi ullam sed tenetur perspiciatis"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 24,\n' +
              '    "title": "autem hic labore sunt dolores incidunt",\n' +
              '    "body": "enim et ex nulla\\nomnis voluptas quia qui\\nvoluptatem consequatur numquam aliquam sunt\\ntotam recusandae id dignissimos aut sed asperiores deserunt"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 25,\n' +
              '    "title": "rem alias distinctio quo quis",\n' +
              '    "body": "ullam consequatur ut\\nomnis quis sit vel consequuntur\\nipsa eligendi ipsum molestiae et omnis error nostrum\\nmolestiae illo tempore quia et distinctio"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 26,\n' +
              '    "title": "est et quae odit qui non",\n' +
              '    "body": "similique esse doloribus nihil accusamus\\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\\nperspiciatis cum ut laudantium\\nomnis aut molestiae vel vero"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 27,\n' +
              '    "title": "quasi id et eos tenetur aut quo autem",\n' +
              '    "body": "eum sed dolores ipsam sint possimus debitis occaecati\\ndebitis qui qui et\\nut placeat enim earum aut odit facilis\\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 28,\n' +
              '    "title": "delectus ullam et corporis nulla voluptas sequi",\n' +
              '    "body": "non et quaerat ex quae ad maiores\\nmaiores recusandae totam aut blanditiis mollitia quas illo\\nut voluptatibus voluptatem\\nsimilique nostrum eum"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 29,\n' +
              '    "title": "iusto eius quod necessitatibus culpa ea",\n' +
              '    "body": "odit magnam ut saepe sed non qui\\ntempora atque nihil\\naccusamus illum doloribus illo dolor\\neligendi repudiandae odit magni similique sed cum maiores"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 30,\n' +
              '    "title": "a quo magni similique perferendis",\n' +
              '    "body": "alias dolor cumque\\nimpedit blanditiis non eveniet odio maxime\\nblanditiis amet eius quis tempora quia autem rem\\na provident perspiciatis quia"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 31,\n' +
              '    "title": "ullam ut quidem id aut vel consequuntur",\n' +
              '    "body": "debitis eius sed quibusdam non quis consectetur vitae\\nimpedit ut qui consequatur sed aut in\\nquidem sit nostrum et maiores adipisci atque\\nquaerat voluptatem adipisci repudiandae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 32,\n' +
              '    "title": "doloremque illum aliquid sunt",\n' +
              '    "body": "deserunt eos nobis asperiores et hic\\nest debitis repellat molestiae optio\\nnihil ratione ut eos beatae quibusdam distinctio maiores\\nearum voluptates et aut adipisci ea maiores voluptas maxime"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 33,\n' +
              '    "title": "qui explicabo molestiae dolorem",\n' +
              '    "body": "rerum ut et numquam laborum odit est sit\\nid qui sint in\\nquasi tenetur tempore aperiam et quaerat qui in\\nrerum officiis sequi cumque quod"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 34,\n' +
              '    "title": "magnam ut rerum iure",\n' +
              '    "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\\ntotam pariatur in\\nnemo voluptatem voluptatem autem magni tempora minima in\\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 35,\n' +
              '    "title": "id nihil consequatur molestias animi provident",\n' +
              '    "body": "nisi error delectus possimus ut eligendi vitae\\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\\nmodi ducimus quo illum voluptas eligendi\\net nobis quia fugit"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 36,\n' +
              '    "title": "fuga nam accusamus voluptas reiciendis itaque",\n' +
              '    "body": "ad mollitia et omnis minus architecto odit\\nvoluptas doloremque maxime aut non ipsa qui alias veniam\\nblanditiis culpa aut quia nihil cumque facere et occaecati\\nqui aspernatur quia eaque ut aperiam inventore"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 37,\n' +
              '    "title": "provident vel ut sit ratione est'... 17520 more characters,
            [Symbol(shapeMode)]: true,
            [Symbol(kCapture)]: false,
            [Symbol(kHeaders)]: [Object],
            [Symbol(kHeadersCount)]: 56,
            [Symbol(kTrailers)]: null,
            [Symbol(kTrailersCount)]: 0
          },
          _resBuffered: true,
          response: [Circular *2],
          called: true,
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false
        },
        req: <ref *3> ClientRequest {
          _events: [Object: null prototype] {
            drain: [Function],
            error: [Function (anonymous)],
            finish: [Function: requestOnFinish]
          },
          _eventsCount: 3,
          _maxListeners: undefined,
          outputData: [],
          outputSize: 0,
          writable: true,
          destroyed: true,
          _last: true,
          chunkedEncoding: false,
          shouldKeepAlive: false,
          maxRequestsOnConnectionReached: false,
          _defaultKeepAlive: true,
          useChunkedEncodingByDefault: false,
          sendDate: false,
          _removedConnection: false,
          _removedContLen: false,
          _removedTE: false,
          strictContentLength: false,
          _contentLength: 0,
          _hasBody: true,
          _trailer: '',
          finished: true,
          _headerSent: true,
          _closed: true,
          _header: 'GET /posts HTTP/1.1\r\n' +
            'Host: jsonplaceholder.typicode.com\r\n' +
            'Accept-Encoding: gzip, deflate\r\n' +
            'Connection: close\r\n' +
            '\r\n',
          _keepAliveTimeout: 0,
          _onPendingData: [Function: nop],
          agent: Agent {
            _events: [Object: null prototype],
            _eventsCount: 2,
            _maxListeners: undefined,
            defaultPort: 443,
            protocol: 'https:',
            options: [Object: null prototype],
            requests: [Object: null prototype] {},
            sockets: [Object: null prototype] {},
            freeSockets: [Object: null prototype] {},
            keepAliveMsecs: 1000,
            keepAlive: false,
            maxSockets: Infinity,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            maxTotalSockets: Infinity,
            totalSocketCount: 0,
            maxCachedSessions: 100,
            _sessionCache: [Object],
            [Symbol(shapeMode)]: false,
            [Symbol(kCapture)]: false
          },
          socketPath: undefined,
          method: 'GET',
          maxHeaderSize: undefined,
          insecureHTTPParser: undefined,
          joinDuplicateHeaders: undefined,
          path: '/posts',
          _ended: true,
          res: <ref *1> IncomingMessage {
            _events: [Object],
            _readableState: [ReadableState],
            _maxListeners: undefined,
            socket: [TLSSocket],
            httpVersionMajor: 1,
            httpVersionMinor: 1,
            httpVersion: '1.1',
            complete: true,
            rawHeaders: [Array],
            rawTrailers: [],
            joinDuplicateHeaders: undefined,
            aborted: false,
            upgrade: false,
            url: '',
            method: null,
            statusCode: 200,
            statusMessage: 'OK',
            client: [TLSSocket],
            _consuming: true,
            _dumped: false,
            req: [Circular *3],
            _eventsCount: 3,
            setEncoding: [Function (anonymous)],
            on: [Function (anonymous)],
            text: '[\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 1,\n' +
              '    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n' +
              '    "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 2,\n' +
              '    "title": "qui est esse",\n' +
              '    "body": "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 3,\n' +
              '    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",\n' +
              '    "body": "et iusto sed quo iure\\nvoluptatem occaecati omnis eligendi aut ad\\nvoluptatem doloribus vel accusantium quis pariatur\\nmolestiae porro eius odio et labore et velit aut"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 4,\n' +
              '    "title": "eum et est occaecati",\n' +
              '    "body": "ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 5,\n' +
              '    "title": "nesciunt quas odio",\n' +
              '    "body": "repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 6,\n' +
              '    "title": "dolorem eum magni eos aperiam quia",\n' +
              '    "body": "ut aspernatur corporis harum nihil quis provident sequi\\nmollitia nobis aliquid molestiae\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\nvoluptate dolores velit et doloremque molestiae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 7,\n' +
              '    "title": "magnam facilis autem",\n' +
              '    "body": "dolore placeat quibusdam ea quo vitae\\nmagni quis enim qui quis quo nemo aut saepe\\nquidem repellat excepturi ut quia\\nsunt ut sequi eos ea sed quas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 8,\n' +
              '    "title": "dolorem dolore est ipsam",\n' +
              '    "body": "dignissimos aperiam dolorem qui eum\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\nquaerat magni maiores excepturi\\nipsam ut commodi dolor voluptatum modi aut vitae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 9,\n' +
              '    "title": "nesciunt iure omnis dolorem tempora et accusantium",\n' +
              '    "body": "consectetur animi nesciunt iure dolore\\nenim quia ad\\nveniam autem ut quam aut nobis\\net est aut quod aut provident voluptas autem voluptas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 1,\n' +
              '    "id": 10,\n' +
              '    "title": "optio molestias id quia eum",\n' +
              '    "body": "quo et expedita modi cum officia vel magni\\ndoloribus qui repudiandae\\nvero nisi sit\\nquos veniam quod sed accusamus veritatis error"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 11,\n' +
              '    "title": "et ea vero quia laudantium autem",\n' +
              '    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\\naccusamus in eum beatae sit\\nvel qui neque voluptates ut commodi qui incidunt\\nut animi commodi"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 12,\n' +
              '    "title": "in quibusdam tempore odit est dolorem",\n' +
              '    "body": "itaque id aut magnam\\npraesentium quia et ea odit et ea voluptas et\\nsapiente quia nihil amet occaecati quia id voluptatem\\nincidunt ea est distinctio odio"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 13,\n' +
              '    "title": "dolorum ut in voluptas mollitia et saepe quo animi",\n' +
              '    "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\\niste corrupti reiciendis voluptatem eius rerum\\nsit cumque quod eligendi laborum minima\\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 14,\n' +
              '    "title": "voluptatem eligendi optio",\n' +
              '    "body": "fuga et accusamus dolorum perferendis illo voluptas\\nnon doloremque neque facere\\nad qui dolorum molestiae beatae\\nsed aut voluptas totam sit illum"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 15,\n' +
              '    "title": "eveniet quod temporibus",\n' +
              '    "body": "reprehenderit quos placeat\\nvelit minima officia dolores impedit repudiandae molestiae nam\\nvoluptas recusandae quis delectus\\nofficiis harum fugiat vitae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 16,\n' +
              '    "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",\n' +
              '    "body": "suscipit nam nisi quo aperiam aut\\nasperiores eos fugit maiores voluptatibus quia\\nvoluptatem quis ullam qui in alias quia est\\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 17,\n' +
              '    "title": "fugit voluptas sed molestias voluptatem provident",\n' +
              '    "body": "eos voluptas et aut odit natus earum\\naspernatur fuga molestiae ullam\\ndeserunt ratione qui eos\\nqui nihil ratione nemo velit ut aut id quo"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 18,\n' +
              '    "title": "voluptate et itaque vero tempora molestiae",\n' +
              '    "body": "eveniet quo quis\\nlaborum totam consequatur non dolor\\nut et est repudiandae\\nest voluptatem vel debitis et magnam"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 19,\n' +
              '    "title": "adipisci placeat illum aut reiciendis qui",\n' +
              '    "body": "illum quis cupiditate provident sit magnam\\nea sed aut omnis\\nveniam maiores ullam consequatur atque\\nadipisci quo iste expedita sit quos voluptas"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 2,\n' +
              '    "id": 20,\n' +
              '    "title": "doloribus ad provident suscipit at",\n' +
              '    "body": "qui consequuntur ducimus possimus quisquam amet similique\\nsuscipit porro ipsam amet\\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\\nomnis rerum consequatur expedita quidem cumque explicabo"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 21,\n' +
              '    "title": "asperiores ea ipsam voluptatibus modi minima quia sint",\n' +
              '    "body": "repellat aliquid praesentium dolorem quo\\nsed totam minus non itaque\\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\\ntempora et tenetur expedita sunt"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 22,\n' +
              '    "title": "dolor sint quo a velit explicabo quia nam",\n' +
              '    "body": "eos qui et ipsum ipsam suscipit aut\\nsed omnis non odio\\nexpedita earum mollitia molestiae aut atque rem suscipit\\nnam impedit esse"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 23,\n' +
              '    "title": "maxime id vitae nihil numquam",\n' +
              '    "body": "veritatis unde neque eligendi\\nquae quod architecto quo neque vitae\\nest illo sit tempora doloremque fugit quod\\net et vel beatae sequi ullam sed tenetur perspiciatis"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 24,\n' +
              '    "title": "autem hic labore sunt dolores incidunt",\n' +
              '    "body": "enim et ex nulla\\nomnis voluptas quia qui\\nvoluptatem consequatur numquam aliquam sunt\\ntotam recusandae id dignissimos aut sed asperiores deserunt"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 25,\n' +
              '    "title": "rem alias distinctio quo quis",\n' +
              '    "body": "ullam consequatur ut\\nomnis quis sit vel consequuntur\\nipsa eligendi ipsum molestiae et omnis error nostrum\\nmolestiae illo tempore quia et distinctio"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 26,\n' +
              '    "title": "est et quae odit qui non",\n' +
              '    "body": "similique esse doloribus nihil accusamus\\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\\nperspiciatis cum ut laudantium\\nomnis aut molestiae vel vero"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 27,\n' +
              '    "title": "quasi id et eos tenetur aut quo autem",\n' +
              '    "body": "eum sed dolores ipsam sint possimus debitis occaecati\\ndebitis qui qui et\\nut placeat enim earum aut odit facilis\\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 28,\n' +
              '    "title": "delectus ullam et corporis nulla voluptas sequi",\n' +
              '    "body": "non et quaerat ex quae ad maiores\\nmaiores recusandae totam aut blanditiis mollitia quas illo\\nut voluptatibus voluptatem\\nsimilique nostrum eum"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 29,\n' +
              '    "title": "iusto eius quod necessitatibus culpa ea",\n' +
              '    "body": "odit magnam ut saepe sed non qui\\ntempora atque nihil\\naccusamus illum doloribus illo dolor\\neligendi repudiandae odit magni similique sed cum maiores"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 3,\n' +
              '    "id": 30,\n' +
              '    "title": "a quo magni similique perferendis",\n' +
              '    "body": "alias dolor cumque\\nimpedit blanditiis non eveniet odio maxime\\nblanditiis amet eius quis tempora quia autem rem\\na provident perspiciatis quia"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 31,\n' +
              '    "title": "ullam ut quidem id aut vel consequuntur",\n' +
              '    "body": "debitis eius sed quibusdam non quis consectetur vitae\\nimpedit ut qui consequatur sed aut in\\nquidem sit nostrum et maiores adipisci atque\\nquaerat voluptatem adipisci repudiandae"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 32,\n' +
              '    "title": "doloremque illum aliquid sunt",\n' +
              '    "body": "deserunt eos nobis asperiores et hic\\nest debitis repellat molestiae optio\\nnihil ratione ut eos beatae quibusdam distinctio maiores\\nearum voluptates et aut adipisci ea maiores voluptas maxime"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 33,\n' +
              '    "title": "qui explicabo molestiae dolorem",\n' +
              '    "body": "rerum ut et numquam laborum odit est sit\\nid qui sint in\\nquasi tenetur tempore aperiam et quaerat qui in\\nrerum officiis sequi cumque quod"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 34,\n' +
              '    "title": "magnam ut rerum iure",\n' +
              '    "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\\ntotam pariatur in\\nnemo voluptatem voluptatem autem magni tempora minima in\\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 35,\n' +
              '    "title": "id nihil consequatur molestias animi provident",\n' +
              '    "body": "nisi error delectus possimus ut eligendi vitae\\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\\nmodi ducimus quo illum voluptas eligendi\\net nobis quia fugit"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 36,\n' +
              '    "title": "fuga nam accusamus voluptas reiciendis itaque",\n' +
              '    "body": "ad mollitia et omnis minus architecto odit\\nvoluptas doloremque maxime aut non ipsa qui alias veniam\\nblanditiis culpa aut quia nihil cumque facere et occaecati\\nqui aspernatur quia eaque ut aperiam inventore"\n' +
              '  },\n' +
              '  {\n' +
              '    "userId": 4,\n' +
              '    "id": 37,\n' +
              '    "title": "provident vel ut sit ratione est'... 17520 more characters,
            [Symbol(shapeMode)]: true,
            [Symbol(kCapture)]: false,
            [Symbol(kHeaders)]: [Object],
            [Symbol(kHeadersCount)]: 56,
            [Symbol(kTrailers)]: null,
            [Symbol(kTrailersCount)]: 0
          },
          aborted: false,
          timeoutCb: null,
          upgradeOrConnect: false,
          parser: null,
          maxHeadersCount: null,
          reusedSocket: false,
          host: 'jsonplaceholder.typicode.com',
          protocol: 'https:',
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false,
          [Symbol(kBytesWritten)]: 0,
          [Symbol(kNeedDrain)]: false,
          [Symbol(corked)]: 0,
          [Symbol(kChunkedBuffer)]: [],
          [Symbol(kChunkedLength)]: 0,
          [Symbol(kSocket)]: TLSSocket {
            _tlsOptions: [Object],
            _secureEstablished: true,
            _securePending: false,
            _newSessionPending: false,
            _controlReleased: true,
            secureConnecting: false,
            _SNICallback: null,
            servername: 'jsonplaceholder.typicode.com',
            alpnProtocol: false,
            authorized: true,
            authorizationError: null,
            encrypted: true,
            _events: [Object: null prototype],
            _eventsCount: 9,
            connecting: false,
            _hadError: false,
            _parent: null,
            _host: 'jsonplaceholder.typicode.com',
            _closeAfterHandlingError: false,
            _readableState: [ReadableState],
            _writableState: [WritableState],
            allowHalfOpen: false,
            _maxListeners: undefined,
            _sockname: null,
            _pendingData: null,
            _pendingEncoding: '',
            server: undefined,
            _server: null,
            ssl: null,
            _requestCert: true,
            _rejectUnauthorized: true,
            parser: null,
            _httpMessage: [Circular *3],
            autoSelectFamilyAttemptedAddresses: [Array],
            write: [Function: writeAfterFIN],
            [Symbol(alpncallback)]: null,
            [Symbol(res)]: null,
            [Symbol(verified)]: true,
            [Symbol(pendingSession)]: null,
            [Symbol(async_id_symbol)]: 895,
            [Symbol(kHandle)]: null,
            [Symbol(lastWriteQueueSize)]: 0,
            [Symbol(timeout)]: null,
            [Symbol(kBuffer)]: null,
            [Symbol(kBufferCb)]: null,
            [Symbol(kBufferGen)]: null,
            [Symbol(shapeMode)]: true,
            [Symbol(kCapture)]: false,
            [Symbol(kSetNoDelay)]: true,
            [Symbol(kSetKeepAlive)]: false,
            [Symbol(kSetKeepAliveInitialDelay)]: 0,
            [Symbol(kBytesRead)]: 8318,
            [Symbol(kBytesWritten)]: 110,
            [Symbol(connect-options)]: [Object]
          },
          [Symbol(kOutHeaders)]: [Object: null prototype] {
            host: [Array],
            'accept-encoding': [Array]
          },
          [Symbol(errored)]: null,
          [Symbol(kHighWaterMark)]: 65536,
          [Symbol(kRejectNonStandardBodyWrites)]: false,
          [Symbol(kUniqueHeaders)]: null
        },
        text: '[\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 1,\n' +
          '    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n' +
          '    "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 2,\n' +
          '    "title": "qui est esse",\n' +
          '    "body": "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 3,\n' +
          '    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",\n' +
          '    "body": "et iusto sed quo iure\\nvoluptatem occaecati omnis eligendi aut ad\\nvoluptatem doloribus vel accusantium quis pariatur\\nmolestiae porro eius odio et labore et velit aut"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 4,\n' +
          '    "title": "eum et est occaecati",\n' +
          '    "body": "ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 5,\n' +
          '    "title": "nesciunt quas odio",\n' +
          '    "body": "repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 6,\n' +
          '    "title": "dolorem eum magni eos aperiam quia",\n' +
          '    "body": "ut aspernatur corporis harum nihil quis provident sequi\\nmollitia nobis aliquid molestiae\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\nvoluptate dolores velit et doloremque molestiae"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 7,\n' +
          '    "title": "magnam facilis autem",\n' +
          '    "body": "dolore placeat quibusdam ea quo vitae\\nmagni quis enim qui quis quo nemo aut saepe\\nquidem repellat excepturi ut quia\\nsunt ut sequi eos ea sed quas"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 8,\n' +
          '    "title": "dolorem dolore est ipsam",\n' +
          '    "body": "dignissimos aperiam dolorem qui eum\\nfacilis quibusdam animi sint suscipit qui sint possimus cum\\nquaerat magni maiores excepturi\\nipsam ut commodi dolor voluptatum modi aut vitae"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 9,\n' +
          '    "title": "nesciunt iure omnis dolorem tempora et accusantium",\n' +
          '    "body": "consectetur animi nesciunt iure dolore\\nenim quia ad\\nveniam autem ut quam aut nobis\\net est aut quod aut provident voluptas autem voluptas"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 1,\n' +
          '    "id": 10,\n' +
          '    "title": "optio molestias id quia eum",\n' +
          '    "body": "quo et expedita modi cum officia vel magni\\ndoloribus qui repudiandae\\nvero nisi sit\\nquos veniam quod sed accusamus veritatis error"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 11,\n' +
          '    "title": "et ea vero quia laudantium autem",\n' +
          '    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\\naccusamus in eum beatae sit\\nvel qui neque voluptates ut commodi qui incidunt\\nut animi commodi"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 12,\n' +
          '    "title": "in quibusdam tempore odit est dolorem",\n' +
          '    "body": "itaque id aut magnam\\npraesentium quia et ea odit et ea voluptas et\\nsapiente quia nihil amet occaecati quia id voluptatem\\nincidunt ea est distinctio odio"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 13,\n' +
          '    "title": "dolorum ut in voluptas mollitia et saepe quo animi",\n' +
          '    "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\\niste corrupti reiciendis voluptatem eius rerum\\nsit cumque quod eligendi laborum minima\\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 14,\n' +
          '    "title": "voluptatem eligendi optio",\n' +
          '    "body": "fuga et accusamus dolorum perferendis illo voluptas\\nnon doloremque neque facere\\nad qui dolorum molestiae beatae\\nsed aut voluptas totam sit illum"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 15,\n' +
          '    "title": "eveniet quod temporibus",\n' +
          '    "body": "reprehenderit quos placeat\\nvelit minima officia dolores impedit repudiandae molestiae nam\\nvoluptas recusandae quis delectus\\nofficiis harum fugiat vitae"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 16,\n' +
          '    "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",\n' +
          '    "body": "suscipit nam nisi quo aperiam aut\\nasperiores eos fugit maiores voluptatibus quia\\nvoluptatem quis ullam qui in alias quia est\\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 17,\n' +
          '    "title": "fugit voluptas sed molestias voluptatem provident",\n' +
          '    "body": "eos voluptas et aut odit natus earum\\naspernatur fuga molestiae ullam\\ndeserunt ratione qui eos\\nqui nihil ratione nemo velit ut aut id quo"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 18,\n' +
          '    "title": "voluptate et itaque vero tempora molestiae",\n' +
          '    "body": "eveniet quo quis\\nlaborum totam consequatur non dolor\\nut et est repudiandae\\nest voluptatem vel debitis et magnam"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 19,\n' +
          '    "title": "adipisci placeat illum aut reiciendis qui",\n' +
          '    "body": "illum quis cupiditate provident sit magnam\\nea sed aut omnis\\nveniam maiores ullam consequatur atque\\nadipisci quo iste expedita sit quos voluptas"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 2,\n' +
          '    "id": 20,\n' +
          '    "title": "doloribus ad provident suscipit at",\n' +
          '    "body": "qui consequuntur ducimus possimus quisquam amet similique\\nsuscipit porro ipsam amet\\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\\nomnis rerum consequatur expedita quidem cumque explicabo"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 21,\n' +
          '    "title": "asperiores ea ipsam voluptatibus modi minima quia sint",\n' +
          '    "body": "repellat aliquid praesentium dolorem quo\\nsed totam minus non itaque\\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\\ntempora et tenetur expedita sunt"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 22,\n' +
          '    "title": "dolor sint quo a velit explicabo quia nam",\n' +
          '    "body": "eos qui et ipsum ipsam suscipit aut\\nsed omnis non odio\\nexpedita earum mollitia molestiae aut atque rem suscipit\\nnam impedit esse"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 23,\n' +
          '    "title": "maxime id vitae nihil numquam",\n' +
          '    "body": "veritatis unde neque eligendi\\nquae quod architecto quo neque vitae\\nest illo sit tempora doloremque fugit quod\\net et vel beatae sequi ullam sed tenetur perspiciatis"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 24,\n' +
          '    "title": "autem hic labore sunt dolores incidunt",\n' +
          '    "body": "enim et ex nulla\\nomnis voluptas quia qui\\nvoluptatem consequatur numquam aliquam sunt\\ntotam recusandae id dignissimos aut sed asperiores deserunt"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 25,\n' +
          '    "title": "rem alias distinctio quo quis",\n' +
          '    "body": "ullam consequatur ut\\nomnis quis sit vel consequuntur\\nipsa eligendi ipsum molestiae et omnis error nostrum\\nmolestiae illo tempore quia et distinctio"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 26,\n' +
          '    "title": "est et quae odit qui non",\n' +
          '    "body": "similique esse doloribus nihil accusamus\\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\\nperspiciatis cum ut laudantium\\nomnis aut molestiae vel vero"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 27,\n' +
          '    "title": "quasi id et eos tenetur aut quo autem",\n' +
          '    "body": "eum sed dolores ipsam sint possimus debitis occaecati\\ndebitis qui qui et\\nut placeat enim earum aut odit facilis\\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 28,\n' +
          '    "title": "delectus ullam et corporis nulla voluptas sequi",\n' +
          '    "body": "non et quaerat ex quae ad maiores\\nmaiores recusandae totam aut blanditiis mollitia quas illo\\nut voluptatibus voluptatem\\nsimilique nostrum eum"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 29,\n' +
          '    "title": "iusto eius quod necessitatibus culpa ea",\n' +
          '    "body": "odit magnam ut saepe sed non qui\\ntempora atque nihil\\naccusamus illum doloribus illo dolor\\neligendi repudiandae odit magni similique sed cum maiores"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 3,\n' +
          '    "id": 30,\n' +
          '    "title": "a quo magni similique perferendis",\n' +
          '    "body": "alias dolor cumque\\nimpedit blanditiis non eveniet odio maxime\\nblanditiis amet eius quis tempora quia autem rem\\na provident perspiciatis quia"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 31,\n' +
          '    "title": "ullam ut quidem id aut vel consequuntur",\n' +
          '    "body": "debitis eius sed quibusdam non quis consectetur vitae\\nimpedit ut qui consequatur sed aut in\\nquidem sit nostrum et maiores adipisci atque\\nquaerat voluptatem adipisci repudiandae"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 32,\n' +
          '    "title": "doloremque illum aliquid sunt",\n' +
          '    "body": "deserunt eos nobis asperiores et hic\\nest debitis repellat molestiae optio\\nnihil ratione ut eos beatae quibusdam distinctio maiores\\nearum voluptates et aut adipisci ea maiores voluptas maxime"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 33,\n' +
          '    "title": "qui explicabo molestiae dolorem",\n' +
          '    "body": "rerum ut et numquam laborum odit est sit\\nid qui sint in\\nquasi tenetur tempore aperiam et quaerat qui in\\nrerum officiis sequi cumque quod"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 34,\n' +
          '    "title": "magnam ut rerum iure",\n' +
          '    "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\\ntotam pariatur in\\nnemo voluptatem voluptatem autem magni tempora minima in\\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 35,\n' +
          '    "title": "id nihil consequatur molestias animi provident",\n' +
          '    "body": "nisi error delectus possimus ut eligendi vitae\\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\\nmodi ducimus quo illum voluptas eligendi\\net nobis quia fugit"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 36,\n' +
          '    "title": "fuga nam accusamus voluptas reiciendis itaque",\n' +
          '    "body": "ad mollitia et omnis minus architecto odit\\nvoluptas doloremque maxime aut non ipsa qui alias veniam\\nblanditiis culpa aut quia nihil cumque facere et occaecati\\nqui aspernatur quia eaque ut aperiam inventore"\n' +
          '  },\n' +
          '  {\n' +
          '    "userId": 4,\n' +
          '    "id": 37,\n' +
          '    "title": "provident vel ut sit ratione est'... 17520 more characters,
        files: undefined,
        buffered: true,
        headers: {
          date: 'Mon, 19 Jan 2026 21:36:38 GMT',
          'content-type': 'application/json; charset=utf-8',
          'transfer-encoding': 'chunked',
          connection: 'close',
          'access-control-allow-credentials': 'true',
          'cache-control': 'max-age=43200',
          'content-encoding': 'gzip',
          etag: 'W/"6b80-Ybsq/K6GwwqrYkAsFxqDXGC7DoM"',
          expires: '-1',
          nel: '{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}',
          pragma: 'no-cache',
          'report-to': '{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D\\u0026sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d\\u0026ts=1764590345"}],"max_age":3600}',
          'reporting-endpoints': 'heroku-nel="https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&ts=1764590345"',
          'retry-after': '60',
          server: 'cloudflare',
          vary: 'Origin, Accept-Encoding',
          via: '2.0 heroku-router',
          'x-content-type-options': 'nosniff',
          'x-powered-by': 'Express',
          'x-ratelimit-limit': '1000',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1764590369',
          age: '14427',
          'cf-cache-status': 'HIT',
          'server-timing': 'cfCacheStatus;desc="HIT", cfEdge;dur=3,cfOrigin;dur=0',
          'cf-ray': '9c0977ffcf1ec132-SJC',
          'alt-svc': 'h3=":443"; ma=86400'
        },
        header: {
          date: 'Mon, 19 Jan 2026 21:36:38 GMT',
          'content-type': 'application/json; charset=utf-8',
          'transfer-encoding': 'chunked',
          connection: 'close',
          'access-control-allow-credentials': 'true',
          'cache-control': 'max-age=43200',
          'content-encoding': 'gzip',
          etag: 'W/"6b80-Ybsq/K6GwwqrYkAsFxqDXGC7DoM"',
          expires: '-1',
          nel: '{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}',
          pragma: 'no-cache',
          'report-to': '{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D\\u0026sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d\\u0026ts=1764590345"}],"max_age":3600}',
          'reporting-endpoints': 'heroku-nel="https://nel.heroku.com/reports?s=kJNZOmA8NhZVfri8zg7pHoulL1o9nJs40S2fBcHyegQ%3D&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&ts=1764590345"',
          'retry-after': '60',
          server: 'cloudflare',
          vary: 'Origin, Accept-Encoding',
          via: '2.0 heroku-router',
          'x-content-type-options': 'nosniff',
          'x-powered-by': 'Express',
          'x-ratelimit-limit': '1000',
          'x-ratelimit-remaining': '0',
          'x-ratelimit-reset': '1764590369',
          age: '14427',
          'cf-cache-status': 'HIT',
          'server-timing': 'cfCacheStatus;desc="HIT", cfEdge;dur=3,cfOrigin;dur=0',
          'cf-ray': '9c0977ffcf1ec132-SJC',
          'alt-svc': 'h3=":443"; ma=86400'
        },
        statusCode: 200,
        status: 200,
        statusType: 2,
        info: false,
        ok: true,
        redirect: false,
        clientError: false,
        serverError: false,
        error: false,
        created: false,
        accepted: false,
        noContent: false,
        badRequest: false,
        unauthorized: false,
        notAcceptable: false,
        forbidden: false,
        notFound: false,
        unprocessableEntity: false,
        type: 'application/json',
        charset: 'utf-8',
        links: {},
        setEncoding: [Function: bound ],
        redirects: [],
        _body: [
          {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\n' +
              'suscipit recusandae consequuntur expedita et cum\n' +
              'reprehenderit molestiae ut ut quas totam\n' +
              'nostrum rerum est autem sunt rem eveniet architecto'
          },
          {
            userId: 1,
            id: 2,
            title: 'qui est esse',
            body: 'est rerum tempore vitae\n' +
              'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
              'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
              'qui aperiam non debitis possimus qui neque nisi nulla'
          },
          {
            userId: 1,
            id: 3,
            title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            body: 'et iusto sed quo iure\n' +
              'voluptatem occaecati omnis eligendi aut ad\n' +
              'voluptatem doloribus vel accusantium quis pariatur\n' +
              'molestiae porro eius odio et labore et velit aut'
          },
          {
            userId: 1,
            id: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\n' +
              'sit amet autem assumenda provident rerum culpa\n' +
              'quis hic commodi nesciunt rem tenetur doloremque ipsam iure\n' +
              'quis sunt voluptatem rerum illo velit'
          },
          {
            userId: 1,
            id: 5,
            title: 'nesciunt quas odio',
            body: 'repudiandae veniam quaerat sunt sed\n' +
              'alias aut fugiat sit autem sed est\n' +
              'voluptatem omnis possimus esse voluptatibus quis\n' +
              'est aut tenetur dolor neque'
          },
          {
            userId: 1,
            id: 6,
            title: 'dolorem eum magni eos aperiam quia',
            body: 'ut aspernatur corporis harum nihil quis provident sequi\n' +
              'mollitia nobis aliquid molestiae\n' +
              'perspiciatis et ea nemo ab reprehenderit accusantium quas\n' +
              'voluptate dolores velit et doloremque molestiae'
          },
          {
            userId: 1,
            id: 7,
            title: 'magnam facilis autem',
            body: 'dolore placeat quibusdam ea quo vitae\n' +
              'magni quis enim qui quis quo nemo aut saepe\n' +
              'quidem repellat excepturi ut quia\n' +
              'sunt ut sequi eos ea sed quas'
          },
          {
            userId: 1,
            id: 8,
            title: 'dolorem dolore est ipsam',
            body: 'dignissimos aperiam dolorem qui eum\n' +
              'facilis quibusdam animi sint suscipit qui sint possimus cum\n' +
              'quaerat magni maiores excepturi\n' +
              'ipsam ut commodi dolor voluptatum modi aut vitae'
          },
          {
            userId: 1,
            id: 9,
            title: 'nesciunt iure omnis dolorem tempora et accusantium',
            body: 'consectetur animi nesciunt iure dolore\n' +
              'enim quia ad\n' +
              'veniam autem ut quam aut nobis\n' +
              'et est aut quod aut provident voluptas autem voluptas'
          },
          {
            userId: 1,
            id: 10,
            title: 'optio molestias id quia eum',
            body: 'quo et expedita modi cum officia vel magni\n' +
              'doloribus qui repudiandae\n' +
              'vero nisi sit\n' +
              'quos veniam quod sed accusamus veritatis error'
          },
          {
            userId: 2,
            id: 11,
            title: 'et ea vero quia laudantium autem',
            body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\n' +
              'accusamus in eum beatae sit\n' +
              'vel qui neque voluptates ut commodi qui incidunt\n' +
              'ut animi commodi'
          },
          {
            userId: 2,
            id: 12,
            title: 'in quibusdam tempore odit est dolorem',
            body: 'itaque id aut magnam\n' +
              'praesentium quia et ea odit et ea voluptas et\n' +
              'sapiente quia nihil amet occaecati quia id voluptatem\n' +
              'incidunt ea est distinctio odio'
          },
          {
            userId: 2,
            id: 13,
            title: 'dolorum ut in voluptas mollitia et saepe quo animi',
            body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque\n' +
              'iste corrupti reiciendis voluptatem eius rerum\n' +
              'sit cumque quod eligendi laborum minima\n' +
              'perferendis recusandae assumenda consectetur porro architecto ipsum ipsam'
          },
          {
            userId: 2,
            id: 14,
            title: 'voluptatem eligendi optio',
            body: 'fuga et accusamus dolorum perferendis illo voluptas\n' +
              'non doloremque neque facere\n' +
              'ad qui dolorum molestiae beatae\n' +
              'sed aut voluptas totam sit illum'
          },
          {
            userId: 2,
            id: 15,
            title: 'eveniet quod temporibus',
            body: 'reprehenderit quos placeat\n' +
              'velit minima officia dolores impedit repudiandae molestiae nam\n' +
              'voluptas recusandae quis delectus\n' +
              'officiis harum fugiat vitae'
          },
          {
            userId: 2,
            id: 16,
            title: 'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
            body: 'suscipit nam nisi quo aperiam aut\n' +
              'asperiores eos fugit maiores voluptatibus quia\n' +
              'voluptatem quis ullam qui in alias quia est\n' +
              'consequatur magni mollitia accusamus ea nisi voluptate dicta'
          },
          {
            userId: 2,
            id: 17,
            title: 'fugit voluptas sed molestias voluptatem provident',
            body: 'eos voluptas et aut odit natus earum\n' +
              'aspernatur fuga molestiae ullam\n' +
              'deserunt ratione qui eos\n' +
              'qui nihil ratione nemo velit ut aut id quo'
          },
          {
            userId: 2,
            id: 18,
            title: 'voluptate et itaque vero tempora molestiae',
            body: 'eveniet quo quis\n' +
              'laborum totam consequatur non dolor\n' +
              'ut et est repudiandae\n' +
              'est voluptatem vel debitis et magnam'
          },
          {
            userId: 2,
            id: 19,
            title: 'adipisci placeat illum aut reiciendis qui',
            body: 'illum quis cupiditate provident sit magnam\n' +
              'ea sed aut omnis\n' +
              'veniam maiores ullam consequatur atque\n' +
              'adipisci quo iste expedita sit quos voluptas'
          },
          {
            userId: 2,
            id: 20,
            title: 'doloribus ad provident suscipit at',
            body: 'qui consequuntur ducimus possimus quisquam amet similique\n' +
              'suscipit porro ipsam amet\n' +
              'eos veritatis officiis exercitationem vel fugit aut necessitatibus totam\n' +
              'omnis rerum consequatur expedita quidem cumque explicabo'
          },
          {
            userId: 3,
            id: 21,
            title: 'asperiores ea ipsam voluptatibus modi minima quia sint',
            body: 'repellat aliquid praesentium dolorem quo\n' +
              'sed totam minus non itaque\n' +
              'nihil labore molestiae sunt dolor eveniet hic recusandae veniam\n' +
              'tempora et tenetur expedita sunt'
          },
          {
            userId: 3,
            id: 22,
            title: 'dolor sint quo a velit explicabo quia nam',
            body: 'eos qui et ipsum ipsam suscipit aut\n' +
              'sed omnis non odio\n' +
              'expedita earum mollitia molestiae aut atque rem suscipit\n' +
              'nam impedit esse'
          },
          {
            userId: 3,
            id: 23,
            title: 'maxime id vitae nihil numquam',
            body: 'veritatis unde neque eligendi\n' +
              'quae quod architecto quo neque vitae\n' +
              'est illo sit tempora doloremque fugit quod\n' +
              'et et vel beatae sequi ullam sed tenetur perspiciatis'
          },
          {
            userId: 3,
            id: 24,
            title: 'autem hic labore sunt dolores incidunt',
            body: 'enim et ex nulla\n' +
              'omnis voluptas quia qui\n' +
              'voluptatem consequatur numquam aliquam sunt\n' +
              'totam recusandae id dignissimos aut sed asperiores deserunt'
          },
          {
            userId: 3,
            id: 25,
            title: 'rem alias distinctio quo quis',
            body: 'ullam consequatur ut\n' +
              'omnis quis sit vel consequuntur\n' +
              'ipsa eligendi ipsum molestiae et omnis error nostrum\n' +
              'molestiae illo tempore quia et distinctio'
          },
          {
            userId: 3,
            id: 26,
            title: 'est et quae odit qui non',
            body: 'similique esse doloribus nihil accusamus\n' +
              'omnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\n' +
              'perspiciatis cum ut laudantium\n' +
              'omnis aut molestiae vel vero'
          },
          {
            userId: 3,
            id: 27,
            title: 'quasi id et eos tenetur aut quo autem',
            body: 'eum sed dolores ipsam sint possimus debitis occaecati\n' +
              'debitis qui qui et\n' +
              'ut placeat enim earum aut odit facilis\n' +
              'consequatur suscipit necessitatibus rerum sed inventore temporibus consequatur'
          },
          {
            userId: 3,
            id: 28,
            title: 'delectus ullam et corporis nulla voluptas sequi',
            body: 'non et quaerat ex quae ad maiores\n' +
              'maiores recusandae totam aut blanditiis mollitia quas illo\n' +
              'ut voluptatibus voluptatem\n' +
              'similique nostrum eum'
          },
          {
            userId: 3,
            id: 29,
            title: 'iusto eius quod necessitatibus culpa ea',
            body: 'odit magnam ut saepe sed non qui\n' +
              'tempora atque nihil\n' +
              'accusamus illum doloribus illo dolor\n' +
              'eligendi repudiandae odit magni similique sed cum maiores'
          },
          {
            userId: 3,
            id: 30,
            title: 'a quo magni similique perferendis',
            body: 'alias dolor cumque\n' +
              'impedit blanditiis non eveniet odio maxime\n' +
              'blanditiis amet eius quis tempora quia autem rem\n' +
              'a provident perspiciatis quia'
          },
          {
            userId: 4,
            id: 31,
            title: 'ullam ut quidem id aut vel consequuntur',
            body: 'debitis eius sed quibusdam non quis consectetur vitae\n' +
              'impedit ut qui consequatur sed aut in\n' +
              'quidem sit nostrum et maiores adipisci atque\n' +
              'quaerat voluptatem adipisci repudiandae'
          },
          {
            userId: 4,
            id: 32,
            title: 'doloremque illum aliquid sunt',
            body: 'deserunt eos nobis asperiores et hic\n' +
              'est debitis repellat molestiae optio\n' +
              'nihil ratione ut eos beatae quibusdam distinctio maiores\n' +
              'earum voluptates et aut adipisci ea maiores voluptas maxime'
          },
          {
            userId: 4,
            id: 33,
            title: 'qui explicabo molestiae dolorem',
            body: 'rerum ut et numquam laborum odit est sit\n' +
              'id qui sint in\n' +
              'quasi tenetur tempore aperiam et quaerat qui in\n' +
              'rerum officiis sequi cumque quod'
          },
          {
            userId: 4,
            id: 34,
            title: 'magnam ut rerum iure',
            body: 'ea velit perferendis earum ut voluptatem voluptate itaque iusto\n' +
              'totam pariatur in\n' +
              'nemo voluptatem voluptatem autem magni tempora minima in\n' +
              'est distinctio qui assumenda accusamus dignissimos officia nesciunt nobis'
          },
          {
            userId: 4,
            id: 35,
            title: 'id nihil consequatur molestias animi provident',
            body: 'nisi error delectus possimus ut eligendi vitae\n' +
              'placeat eos harum cupiditate facilis reprehenderit voluptatem beatae\n' +
              'modi ducimus quo illum voluptas eligendi\n' +
              'et nobis quia fugit'
          },
          {
            userId: 4,
            id: 36,
            title: 'fuga nam accusamus voluptas reiciendis itaque',
            body: 'ad mollitia et omnis minus architecto odit\n' +
              'voluptas doloremque maxime aut non ipsa qui alias veniam\n' +
              'blanditiis culpa aut quia nihil cumque facere et occaecati\n' +
              'qui aspernatur quia eaque ut aperiam inventore'
          },
          {
            userId: 4,
            id: 37,
            title: 'provident vel ut sit ratione est',
            body: 'debitis et eaque non officia sed nesciunt pariatur vel\n' +
              'voluptatem iste vero et ea\n' +
              'numquam aut expedita ipsum nulla in\n' +
              'voluptates omnis consequatur aut enim officiis in quam qui'
          },
          {
            userId: 4,
            id: 38,
            title: 'explicabo et eos deleniti nostrum ab id repellendus',
            body: 'animi esse sit aut sit nesciunt assumenda eum voluptas\n' +
              'quia voluptatibus provident quia necessitatibus ea\n' +
              'rerum repudiandae quia voluptatem delectus fugit aut id quia\n' +
              'ratione optio eos iusto veniam iure'
          },
          {
            userId: 4,
            id: 39,
            title: 'eos dolorem iste accusantium est eaque quam',
            body: 'corporis rerum ducimus vel eum accusantium\n' +
              'maxime aspernatur a porro possimus iste omnis\n' +
              'est in deleniti asperiores fuga aut\n' +
              'voluptas sapiente vel dolore minus voluptatem incidunt ex'
          },
          {
            userId: 4,
            id: 40,
            title: 'enim quo cumque',
            body: 'ut voluptatum aliquid illo tenetur nemo sequi quo facilis\n' +
              'ipsum rem optio mollitia quas\n' +
              'voluptatem eum voluptas qui\n' +
              'unde omnis voluptatem iure quasi maxime voluptas nam'
          },
          {
            userId: 5,
            id: 41,
            title: 'non est facere',
            body: 'molestias id nostrum\n' +
              'excepturi molestiae dolore omnis repellendus quaerat saepe\n' +
              'consectetur iste quaerat tenetur asperiores accusamus ex ut\n' +
              'nam quidem est ducimus sunt debitis saepe'
          },
          {
            userId: 5,
            id: 42,
            title: 'commodi ullam sint et excepturi error explicabo praesentium voluptas',
            body: 'odio fugit voluptatum ducimus earum autem est incidunt voluptatem\n' +
              'odit reiciendis aliquam sunt sequi nulla dolorem\n' +
              'non facere repellendus voluptates quia\n' +
              'ratione harum vitae ut'
          },
          {
            userId: 5,
            id: 43,
            title: 'eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis',
            body: 'similique fugit est\n' +
              'illum et dolorum harum et voluptate eaque quidem\n' +
              'exercitationem quos nam commodi possimus cum odio nihil nulla\n' +
              'dolorum exercitationem magnam ex et a et distinctio debitis'
          },
          {
            userId: 5,
            id: 44,
            title: 'optio dolor molestias sit',
            body: 'temporibus est consectetur dolore\n' +
              'et libero debitis vel velit laboriosam quia\n' +
              'ipsum quibusdam qui itaque fuga rem aut\n' +
              'ea et iure quam sed maxime ut distinctio quae'
          },
          {
            userId: 5,
            id: 45,
            title: 'ut numquam possimus omnis eius suscipit laudantium iure',
            body: 'est natus reiciendis nihil possimus aut provident\n' +
              'ex et dolor\n' +
              'repellat pariatur est\n' +
              'nobis rerum repellendus dolorem autem'
          },
          {
            userId: 5,
            id: 46,
            title: 'aut quo modi neque nostrum ducimus',
            body: 'voluptatem quisquam iste\n' +
              'voluptatibus natus officiis facilis dolorem\n' +
              'quis quas ipsam\n' +
              'vel et voluptatum in aliquid'
          },
          {
            userId: 5,
            id: 47,
            title: 'quibusdam cumque rem aut deserunt',
            body: 'voluptatem assumenda ut qui ut cupiditate aut impedit veniam\n' +
              'occaecati nemo illum voluptatem laudantium\n' +
              'molestiae beatae rerum ea iure soluta nostrum\n' +
              'eligendi et voluptate'
          },
          {
            userId: 5,
            id: 48,
            title: 'ut voluptatem illum ea doloribus itaque eos',
            body: 'voluptates quo voluptatem facilis iure occaecati\n' +
              'vel assumenda rerum officia et\n' +
              'illum perspiciatis ab deleniti\n' +
              'laudantium repellat ad ut et autem reprehenderit'
          },
          {
            userId: 5,
            id: 49,
            title: 'laborum non sunt aut ut assumenda perspiciatis voluptas',
            body: 'inventore ab sint\n' +
              'natus fugit id nulla sequi architecto nihil quaerat\n' +
              'eos tenetur in in eum veritatis non\n' +
              'quibusdam officiis aspernatur cumque aut commodi aut'
          },
          {
            userId: 5,
            id: 50,
            title: 'repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem',
            body: 'error suscipit maxime adipisci consequuntur recusandae\n' +
              'voluptas eligendi et est et voluptates\n' +
              'quia distinctio ab amet quaerat molestiae et vitae\n' +
              'adipisci impedit sequi nesciunt quis consectetur'
          },
          {
            userId: 6,
            id: 51,
            title: 'soluta aliquam aperiam consequatur illo quis voluptas',
            body: 'sunt dolores aut doloribus\n' +
              'dolore doloribus voluptates tempora et\n' +
              'doloremque et quo\n' +
              'cum asperiores sit consectetur dolorem'
          },
          {
            userId: 6,
            id: 52,
            title: 'qui enim et consequuntur quia animi quis voluptate quibusdam',
            body: 'iusto est quibusdam fuga quas quaerat molestias\n' +
              'a enim ut sit accusamus enim\n' +
              'temporibus iusto accusantium provident architecto\n' +
              'soluta esse reprehenderit qui laborum'
          },
          {
            userId: 6,
            id: 53,
            title: 'ut quo aut ducimus alias',
            body: 'minima harum praesentium eum rerum illo dolore\n' +
              'quasi exercitationem rerum nam\n' +
              'porro quis neque quo\n' +
              'consequatur minus dolor quidem veritatis sunt non explicabo similique'
          },
          {
            userId: 6,
            id: 54,
            title: 'sit asperiores ipsam eveniet odio non quia',
            body: 'totam corporis dignissimos\n' +
              'vitae dolorem ut occaecati accusamus\n' +
              'ex velit deserunt\n' +
              'et exercitationem vero incidunt corrupti mollitia'
          },
          {
            userId: 6,
            id: 55,
            title: 'sit vel voluptatem et non libero',
            body: 'debitis excepturi ea perferendis harum libero optio\n' +
              'eos accusamus cum fuga ut sapiente repudiandae\n' +
              'et ut incidunt omnis molestiae\n' +
              'nihil ut eum odit'
          },
          {
            userId: 6,
            id: 56,
            title: 'qui et at rerum necessitatibus',
            body: 'aut est omnis dolores\n' +
              'neque rerum quod ea rerum velit pariatur beatae excepturi\n' +
              'et provident voluptas corrupti\n' +
              'corporis harum reprehenderit dolores eligendi'
          },
          {
            userId: 6,
            id: 57,
            title: 'sed ab est est',
            body: 'at pariatur consequuntur earum quidem\n' +
              'quo est laudantium soluta voluptatem\n' +
              'qui ullam et est\n' +
              'et cum voluptas voluptatum repellat est'
          },
          {
            userId: 6,
            id: 58,
            title: 'voluptatum itaque dolores nisi et quasi',
            body: 'veniam voluptatum quae adipisci id\n' +
              'et id quia eos ad et dolorem\n' +
              'aliquam quo nisi sunt eos impedit error\n' +
              'ad similique veniam'
          },
          {
            userId: 6,
            id: 59,
            title: 'qui commodi dolor at maiores et quis id accusantium',
            body: 'perspiciatis et quam ea autem temporibus non voluptatibus qui\n' +
              'beatae a earum officia nesciunt dolores suscipit voluptas et\n' +
              'animi doloribus cum rerum quas et magni\n' +
              'et hic ut ut commodi expedita sunt'
          },
          {
            userId: 6,
            id: 60,
            title: 'consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere',
            body: 'asperiores sunt ab assumenda cumque modi velit\n' +
              'qui esse omnis\n' +
              'voluptate et fuga perferendis voluptas\n' +
              'illo ratione amet aut et omnis'
          },
          {
            userId: 7,
            id: 61,
            title: 'voluptatem doloribus consectetur est ut ducimus',
            body: 'ab nemo optio odio\n' +
              'delectus tenetur corporis similique nobis repellendus rerum omnis facilis\n' +
              'vero blanditiis debitis in nesciunt doloribus dicta dolores\n' +
              'magnam minus velit'
          },
          {
            userId: 7,
            id: 62,
            title: 'beatae enim quia vel',
            body: 'enim aspernatur illo distinctio quae praesentium\n' +
              'beatae alias amet delectus qui voluptate distinctio\n' +
              'odit sint accusantium autem omnis\n' +
              'quo molestiae omnis ea eveniet optio'
          },
          {
            userId: 7,
            id: 63,
            title: 'voluptas blanditiis repellendus animi ducimus error sapiente et suscipit',
            body: 'enim adipisci aspernatur nemo\n' +
              'numquam omnis facere dolorem dolor ex quis temporibus incidunt\n' +
              'ab delectus culpa quo reprehenderit blanditiis asperiores\n' +
              'accusantium ut quam in voluptatibus voluptas ipsam dicta'
          },
          {
            userId: 7,
            id: 64,
            title: 'et fugit quas eum in in aperiam quod',
            body: 'id velit blanditiis\n' +
              'eum ea voluptatem\n' +
              'molestiae sint occaecati est eos perspiciatis\n' +
              'incidunt a error provident eaque aut aut qui'
          },
          {
            userId: 7,
            id: 65,
            title: 'consequatur id enim sunt et et',
            body: 'voluptatibus ex esse\n' +
              'sint explicabo est aliquid cumque adipisci fuga repellat labore\n' +
              'molestiae corrupti ex saepe at asperiores et perferendis\n' +
              'natus id esse incidunt pariatur'
          },
          {
            userId: 7,
            id: 66,
            title: 'repudiandae ea animi iusto',
            body: 'officia veritatis tenetur vero qui itaque\n' +
              'sint non ratione\n' +
              'sed et ut asperiores iusto eos molestiae nostrum\n' +
              'veritatis quibusdam et nemo iusto saepe'
          },
          {
            userId: 7,
            id: 67,
            title: 'aliquid eos sed fuga est maxime repellendus',
            body: 'reprehenderit id nostrum\n' +
              'voluptas doloremque pariatur sint et accusantium quia quod aspernatur\n' +
              'et fugiat amet\n' +
              'non sapiente et consequatur necessitatibus molestiae'
          },
          {
            userId: 7,
            id: 68,
            title: 'odio quis facere architecto reiciendis optio',
            body: 'magnam molestiae perferendis quisquam\n' +
              'qui cum reiciendis\n' +
              'quaerat animi amet hic inventore\n' +
              'ea quia deleniti quidem saepe porro velit'
          },
          {
            userId: 7,
            id: 69,
            title: 'fugiat quod pariatur odit minima',
            body: 'officiis error culpa consequatur modi asperiores et\n' +
              'dolorum assumenda voluptas et vel qui aut vel rerum\n' +
              'voluptatum quisquam perspiciatis quia rerum consequatur totam quas\n' +
              'sequi commodi repudiandae asperiores et saepe a'
          },
          {
            userId: 7,
            id: 70,
            title: 'voluptatem laborum magni',
            body: 'sunt repellendus quae\n' +
              'est asperiores aut deleniti esse accusamus repellendus quia aut\n' +
              'quia dolorem unde\n' +
              'eum tempora esse dolore'
          },
          {
            userId: 8,
            id: 71,
            title: 'et iusto veniam et illum aut fuga',
            body: 'occaecati a doloribus\n' +
              'iste saepe consectetur placeat eum voluptate dolorem et\n' +
              'qui quo quia voluptas\n' +
              'rerum ut id enim velit est perferendis'
          },
          {
            userId: 8,
            id: 72,
            title: 'sint hic doloribus consequatur eos non id',
            body: 'quam occaecati qui deleniti consectetur\n' +
              'consequatur aut facere quas exercitationem aliquam hic voluptas\n' +
              'neque id sunt ut aut accusamus\n' +
              'sunt consectetur expedita inventore velit'
          },
          {
            userId: 8,
            id: 73,
            title: 'consequuntur deleniti eos quia temporibus ab aliquid at',
            body: 'voluptatem cumque tenetur consequatur expedita ipsum nemo quia explicabo\n' +
              'aut eum minima consequatur\n' +
              'tempore cumque quae est et\n' +
              'et in consequuntur voluptatem voluptates aut'
          },
          {
            userId: 8,
            id: 74,
            title: 'enim unde ratione doloribus quas enim ut sit sapiente',
            body: 'odit qui et et necessitatibus sint veniam\n' +
              'mollitia amet doloremque molestiae commodi similique magnam et quam\n' +
              'blanditiis est itaque\n' +
              'quo et tenetur ratione occaecati molestiae tempora'
          },
          {
            userId: 8,
            id: 75,
            title: 'dignissimos eum dolor ut enim et delectus in',
            body: 'commodi non non omnis et voluptas sit\n' +
              'autem aut nobis magnam et sapiente voluptatem\n' +
              'et laborum repellat qui delectus facilis temporibus\n' +
              'rerum amet et nemo voluptate expedita adipisci error dolorem'
          },
          {
            userId: 8,
            id: 76,
            title: 'doloremque officiis ad et non perferendis',
            body: 'ut animi facere\n' +
              'totam iusto tempore\n' +
              'molestiae eum aut et dolorem aperiam\n' +
              'quaerat recusandae totam odio'
          },
          {
            userId: 8,
            id: 77,
            title: 'necessitatibus quasi exercitationem odio',
            body: 'modi ut in nulla repudiandae dolorum nostrum eos\n' +
              'aut consequatur omnis\n' +
              'ut incidunt est omnis iste et quam\n' +
              'voluptates sapiente aliquam asperiores nobis amet corrupti repudiandae provident'
          },
          {
            userId: 8,
            id: 78,
            title: 'quam voluptatibus rerum veritatis',
            body: 'nobis facilis odit tempore cupiditate quia\n' +
              'assumenda doloribus rerum qui ea\n' +
              'illum et qui totam\n' +
              'aut veniam repellendus'
          },
          {
            userId: 8,
            id: 79,
            title: 'pariatur consequatur quia magnam autem omnis non amet',
            body: 'libero accusantium et et facere incidunt sit dolorem\n' +
              'non excepturi qui quia sed laudantium\n' +
              'quisquam molestiae ducimus est\n' +
              'officiis esse molestiae iste et quos'
          },
          {
            userId: 8,
            id: 80,
            title: 'labore in ex et explicabo corporis aut quas',
            body: 'ex quod dolorem ea eum iure qui provident amet\n' +
              'quia qui facere excepturi et repudiandae\n' +
              'asperiores molestias provident\n' +
              'minus incidunt vero fugit rerum sint sunt excepturi provident'
          },
          {
            userId: 9,
            id: 81,
            title: 'tempora rem veritatis voluptas quo dolores vero',
            body: 'facere qui nesciunt est voluptatum voluptatem nisi\n' +
              'sequi eligendi necessitatibus ea at rerum itaque\n' +
              'harum non ratione velit laboriosam quis consequuntur\n' +
              'ex officiis minima doloremque voluptas ut aut'
          },
          {
            userId: 9,
            id: 82,
            title: 'laudantium voluptate suscipit sunt enim enim',
            body: 'ut libero sit aut totam inventore sunt\n' +
              'porro sint qui sunt molestiae\n' +
              'consequatur cupiditate qui iste ducimus adipisci\n' +
              'dolor enim assumenda soluta laboriosam amet iste delectus hic'
          },
          {
            userId: 9,
            id: 83,
            title: 'odit et voluptates doloribus alias odio et',
            body: 'est molestiae facilis quis tempora numquam nihil qui\n' +
              'voluptate sapiente consequatur est qui\n' +
              'necessitatibus autem aut ipsa aperiam modi dolore numquam\n' +
              'reprehenderit eius rem quibusdam'
          },
          {
            userId: 9,
            id: 84,
            title: 'optio ipsam molestias necessitatibus occaecati facilis veritatis dolores aut',
            body: 'sint molestiae magni a et quos\n' +
              'eaque et quasi\n' +
              'ut rerum debitis similique veniam\n' +
              'recusandae dignissimos dolor incidunt consequatur odio'
          },
          {
            userId: 9,
            id: 85,
            title: 'dolore veritatis porro provident adipisci blanditiis et sunt',
            body: 'similique sed nisi voluptas iusto omnis\n' +
              'mollitia et quo\n' +
              'assumenda suscipit officia magnam sint sed tempora\n' +
              'enim provident pariatur praesentium atque animi amet ratione'
          },
          {
            userId: 9,
            id: 86,
            title: 'placeat quia et porro iste',
            body: 'quasi excepturi consequatur iste autem temporibus sed molestiae beatae\n' +
              'et quaerat et esse ut\n' +
              'voluptatem occaecati et vel explicabo autem\n' +
              'asperiores pariatur deserunt optio'
          },
          {
            userId: 9,
            id: 87,
            title: 'nostrum quis quasi placeat',
            body: 'eos et molestiae\n' +
              'nesciunt ut a\n' +
              'dolores perspiciatis repellendus repellat aliquid\n' +
              'magnam sint rem ipsum est'
          },
          {
            userId: 9,
            id: 88,
            title: 'sapiente omnis fugit eos',
            body: 'consequatur omnis est praesentium\n' +
              'ducimus non iste\n' +
              'neque hic deserunt\n' +
              'voluptatibus veniam cum et rerum sed'
          },
          {
            userId: 9,
            id: 89,
            title: 'sint soluta et vel magnam aut ut sed qui',
            body: 'repellat aut aperiam totam temporibus autem et\n' +
              'architecto magnam ut\n' +
              'consequatur qui cupiditate rerum quia soluta dignissimos nihil iure\n' +
              'tempore quas est'
          },
          {
            userId: 9,
            id: 90,
            title: 'ad iusto omnis odit dolor voluptatibus',
            body: 'minus omnis soluta quia\n' +
              'qui sed adipisci voluptates illum ipsam voluptatem\n' +
              'eligendi officia ut in\n' +
              'eos soluta similique molestias praesentium blanditiis'
          },
          {
            userId: 10,
            id: 91,
            title: 'aut amet sed',
            body: 'libero voluptate eveniet aperiam sed\n' +
              'sunt placeat suscipit molestias\n' +
              'similique fugit nam natus\n' +
              'expedita consequatur consequatur dolores quia eos et placeat'
          },
          {
            userId: 10,
            id: 92,
            title: 'ratione ex tenetur perferendis',
            body: 'aut et excepturi dicta laudantium sint rerum nihil\n' +
              'laudantium et at\n' +
              'a neque minima officia et similique libero et\n' +
              'commodi voluptate qui'
          },
          {
            userId: 10,
            id: 93,
            title: 'beatae soluta recusandae',
            body: 'dolorem quibusdam ducimus consequuntur dicta aut quo laboriosam\n' +
              'voluptatem quis enim recusandae ut sed sunt\n' +
              'nostrum est odit totam\n' +
              'sit error sed sunt eveniet provident qui nulla'
          },
          {
            userId: 10,
            id: 94,
            title: 'qui qui voluptates illo iste minima',
            body: 'aspernatur expedita soluta quo ab ut similique\n' +
              'expedita dolores amet\n' +
              'sed temporibus distinctio magnam saepe deleniti\n' +
              'omnis facilis nam ipsum natus sint similique omnis'
          },
          {
            userId: 10,
            id: 95,
            title: 'id minus libero illum nam ad officiis',
            body: 'earum voluptatem facere provident blanditiis velit laboriosam\n' +
              'pariatur accusamus odio saepe\n' +
              'cumque dolor qui a dicta ab doloribus consequatur omnis\n' +
              'corporis cupiditate eaque assumenda ad nesciunt'
          },
          {
            userId: 10,
            id: 96,
            title: 'quaerat velit veniam amet cupiditate aut numquam ut sequi',
            body: 'in non odio excepturi sint eum\n' +
              'labore voluptates vitae quia qui et\n' +
              'inventore itaque rerum\n' +
              'veniam non exercitationem delectus aut'
          },
          {
            userId: 10,
            id: 97,
            title: 'quas fugiat ut perspiciatis vero provident',
            body: 'eum non blanditiis soluta porro quibusdam voluptas\n' +
              'vel voluptatem qui placeat dolores qui velit aut\n' +
              'vel inventore aut cumque culpa explicabo aliquid at\n' +
              'perspiciatis est et voluptatem dignissimos dolor itaque sit nam'
          },
          {
            userId: 10,
            id: 98,
            title: 'laboriosam dolor voluptates',
            body: 'doloremque ex facilis sit sint culpa\n' +
              'soluta assumenda eligendi non ut eius\n' +
              'sequi ducimus vel quasi\n' +
              'veritatis est dolores'
          },
          {
            userId: 10,
            id: 99,
            title: 'temporibus sit alias delectus eligendi possimus magni',
            body: 'quo deleniti praesentium dicta non quod\n' +
              'aut est molestias\n' +
              'molestias et officia quis nihil\n' +
              'itaque dolorem quia'
          },
          {
            userId: 10,
            id: 100,
            title: 'at nam consequatur ea labore ea harum',
            body: 'cupiditate quo est a modi nesciunt soluta\n' +
              'ipsa voluptas error itaque dicta in\n' +
              'autem qui minus magnam et distinctio eum\n' +
              'accusamus ratione error aut'
          }
        ],
        pipe: [Function (anonymous)],
        [Symbol(shapeMode)]: false,
        [Symbol(kCapture)]: false
      }

      at specs/poc.spec.ts:8:17

PASS specs/categories.spec.ts (22.761 s)
  ● Console

    console.log
      {
        token: 'REDACTED',
        info: {
          _id: 'REDACTED',
          email: 'REDACTED',
          password: null,
          username: 'REDACTED',
          reset_token: null,
          expiry_token: null,
          super_admin: false,
          gender: 'male',
          contact: '',
          user_roles: false,
          category_roles: true,
          brand_roles: true,
          product_roles: false,
          __v: 0
        }
      }

      at TestHelper.<anonymous> (utils/helper.ts:12:21)

    console.log
      {
        name: 'Test Category 78391',
        _id: '696ea3e6986188d4dce627f7',
        __v: 0
      }

      at TestHelper.<anonymous> (utils/helper.ts:27:21)

    console.log
      {
        name: 'Test Category 78391',
        _id: '696ea3e6986188d4dce627f7',
        __v: 0
      }

      at specs/categories.spec.ts:30:21

    console.log
      {
        name: 'Test Category 27191',
        _id: '696ea3e7986188d4dce627ff',
        __v: 0
      }

      at TestHelper.<anonymous> (utils/helper.ts:27:21)

    console.log
      {
        _id: '696ea3e7986188d4dce627ff',
        name: 'New category name94689',
        __v: 0
      }

      at specs/categories.spec.ts:52:21

    console.log
      {
        name: 'Test Category 15529',
        _id: '696ea3e8986188d4dce62808',
        __v: 0
      }

      at TestHelper.<anonymous> (utils/helper.ts:27:21)

PASS specs/brands.spec.ts (24.869 s)
  ● Console

    console.log
      printing the response body

      at specs/brands.spec.ts:42:21

    console.log
      {
        _id: '696ea3e2986188d4dce627eb',
        name: 'Test Brand 393',
        description: 'Testing creating a new entry',
        createdAt: '2026-01-19T21:36:34.816Z',
        updatedAt: '2026-01-19T21:36:34.816Z',
        __v: 0
      }

      at specs/brands.spec.ts:43:21

    console.log
      { error: 'Name is required' }

      at specs/brands.spec.ts:54:21

    console.log
      { error: 'Brand name is too short' }

      at specs/brands.spec.ts:64:21

    console.log
      { error: 'Brand name is too long' }

      at specs/brands.spec.ts:74:21

    console.log
      { error: 'Brand description must be a string' }

      at specs/brands.spec.ts:84:21

    console.log
      { error: 'Test Brand 393 already exists' }

      at specs/brands.spec.ts:97:21

    console.log
      { error: 'Brand not found.' }

      at specs/brands.spec.ts:105:21

    console.log
      { error: 'Brand not found.' }

      at specs/brands.spec.ts:117:21

📦 report is created on: /Users/workspace/.jenkins/workspace/jest-api-test/API-test-automation-with-TypeScript/reports/report.html

Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        26.69 s
Ran all test suites.
Finished: SUCCESS
</details>


## Integrate JUnit Report
* Add Post-build to generate report
* Add report path
* Execute tests
* Verify report generation

### Add Post-build to generate report and Report path
1. In Jenkins project, select Configuration
2. Scroll down to Post-build Actions and select Post-build Actions
3. In the dropdown, select Publish JUnit test result report
4. For the Test Report XML directory add this path:
    1. reports/*.xml
    2. In the case of my project structure I used: API-test-automation-with-TypeScript/reports/*.xml
5. Select Apply/Save

### Execute Tests and Verify report generation
1. Go to the jenkins project
2. Select Build Now
3. After the build is done, in the Build page, select Test to see the report
4. You also case see the test report directly on the project page

## Integrate HTML Report
* Install HTML Publisher plugin
* Add Post-build action to generate report
* Add report path
* Execute tests
* Verify Report generation

### Install HTML Publisher plugin
1. Go to Dashboard
2. Then Settings (Manage Projects)
3. Then Plugins
4. Then Available Plugins
5. Search for HTML Publisher
6. Select HTML Publisher and then Install

### Add Post-build action to generate report
1. Go to Jenkins project
2. Then Configuraiton
3. Scroll down to the end of Post-build Actions
4. Then select Add Post-build Actions
5. In the dropdown select Publish HTML reports.
6. Scroll up to the top of Post-build Actions to find the Publish HTML reports added
7. Select Add
8. For the HTML directory to archive add this path:
    1. API-test-automation-with-TypeScript/reports/
9. For Index page add this name (or other name if more appropriate)
    1. report.html
10. Select Apply/Save

### Execute tests and Verify Report generation
1. Go to jenkins project and select Build now
2. After Build is completed, check the Jenking project and a HTML report should be added
3. Select HTML report, note that no report is displayed on that page.
4. On the top right side, select ZIP to download a zip file with the html report.
5. Unzip the file and select the report.html file to visualize the report

## Generate Artifacts
* Add Post-build actions to generate artifacts
* Execute test and Verify artifacts generations with each build

### Add Post-build actions to generate artifacts
1. Go to Jenkins project
2. Select Configuration 
3. Scroll down to the end of Post-build Actions
4. Then select Add Post-build Actions
5. In dropdown, select Archive the Artifacts
6. Scroll to the top of Post-build Actions to see the new Post-build Actions added: Archive the Artifacts
7. In the File to archive, choose the report folder.
    1. In my case, it is:
        1. API-test-automation-with-TypeScript/reports/
8. Apply and Save

### Execute test and Verify artifacts generations with each build
1. Go to Jenkins project
2. Select Build now
3. After Build is completed, in the the Build Artifacts will be displayed
4. Artifact is also visible on the jenkins project page as Last Successful Artifacts
5. Select Last Successful Artifacts and then reports
6. You can download all reports in one zip or individual report.
7. Now you can also have artifacts for individual build (test execution) to be downloaded
8. We can also configure how long jenkins should retain these artifacts and jenkins will take care of deleting them.
