const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    API_URL: 'http://localhost:3001',
    BASE_URL: 'http://localhost:3000'
  },
  e2e: {}
});
