// Karma configuration
// Generated on Sun Mar 31 2013 21:59:25 GMT+0200 (CEST)


// base path, that will be used to resolve files and exclude
basePath = '../';


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

  {pattern: 'lib/**/*.js', included: false},

  // Version 1
  {pattern: 'argue.js', included: false},
  {pattern: 'spec/argue.testable.min.js', included: false},
  {pattern: 'spec/ArgueJS1/**/*Spec.js', included: false},

  // Version 2
  {pattern: 'argue2.js', included: false},
  {pattern: 'spec/argue2.testable.min.js', included: false},
  {pattern: 'spec/argue2.testable.production.min.js', included: false},
  {pattern: 'spec/ArgueJS2/**/*-spec.js', included: false},

  // RequireJS-config
  'spec/test-main.js'
];


// list of files to exclude
exclude = [
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'Firefox', 'PhantomJS'];
//browsers = ['Chrome', 'Firefox', 'PhantomJS', 'IE', 'Opera'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
