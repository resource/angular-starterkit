exports.config = {
    seleniumServerJar: '../node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    chromeDriver: '../node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',
    directConnect: true,

    capabilities: {
        browserName: 'chrome' // defaults to chrome
    },
    params: {},
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
}