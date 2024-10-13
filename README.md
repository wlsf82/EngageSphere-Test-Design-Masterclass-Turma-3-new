# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.16.0` while writing this doc)
- npm (I've used version `10.8.3` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

To execute the tests on the first time you need install the dev dependencies:

```bash
npm install
```

When the installation was completed you can execute the tests using the following commands:

```bash
npm run test
```

### Custom Commands

This repository includes custom commands to facilitate running tests in different scenarios:

### Open Cypress Launchpad Command

To open Cypress Launchpad with the default configuration:

``` bash
npm run cy:open
```

### Open Cypress Launchpad in Mobile Size

To simulate a mobile environment when opening Cypress Launchpad:

``` bash
npm run cy:open:mobile
```

### Run Tests in Specific Browsers

To run tests in specific browsers, use the commands below. Ensure that the desired browser is installed on your machine.

**Chrome**:

``` bash
npm run test:chrome
```

**Electron**:

``` bash
npm run test:electron
```

**Firefox**:

``` bash
npm run test:firefox
```

### Run Tests Simulating Mobile Screens

To run tests simulating a mobile environment:

``` bash
npm run test:mobile
```

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
