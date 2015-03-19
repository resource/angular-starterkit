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

const basePath = "../";
const scriptsLibs = config.scripts.libs;
const scriptsSrc = config.scripts.src;
const stylesLibs = config.styles.libs;
const stylesSrc = config.styles.src;
const viewsCopy = config.views.copy;
const viewsCompile = config.views.compile;
const staticSrc = config.static.src;

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task('launch-debug', function () {
    nodemon({
        script: '../debug/server.js',
        ext: 'ejs js',
        ignore: ['**/*'],
    }).on('restart', function () {
        // ...
    });
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task('watch-debug', function () {

    if (configUtils.shouldWatchSection(stylesLibs)) {
        var files = configUtils.watchFilesForSection(stylesLibs);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('styles-src-debug');
        });
    }

    if (configUtils.shouldWatchSection(stylesSrc)) {
        var files = configUtils.watchFilesForSection(stylesSrc);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('styles-src-debug');
        });
    }

    if (configUtils.shouldWatchSection(scriptsSrc)) {
        var files = configUtils.watchFilesForSection(scriptsSrc);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start(['scripts-src-debug', 'views-compile-debug']);
        });
    }

    if (configUtils.shouldWatchSection(scriptsLibs)) {
        var files = configUtils.watchFilesForSection(scriptsLibs);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('scripts-libs-debug');
        });
    }

    if (configUtils.shouldWatchSection(viewsCopy)) {
        var files = configUtils.watchFilesForSection(viewsCopy);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('views-copy-debug');
        });
    }

    if (configUtils.shouldWatchSection(viewsCompile)) {
        var files = configUtils.watchFilesForSection(viewsCompile);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('views-compile-debug');
        });
    }

    if (configUtils.shouldWatchSection(staticSrc)) {
        var files = configUtils.watchFilesForSection(staticSrc);
        watch(configUtils.prefixFiles(files, basePath), function () {
            gulp.start('static-debug');
        });
    }


});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', ['run-build'], function () {
    gulp.start('launch-debug', 'watch-debug');
});