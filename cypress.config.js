const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
      grepFilterSpecs: true,
      baseUrl: 'http://localhost:3001/'
    },
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
