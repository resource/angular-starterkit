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

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task('launch', function () {

    var options = {
        script: '../debug/server.js',
        ext: 'ejs js',
        ignore: ['**/*'],
        stdout: true
    };

    nodemon(options);
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task('watch', function () {

    // styles

    if (configUtils.shouldWatchSection(styleLibraries)) {
        var styleLibFiles = configUtils.watchFilesForSection(styleLibraries);
        watch(configUtils.prefixFiles(styleLibFiles, BASE_PATH), function () {
            gulp.start('styles-src');
        });
    }

    if (configUtils.shouldWatchSection(styleSources)) {
        var styleSourceFiles = configUtils.watchFilesForSection(styleSources);
        watch(configUtils.prefixFiles(styleSourceFiles, BASE_PATH), function () {
            gulp.start('styles-src');
        });
    }

    // scripts

    if (configUtils.shouldWatchSection(scriptSources)) {
        var scriptSourceFiles = configUtils.watchFilesForSection(scriptSources);
        watch(configUtils.prefixFiles(scriptSourceFiles, BASE_PATH), function () {
            gulp.start(['scripts-lint', 'scripts-src', 'views-compile']);
        });
    }

    if (configUtils.shouldWatchSection(scriptLibraries)) {
        var scriptLibFiles = configUtils.watchFilesForSection(scriptLibraries);
        watch(configUtils.prefixFiles(scriptLibFiles, BASE_PATH), function () {
            gulp.start('scripts-libs');
        });
    }

    // views

    if (configUtils.shouldWatchSection(viewsCopy)) {
        var viewsCopySource = configUtils.watchFilesForSection(viewsCopy);
        watch(configUtils.prefixFiles(viewsCopySource, BASE_PATH), function () {
            gulp.start('views-copy');
        });
    }

    if (configUtils.shouldWatchSection(viewsCompile)) {
        var viewsCompileSource = configUtils.watchFilesForSection(viewsCompile);
        watch(configUtils.prefixFiles(viewsCompileSource, BASE_PATH), function () {
            gulp.start('views-compile');
        });
    }

    // assets (static files)

    var assetFiles = [BASE_PATH + 'source/**/assets/**/*.*', BASE_PATH + 'source/*.!(ejs)*'];

    console.log(assetFiles);

    watch(assetFiles, function () {
        gulp.start('static');
    });

    // index file

    var indexFile = [BASE_PATH + '/source/*.ejs'];
    watch(indexFile, function () {
        gulp.start('ejs');
    });

});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', ['run-build'], function () {
    gulp.start('launch', 'watch');
});