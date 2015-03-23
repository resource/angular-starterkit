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
var config = require('../../build-config.js');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;

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
var staticSources = config.static.src;

var buildType = argv.buildtype || BUILDTYPE_DEBUG;

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs', function () {

    if (configUtils.sectionEmpty(styleLibraries)) return;

    var files = configUtils.prefixFiles(styleLibraries.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(styleLibraries.dest);
    var name = info.filename || 'libs.css';
    var path = info.path || '';

    if (buildType === BUILDTYPE_DEBUG) {
        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(concat(name))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DEBUG_DESTINATION + path));
    }

    return gulp.src(files)
        .pipe(concat(name))
        .pipe(cssmin())
        .pipe(gulp.dest(RELEASE_DESTINATION + path));

});

gulp.task('styles-src', function () {

    if (configUtils.sectionEmpty(styleSources)) return;
    var files = configUtils.prefixFiles(styleSources.files, BASE_PATH);

    if (buildType === BUILDTYPE_DEBUG) {
        return sass(files, {sourcemap: true})
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DEBUG_DESTINATION + styleSources.dest));
    }
    
    return sass(files, {sourcemap: true})
        .pipe(cssmin())
        .pipe(gulp.dest(RELEASE_DESTINATION + styleSources.dest));

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
    
    if (buildType === BUILDTYPE_DEBUG) {
        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(concat(name))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DEBUG_DESTINATION + path));
    }
    
    return gulp.src(files)
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulp.dest(RELEASE_DESTINATION + path));
    
});

gulp.task('scripts-src', function () {

    if (configUtils.sectionEmpty(scriptSources)) return;


    var files = configUtils.prefixFiles(scriptSources.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(scriptSources.dest);
    var name = info.filename || 'main.js';
    var path = info.path || '';

    if (buildType === BUILDTYPE_DEBUG) {
        gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(compileDirectives())
        .pipe(concat(name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEBUG_DESTINATION + path));
    }

    gulp.src(files)
    .pipe(compileDirectives())
    .pipe(concat(name))
    .pipe(uglify())
    .pipe(gulp.dest(RELEASE_DESTINATION + path));

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


    if (buildType === BUILDTYPE_DEBUG) {
        return gulp.src(files)
            .pipe(templateCache(name, {module: name.split('.')[0], standalone: true}))
            .pipe(gulp.dest(DEBUG_DESTINATION + path));
    }

    return gulp.src(files)
        .pipe(templateCache(name, {module: name.split('.')[0], standalone: true}))
        .pipe(uglify())
        .pipe(gulp.dest(RELEASE_DESTINATION + path));


});

gulp.task('views-copy', function () {
    if (configUtils.sectionEmpty(viewsCopy)) return;
    var files = configUtils.prefixFiles(viewsCopy.files, BASE_PATH);

    if (buildType === BUILDTYPE_DEBUG) {
        return gulp.src(files)
            .pipe(gulp.dest(DEBUG_DESTINATION + viewsCopy.dest));
    }

    return gulp.src(files)
        .pipe(gulp.dest(RELEASE_DESTINATION + viewsCopy.dest));

});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('static', function () {
    if (configUtils.sectionEmpty(staticSources)) return;
    var files = configUtils.prefixFiles(staticSources.files, BASE_PATH);

    if (buildType === BUILDTYPE_DEBUG) {
        return gulp.src(files)
            .pipe(gulp.dest(DEBUG_DESTINATION + staticSources.dest));
    }

    return gulp.src(files)
        .pipe(gulp.dest(RELEASE_DESTINATION + staticSources.dest));

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
