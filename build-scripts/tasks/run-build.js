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

// ============================================================
// === Constants ==============================================
// ============================================================

const BUILDTYPE_RELEASE = 'release';
const BUILDTYPE_DEBUG = 'debug';
const BASE_PATH = "../";
const DEBUG_DESTINATION = "../debug/";
const RELEASE_DESTINATION = "../release/";
const SCRIPT_LIBRARIES = config.scripts.libs;
const SCRIPT_SOURCE = config.scripts.src;
const STYLE_LIBRARIES = config.styles.libs;
const STYLES_SOURCE = config.styles.src;
const VIEWS_COPY = config.views.copy;
const VIEWS_COMPILE = config.views.compile;
const STATIC_SOURCE = config.static.src;


var buildType = BUILDTYPE_RELEASE;

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs', function () {

    if (configUtils.sectionEmpty(STYLE_LIBRARIES)) return;

    var files = configUtils.prefixFiles(STYLE_LIBRARIES.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(STYLE_LIBRARIES.dest);
    var name = info.filename || 'libs.css';
    var path = info.path || '';

    if (buildType = BUILDTYPE_DEBUG) {
        return gulp.src(files).pipe(concat(name)).pipe(gulp.dest(DEBUG_DESTINATION + path));
    }

    return gulp.src(files).pipe(concat(name)).pipe(cssmin()).pipe(gulp.dest(RELEASE_DESTINATION + path));

});

gulp.task('styles-src', function () {

    if (configUtils.sectionEmpty(STYLES_SOURCE)) return;
    var files = configUtils.prefixFiles(STYLES_SOURCE.files, BASE_PATH);

    if (buildType = BUILDTYPE_DEBUG) {
        return sass(files, {sourcemap: true}).pipe(sourcemaps.write()).pipe(gulp.dest(DEBUG_DESTINATION + STYLES_SOURCE.dest));
    }
    
    return sass(files, {sourcemap: true}).pipe(cssmin()).pipe(gulp.dest(RELEASE_DESTINATION + STYLES_SOURCE.dest));

});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task('scripts-libs', function () {
    
    if (configUtils.sectionEmpty(SCRIPT_LIBRARIES)) return;

    var files = configUtils.prefixFiles(SCRIPT_LIBRARIES.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(SCRIPT_LIBRARIES.dest);
    var name = info.filename || 'libs.js';
    var path = info.path || '';
    
    if (buildType = BUILDTYPE_DEBUG) {
        return gulp.src(files).pipe(concat(name)).pipe(gulp.dest(DEBUG_DESTINATION + path));
    }
    
    return gulp.src(files).pipe(concat(name)).pipe(uglify()).pipe(gulp.dest(RELEASE_DESTINATION + path));
    
});

gulp.task('scripts-src', function () {

    if (configUtils.sectionEmpty(SCRIPT_SOURCE)) return;


    var files = configUtils.prefixFiles(SCRIPT_SOURCE.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(SCRIPT_SOURCE.dest);
    var name = info.filename || 'main.js';
    var path = info.path || '';

    if (buildType = BUILDTYPE_DEBUG) {
        gulp.src(files).pipe(compileDirectives()).pipe(concat(name)).pipe(gulp.dest(DEBUG_DESTINATION + path));
    }
    gulp.src(files).pipe(compileDirectives()).pipe(concat(name)).pipe(uglify()).pipe(gulp.dest(RELEASE_DESTINATION + path));

});

// ============================================================
// === Views ==================================================
// ============================================================

gulp.task('views-compile', function () {

    if (configUtils.sectionEmpty(VIEWS_COMPILE)) return;

    var files = configUtils.prefixFiles(VIEWS_COMPILE.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(VIEWS_COMPILE.dest);

    var name = info.filename || 'templates.js';
    var path = info.path || '';


    if (buildType = BUILDTYPE_DEBUG) {
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
    if (configUtils.sectionEmpty(VIEWS_COPY)) return;
    var files = configUtils.prefixFiles(VIEWS_COPY.files, BASE_PATH);

    if (buildType = BUILDTYPE_DEBUG) {
        return gulp.src(files).pipe(gulp.dest(DEBUG_DESTINATION + VIEWS_COPY.dest));
    }

    return gulp.src(files).pipe(gulp.dest(RELEASE_DESTINATION + VIEWS_COPY.dest));

});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('static', function () {
    if (configUtils.sectionEmpty(STATIC_SOURCE)) return;
    var files = configUtils.prefixFiles(STATIC_SOURCE.files, BASE_PATH);

    if (buildType = BUILDTYPE_DEBUG) {
        return gulp.src(files).pipe(gulp.dest(DEBUG_DESTINATION + STATIC_SOURCE.dest));
    }

    return gulp.src(files).pipe(gulp.dest(RELEASE_DESTINATION + STATIC_SOURCE.dest));

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
