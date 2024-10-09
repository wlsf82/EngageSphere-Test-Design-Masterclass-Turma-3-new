# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.


## Cloning the Project

To clone this project from GitHub, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command:

  ```sh
  git clone https://github.com/your-username/EngageSphere-Test-Design-Masterclass-Turma-3-guilherme-dalbo.git
  ```

4. Navigate into the cloned repository:

  ```sh
  cd EngageSphere-Test-Design-Masterclass-Turma-3-guilherme-dalbo
  ```

You now have a local copy of the project.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads)  `2.42.1` 
- [Node.js](https://nodejs.org/en/)  `v20.11.0` 
- npm  `10.2.4` 

**Note:** When installing Node.js, npm is automatically installed too.

##  Installing and starting the servers

## How to run it

After cloning the repo ...

###  Starting the backend

Open a terminal, go to the root of this repo and:

```sh
cd backend
npm install
npm start
```

The server will be listening on port 3001.

```js
const port = 3001;
```

###  Starting the frontend

Open a new terminal, go to the root of this repo and:

```sh
cd frontend
npm install
npm start
```

#### Running Cypress

Open a Open a new terminal, go to the root of this repo and:

```sh
npm install --save-dev cypress@13.15.0
npm i cypress-plugin-api
npx cypress open
```

___

Made with ❤️ by [Walmyr](https://walmyr.dev).

**Note:**
This codes, except the tests were made by Walmyr, so I will be deleting the parts that redirects to his documents about the lessons we took 
