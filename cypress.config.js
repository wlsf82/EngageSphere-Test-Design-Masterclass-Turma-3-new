const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    API_URL: 'http://localhost:3001',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.js'
  },
});
