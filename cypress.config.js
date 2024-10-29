const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    API_URL: 'http://localhost:3001'
  },
  e2e: {
    viewportWidth: 1100,
    baseUrl: 'http://localhost:3000'
  }
});
