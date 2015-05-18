// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var print = require('gulp-print');
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
var _ = require('underscore');
var fs = require('fs');

// ============================================================
// === Driver Functionality ===================================
// ============================================================

gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver_standalone', webdriver_standalone);

// ============================================================
// === Run Tests ==============================================
// ============================================================

gulp.task('protractor-start', ['webdriver_update'], function (done) {
    gulp.src(['../tests/e2e/**/*.js']).pipe(protractor({
        configFile: '../tests/protractor.conf.js'
    })).on('error', function (e) {
        console.log(e);
    }).on('end', function () {
        done();
        process.exit();
    });
});

// ============================================================
// === Macro Tasks ============================================
// ============================================================

gulp.task('run-e2e-tests', ['run-debug'], function () {
    gulp.start('protractor-start');
});
