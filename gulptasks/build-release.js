// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var ngConstant = require('gulp-ng-constant');
var merge = require('merge2');

var config = require('../gulpconfig.json');

// ============================================================
// === Cleanup ================================================
// ============================================================

gulp.task('clean-release', function(done) {
	del(['./release' + '/*'], done);
});

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs-release', function() {
	return gulp.src(config.styles.libs)
		.pipe(concat('libs.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./release' + config.styles.dest));
});

gulp.task('styles-src-release', function() {
	return sass(config.styles.src)
		.pipe(cssmin())
		.pipe(gulp.dest('./release' + config.styles.dest));
});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task('scripts-libs-release', function() {
	return gulp.src(config.scripts.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release' + config.scripts.dest));
});

gulp.task('scripts-src-release', function() {
	var src = gulp.src(config.scripts.src);
	var appConfig = gulp.src('./source/app/config.json')
		.pipe(ngConstant(config.config.debug));
	return merge(src, appConfig)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release' + config.scripts.dest));
});

// ============================================================
// === Templates ==============================================
// ============================================================

gulp.task('templates-compile-release', function() {
	return gulp.src(config.templates.compile.src)
		.pipe(templateCache('templates.js', {
			module: 'templatescache',
			standalone: true,
			root: 'views/partials'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./release' + config.templates.compile.dest));
});

gulp.task('templates-copy-release', function() {
	return gulp.src(config.templates.copy.src)
		.pipe(gulp.dest('./release' + config.templates.copy.dest));
});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('copy-release', function() {
	return gulp.src(config.copy.src)
		.pipe(gulp.dest('./release' + config.copy.dest));
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('build-release', ['clean-release'], function() {
	gulp.start(
		'styles-libs-release', 'styles-src-release', // styles
		'scripts-libs-release', 'scripts-src-release', // scripts
		'templates-compile-release', 'templates-copy-release', // templates
		'copy-release' // copy
	);
});