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

## How to run Cypress tests

To run cypress tests, you will need to start:
- backend & frontend running locally
```
cd backend && npm start
cd frontend && npm start
```
- cypress tests
```
npx cypress open

or

headless mode
npx cypress run
```

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
