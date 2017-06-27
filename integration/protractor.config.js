exports.config = {
  allScriptsTimeout: 100000,
  specs: [
    './e2e/**/*.e2e-spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  getPageTimeout: 100000
};
