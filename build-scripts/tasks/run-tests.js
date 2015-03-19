var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var _ = require('underscore');

var karmaConfig = require('../../build-config.js').karma;
var configUtils = require('../utils/config-utils');

// ============================================================
// === Testing Tasks ==========================================
// ============================================================

karmaConfig.files = [
    '../debug/assets/libs.js',
    '../debug/assets/templates.js',
    '../debug/assets/main.js',
    '../tests/libs/**/*.js',
    '../tests/specs/**/*.js'
];
//karmaConfig.base

gulp.task('karma-start', function (done) {
    karma.start(karmaConfig, done);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-tests', ['run-build'], function () {
    gulp.start('karma-start');
});