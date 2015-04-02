// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var print = require('gulp-print');
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var config = require('../../build-config.js');
var _ = require('underscore');
var fs = require('fs');

// ============================================================
// === Driver Functionality ===================================
// ============================================================

gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

// ============================================================
// === Build Configuration ====================================
// ============================================================

gulp.task('write-protractor-conf', function () {

    // @TODO: Construct standablone driver so that it's dynamic

    var baseConfig = {
        seleniumServerJar: '../node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
        chromeDriver: '../node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',
        directConnect: true
    };

    var combinedConfig = _.extend(config.protractor, baseConfig);

    if (_.isUndefined(combinedConfig.capabilities)) {
        combinedConfig.capabilities = {};
    }

    if (_.isUndefined(combinedConfig.capabilities.browserName)) {
        combinedConfig.capabilities.browserName = "chrome";
    }

    var pre = 'exports.config = ';
    var post = ';'

    var fileStr = pre + JSON.stringify(combinedConfig) + post;

    fs.writeFileSync('protractor.conf.js', fileStr);

});

// ============================================================
// === Run Tests ==============================================
// ============================================================

gulp.task('protractor-start', ['webdriver_update'], function (done) {
    gulp.src(['../tests/e2e/**/*.js']).pipe(protractor({
        configFile: 'protractor.conf.js'
    })).on('error', function (e) {
        console.log(e)
    }).on('end', function () {
        done();
        process.exit();
    });
});

// ============================================================
// === Macro Tasks ============================================
// ============================================================

gulp.task('run-e2e-tests', ['write-protractor-conf','run-debug'], function () {
    gulp.start('protractor-start');
});
