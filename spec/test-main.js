var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return (
        (/Spec\.js$/).test(file) ||
        (/-spec\.js$/).test(file)
    );
});

if (typeof(ARGUEJS_EXPORT_INTERNALS) === "undefined") { ARGUEJS_EXPORT_INTERNALS = true; }
if (typeof(ARGUEJS_PRODUCTION_READY) === "undefined") { ARGUEJS_PRODUCTION_READY = false; }

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
      'chai':                           'lib/chai',

      'argue':                          'argue',
      'argue.testable.min':             'spec/argue.testable.min',

      'argue2':                         'argue2',
      'argue2.testable.min':            'spec/argue2.testable.min',
      'argue2.testable.production.min': 'spec/argue2.testable.production.min'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
