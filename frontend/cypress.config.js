const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: "cypress/e2e/**/*.spec.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});