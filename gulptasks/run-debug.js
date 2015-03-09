// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var child_process = require('child_process');
var templateCache = require('gulp-angular-templatecache');
var ngConstant = require('gulp-ng-constant');
var merge = require('merge2');

var config = require('../gulpconfig.json');

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task('styles-libs-debug', function() {
	return gulp.src(config.styles.libs)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('./debug' + config.styles.dest));
});

gulp.task('styles-src-debug', function() {
	return sass(config.styles.src, {
			sourcemap: true
		})
		.on('error', function(err) {
			console.log(err.message);
		})
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./debug' + config.styles.dest));
});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task('scripts-libs-debug', function() {
	return gulp.src(config.scripts.libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./debug' + config.scripts.dest));
});

gulp.task('scripts-src-debug', function() {
	var src = gulp.src(config.scripts.src);
	var appConfig = gulp.src('./source/app/config.json')
		.pipe(ngConstant(config.config.debug));
	return merge(src, appConfig)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./debug' + config.scripts.dest));
});

// ============================================================
// === Templates ==============================================
// ============================================================

gulp.task('templates-compile-debug', function() {
	return gulp.src(config.templates.compile.src)
		.pipe(templateCache('templates.js', {
			module: 'templatescache',
			standalone: true,
			root: 'views/partials'
		}))
		.pipe(gulp.dest('./debug' + config.templates.compile.dest));
});

gulp.task('templates-copy-debug', function() {
	return gulp.src(config.templates.copy.src)
		.pipe(gulp.dest('./debug' + config.templates.copy.dest));
});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task('copy-debug', function() {
	return gulp.src(config.copy.src)
		.pipe(gulp.dest('./debug' + config.copy.dest));
});

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task('launch-debug', function() {
	child_process.spawn('node', ['./debug/server.js'], {
		stdio: 'inherit'
	});
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task('watch-debug', function() {
	gulp.watch(['./source/{favicon.ico,*.html,*.js}', './source/**/{images,videos,fonts}/**/*'], ['copy-debug']);
	gulp.watch(['./source/assets/styles/**/*'], ['styles-src-debug']);
	gulp.watch(['./source/libs/**/*.css'], ['styles-libs-debug']);
	gulp.watch(['./source/app/views/partials/**/*'], ['templates-compile-debug']);
	gulp.watch(['./source/app/**/*.js'], ['scripts-src-debug']);
	gulp.watch(['./source/app/views/*.html'], ['templates-copy-debug']);
	gulp.watch(['./source/app/config.json'], ['scripts-src-debug']);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', [
	'styles-libs-debug', 'styles-src-debug',
	'scripts-libs-debug', 'scripts-src-debug',
	'templates-compile-debug', 'templates-copy-debug',
	'copy-debug'
], function() {
	gulp.start('launch-debug', 'watch-debug');
});