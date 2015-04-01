// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var _ = require('underscore');
var configUtils = require('../utils/config-utils');
var compileDirectives = require('../plugins/compile-directives');
var ejs = require('../plugins/compile-ejs');
var config = require('../../build-config.js');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var print = require('gulp-print');

// ============================================================
// === Constants ==============================================
// ============================================================

const BUILDTYPE_DEBUG = 'debug';
const BASE_PATH = "../";
const DEBUG_DESTINATION = "../debug/";
const RELEASE_DESTINATION = "../release/";

// ============================================================
// === Variables ==============================================
// ============================================================

var scriptLibraries = config.scripts.libs;
var scriptSources = config.scripts.src;
var styleLibraries = config.styles.libs;
var styleSources = config.styles.src;
var viewsCopy = config.views.copy;
var viewsCompile = config.views.compile;

var buildType = argv.buildtype || BUILDTYPE_DEBUG;
var isDebug = buildType === BUILDTYPE_DEBUG;
var outputDir = isDebug ? DEBUG_DESTINATION : RELEASE_DESTINATION;

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs', function () {

    if (configUtils.sectionEmpty(styleLibraries)) return;

    var files = configUtils.prefixFiles(styleLibraries.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(styleLibraries.dest);
    var name = info.filename || 'libs.css';
    var path = info.path || '';

    return gulp.src(files)
        .pipe(gulpif(isDebug, sourcemaps.init()))
        .pipe(concat(name))
        .pipe(gulpif(isDebug, sourcemaps.write()))
        .pipe(gulpif(!isDebug, cssmin()))
        .pipe(gulp.dest(outputDir + path));

});

gulp.task('styles-src', function () {

    if (configUtils.sectionEmpty(styleSources)) return;

    var files = configUtils.prefixFiles(styleSources.files, BASE_PATH);

    return sass(files, {sourcemap: isDebug})
        .pipe(gulpif(isDebug, sourcemaps.write()))
        .pipe(gulpif(!isDebug, cssmin()))
        .pipe(gulp.dest(outputDir + styleSources.dest));

});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task('scripts-libs', function () {
    
    if (configUtils.sectionEmpty(scriptLibraries)) return;

    var files = configUtils.prefixFiles(scriptLibraries.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(scriptLibraries.dest);
    var name = info.filename || 'libs.js';
    var path = info.path || '';
    
    return gulp.src(files)
        .pipe(gulpif(isDebug,sourcemaps.init()))
        .pipe(concat(name))
        .pipe(gulpif(isDebug,sourcemaps.write()))
        .pipe(gulpif(!isDebug,uglify()))
        .pipe(gulp.dest(outputDir + path));
    
});

gulp.task('scripts-src', function () {

    if (configUtils.sectionEmpty(scriptSources)) return;

    var files = configUtils.prefixFiles(scriptSources.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(scriptSources.dest);
    var name = info.filename || 'main.js';
    var path = info.path || '';

    gulp.src(files)
        .pipe(gulpif(isDebug,sourcemaps.init()))
        .pipe(compileDirectives())
        .pipe(concat(name))
        .pipe(gulpif(isDebug,sourcemaps.write()))
        .pipe(gulpif(!isDebug,uglify()))
        .pipe(gulp.dest(outputDir + path));

});

// ============================================================
// === Views ==================================================
// ============================================================

gulp.task('views-compile', function () {

    if (configUtils.sectionEmpty(viewsCompile)) return;

    var files = configUtils.prefixFiles(viewsCompile.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(viewsCompile.dest);

    var name = info.filename || 'templates.js';
    var path = info.path || '';

    return gulp.src(files)
        .pipe(templateCache(name, {
            root: "/views/templates/",
            module: name.split('.')[0],
            standalone: true
        }))
        .pipe(gulpif(!isDebug,uglify()))
        .pipe(gulp.dest(outputDir + path));

});

gulp.task('views-copy', function () {

    if (configUtils.sectionEmpty(viewsCopy)) return;

    var files = configUtils.prefixFiles(viewsCopy.files, BASE_PATH);

    return gulp.src(files)
        .pipe(gulp.dest(outputDir + viewsCopy.dest));

});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('static', function () {

    var files = [BASE_PATH + '/source/**/assets/**/*.*',BASE_PATH + '/source/*.*'];

    return gulp.src(files)
        .pipe(ejs({debug: isDebug}))
        .pipe(gulp.dest(outputDir));

});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-build', [
    'styles-libs', 'styles-src',
    'scripts-libs', 'scripts-src',
    'views-compile', 'views-copy',
    'static'
]);
