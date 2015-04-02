// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var _ = require('underscore');
var configUtils = require('../utils/config-utils');
var config = require('../../build-config.js').protractor;
var protractor = require("gulp-protractor").protractor;
var print = require('gulp-print');

gulp.task('protractor-start', function () {

    gulp.src(['../tests/e2e/**/*.js'])
        .pipe(print())
        .pipe(protractor({
            configFile: "./protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:3000']
        })).on('error', function (e) {
            throw e;
        });

});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-e2e-tests', ['run-debug'], function () {
    gulp.start('protractor-start');
});