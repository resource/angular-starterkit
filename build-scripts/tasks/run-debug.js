// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var watch = require('gulp-watch');
var _ = require('underscore');
var configUtils = require('../utils/config-utils');
var config = require('../../build-config.js');
var nodemon = require('gulp-nodemon');

// ============================================================
// === Constants ==============================================
// ============================================================

const BASE_PATH = "../";

// ============================================================
// === Variables ==============================================
// ============================================================

var scriptLibraries = config.scripts.libs;
var scriptSources = config.scripts.src;
var styleLibraries = config.styles.libs;
var styleSources = config.styles.src;
var viewsCopy = config.views.copy;
var viewsCompile = config.views.compile;
var staticSources = config.static.src;

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task('launch', function () {
    nodemon({
        script: '../debug/server.js',
        ext: 'ejs js',
        ignore: ['**/*']
    });
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task('watch', function () {

    if (configUtils.shouldWatchSection(styleLibraries)) {
        var files = configUtils.watchFilesForSection(styleLibraries);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('styles-src');
        });
    }

    if (configUtils.shouldWatchSection(styleSources)) {
        var files = configUtils.watchFilesForSection(styleSources);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('styles-src');
        });
    }

    if (configUtils.shouldWatchSection(scriptSources)) {
        var files = configUtils.watchFilesForSection(scriptSources);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start(['scripts-src', 'views-compile']);
        });
    }

    if (configUtils.shouldWatchSection(scriptLibraries)) {
        var files = configUtils.watchFilesForSection(scriptLibraries);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('scripts-libs');
        });
    }

    if (configUtils.shouldWatchSection(viewsCopy)) {
        var files = configUtils.watchFilesForSection(viewsCopy);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('views-copy');
        });
    }

    if (configUtils.shouldWatchSection(viewsCompile)) {
        var files = configUtils.watchFilesForSection(viewsCompile);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('views-compile');
        });
    }

    if (configUtils.shouldWatchSection(staticSources)) {
        var files = configUtils.watchFilesForSection(staticSources);
        watch(configUtils.prefixFiles(files, BASE_PATH), function () {
            gulp.start('static');
        });
    }


});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', ['run-build'], function () {
    gulp.start('launch', 'watch');
});