// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-sass');
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
var rename = require("gulp-rename");
var jshint = require("gulp-jshint");

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

var buildType = argv.buildtype || 'debug';
var outputDir = buildType === 'debug' ? '../debug/' : '../release/';

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs', function () {

    if (configUtils.sectionEmpty(styleLibraries)) {
        return;
    }

    var files = configUtils.prefixFiles(styleLibraries.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(styleLibraries.dest);
    var name = info.filename || 'libs.css';
    var path = info.path || '';

    return gulp.src(files)
        .pipe(gulpif(buildType === 'debug', sourcemaps.init({debug: true})))
        .pipe(concat(name))
        .pipe(gulpif(buildType === 'debug', sourcemaps.write()))
        .pipe(gulpif(buildType === 'release', cssmin()))
        .pipe(gulp.dest(outputDir + path));

});

gulp.task('styles-src', function () {

    if (configUtils.sectionEmpty(styleSources)) {
        return;
    }

    var files = configUtils.prefixFiles(styleSources.files, BASE_PATH);

    gulp.src(files)
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass({sourcemap: buildType === 'debug'}))
        .pipe(gulpif(buildType === 'debug', sourcemaps.write()))
        .pipe(gulp.dest(outputDir + styleSources.dest));

});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task('scripts-libs', function () {
    
    if (configUtils.sectionEmpty(scriptLibraries)) {
        return;
    }

    var files = configUtils.prefixFiles(scriptLibraries.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(scriptLibraries.dest);
    var name = info.filename || 'libs.js';
    var path = info.path || '';
    
    return gulp.src(files)
        .pipe(gulpif(buildType === 'debug', sourcemaps.init({debug: true})))
        .pipe(concat(name))
        .pipe(gulpif(buildType === 'debug', sourcemaps.write()))
        .pipe(gulpif(buildType === 'release', uglify()))
        .pipe(gulp.dest(outputDir + path));
    
});

gulp.task('scripts-src', function () {

    if (configUtils.sectionEmpty(scriptSources)) {
        return;
    }

    var files = configUtils.prefixFiles(scriptSources.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(scriptSources.dest);
    var name = info.filename || 'main.js';
    var path = info.path || '';

    gulp.src(files)
        .pipe(gulpif(buildType === 'debug', sourcemaps.init({debug: true})))
        .pipe(compileDirectives())
        .pipe(concat(name))
        .pipe(gulpif(buildType === 'debug', sourcemaps.write()))
        .pipe(gulpif(buildType === 'release', uglify({mangle: false})))
        .pipe(gulp.dest(outputDir + path));

});

gulp.task('scripts-lint', function () {

    if (configUtils.sectionEmpty(scriptSources)) {
        return;
    }

    var files = configUtils.prefixFiles(scriptSources.files, BASE_PATH);

    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpif(buildType === 'release', jshint.reporter('fail')));

});

// ============================================================
// === Views ==================================================
// ============================================================

gulp.task('views-compile', function () {

    if (configUtils.sectionEmpty(viewsCompile)) {
        console.log('section empty');
        return;
    }

    var files = configUtils.prefixFiles(viewsCompile.files, BASE_PATH);

    var info = configUtils.filenameAndPathFromDest(viewsCompile.dest);

    var name = info.filename || 'templates.js';
    var path = info.path || '';

    return gulp.src(files)
        .pipe(templateCache(name, {
            root: "/views/",
            module: name.split('.')[0],
            standalone: true
        }))
        .pipe(gulpif(buildType === 'release', uglify()))
        .pipe(gulp.dest(outputDir + path));

});

gulp.task('views-copy', function () {

    if (configUtils.sectionEmpty(viewsCopy)) {
        return;
    }

    var files = configUtils.prefixFiles(viewsCopy.files, BASE_PATH);

    return gulp.src(files).pipe(gulp.dest(outputDir + viewsCopy.dest));

});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('static', function () {
    var files = [BASE_PATH + '/source/**/assets/**/*.*', BASE_PATH + '/source/*.!(ejs)*'];
    return gulp.src(files).pipe(gulp.dest(outputDir));
});

// ============================================================
// === EJS Template Compilation ===============================
// ============================================================

gulp.task('ejs', function () {
    return gulp.src([BASE_PATH + '/source/**/*.ejs'])
        .pipe(ejs(_.extend({}, {debug: buildType === 'debug', ext: '.ejs'})))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(outputDir));
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-build', [
    'styles-libs', 'styles-src',
    'scripts-libs', 'scripts-lint', 'scripts-src',
    'ejs', 'views-compile', 'views-copy',
    'static'
]);
