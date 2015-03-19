// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var _ = require('underscore');
var karmaConfig = require('../../build-config.js').karma;
var configUtils = require('../utils/config-utils');
var config = require('../../build-config.js');

// ============================================================
// === Constants ==============================================
// ============================================================

const BASE_PATH = "../debug/";

// ============================================================
// === Variables ==============================================
// ============================================================

var scriptLibraries = config.scripts.libs;
var scriptSources = config.scripts.src;
var viewsCompile = config.views.compile;

// ============================================================
// === Testing Tasks ==========================================
// ============================================================

var files = [];

if(!configUtils.sectionEmpty(scriptLibraries)) {
    var info = configUtils.filenameAndPathFromDest(scriptLibraries.dest);
    var path = info.path;
    var name = info.filename || 'libs.js';
    files.push(BASE_PATH + path + '/' + name);
}

if(!configUtils.sectionEmpty(viewsCompile)) {
    var info = configUtils.filenameAndPathFromDest(viewsCompile.dest);
    var path = info.path;
    var name = info.filename || 'templates.js';
    files.push(BASE_PATH + path + '/' + name);
}

if(!configUtils.sectionEmpty(scriptSources)) {
    var info = configUtils.filenameAndPathFromDest(scriptSources.dest);
    var path = info.path;
    var name = info.filename || 'main.js';
    files.push(BASE_PATH + path + '/' + name);
}

karmaConfig.files = _.union(files,[
    '../tests/libs/**/*.js',
    '../tests/specs/**/*.js'
]);

gulp.task('karma-start', function (done) {
    karma.start(karmaConfig, done);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-tests', ['run-build'], function () {
    gulp.start('karma-start');
});