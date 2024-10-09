const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);

      //Config select environment
      const environment = config.env.configEnv || 'ui'
      if(environment === 'ui' || environment === 'UI'){
        config.env.baseUrl = process.env.BASEURL_GUI
      } else if (environment === 'api' ||  environment === 'API'){
        config.env.baseUrl = process.env.BASEURL_API
      }
      
      return config;
    },
  },
});
