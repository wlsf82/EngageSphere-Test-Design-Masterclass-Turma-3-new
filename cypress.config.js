const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
