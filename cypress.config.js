const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    baseUrl: 'http://attorney-share-web1-qa2.us-west-1.elasticbeanstalk.com/',
    requestTimeout: 10000
  },
});
