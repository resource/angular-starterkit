module.exports = function (config) {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    config.basePath=  '../';

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    config.frameworks = ['jasmine'];

    // list of files / patterns to load in the browser
    config.files = [
        'debug/assets/libs/*.js',
        'debug/assets/libs.js',
        'debug/assets/**/*.js',
        'tests/libs/*.js',
        'tests/unit/**/*.spec.js'
    ];

    // list of files to exclude
    config.exclude = [

    ];

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    config.preprocessors = {};

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    config.reporters = ['mocha'];

    // web server port
    config.port = 9876;

    // enable / disable colors in the output (reporters and logs)
    config.colors = true;

    // level of logging
    // possible values: 'OFF' || 'ERROR' || 'WARN' || 'LOG_INFO' || 'DEBUG'
    config.logLevel = 'INFO';

    // enable / disable watching file and executing tests whenever any file changes
    config.autoWatch = false;

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    config.browsers = ['PhantomJS'];

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    config.singleRun = true;

};
