// ============================================================
// === Imports ================================================
// ============================================================

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var sass = require("gulp-ruby-sass");
var watch = require("gulp-watch");
var concat = require('gulp-concat');
var uglifyJS = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('underscore');
var browsersync = require('browser-sync');

// ============================================================
// === Build Variables ========================================
// ============================================================

var debugging = false;
var outputDir = './debug';

// ============================================================
// === Helper Tasks ===========================================
// ============================================================

gulp.task('env', function() {
	if (_.contains(process.argv, 'build-release')) {
		debugging = false;
		outputDir = './release';
	}
});

gulp.task('css-source', function() {

	var stream = sass('./source/assets/styles/main.scss', {
		sourcemap: debugging ? true : false
	}).on('error', function(err) {
		console.log(err.message);
	});

	if (debugging) {
		stream = stream.pipe(sourcemaps.write());
	} else {
		stream = stream.pipe(minifyCSS());
	}

	return stream.pipe(gulp.dest(outputDir + '/assets/'));
});

gulp.task("css-libs", function() {
	var stream = gulp.src(["./source/libs/bootstrap.css"]).pipe(concat('libs.css'));
	if (!debugging) stream = stream.pipe(minifyCSS());
	return stream.pipe(gulp.dest(outputDir + '/assets/'));
});

gulp.task('css', ['css-libs', 'css-source']);

gulp.task("js-libs", function() {
	var stream = gulp.src([
		'./source/libs/jquery*.js',
		'./source/libs/bootstrap*.js',
		'./source/libs/angular*.js',
		'underscore*.js'
	]).pipe(concat('libs.js'));
	if (!debugging) stream = stream.pipe(uglifyJS());
	return stream.pipe(gulp.dest(outputDir + '/assets/'));
});

gulp.task('js-source', function() {
	var stream = gulp.src('./source/app/**/*.js').pipe(concat('main.js'));
	if (!debugging) stream = stream.pipe(uglifyJS());
	return stream.pipe(gulp.dest(outputDir + '/assets/'));
});

gulp.task('js', ['js-libs', 'js-source']);

gulp.task('copy', function() {
	gulp.src([
		'./source/**',
		'!./source/{app,app/**/*,libs,libs/**/*,tests,tests/**/*,assets/styles,assets/styles/**/*}'
	]).pipe(gulp.dest(outputDir));
});

gulp.task('sync', function() {
	browsersync({
		server: {
			baseDir: './debug/'
		},
		notify: false
	});
});

gulp.task('watch', function() {
	gulp.watch(['./source/libs/**/*.css'], ['css-libs', browsersync.reload]);
	gulp.watch(['./source/assets/styles/**/*.scss'], ['css-source', browsersync.reload]);
	gulp.watch(['./source/libs/**/*.js'], ['js-libs', browsersync.reload]);
	gulp.watch(['./source/app/**/*.js'], ['js-source', browsersync.reload]);
});

// ============================================================
// === Macro Tasks ============================================
// ============================================================

gulp.task('run-debug', ['env', 'css', 'js', 'copy', 'watch', 'sync']);
gulp.task('run-inspect', ['env']);
gulp.task('build-release', ['env', 'css', 'js', 'copy']);
