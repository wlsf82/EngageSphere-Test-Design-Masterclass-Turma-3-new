const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    API_URL: 'http://localhost:3001',
  },
  e2e: {
      baseUrl: 'http://localhost:3000/',
      experimentalRunAllSpecs: true
  },
});
