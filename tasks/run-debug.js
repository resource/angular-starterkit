// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var child_process = require('child_process');
var _ = require('underscore');

var config = require('./config.json').debug;

// ============================================================
// === Constants ==============================================
// ============================================================

var CSS = 'css';
var CSS_SRC = 'csssrc';
var CSS_LIBS = 'csslibs';

var JS = 'js';
var JS_SRC = 'jssrc';
var JS_LIBS = 'jslibs';

var TEMPLATES = 'templates';

var COPY = 'copy';
var WATCH = 'watch';
var LAUNCH = 'launch';

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task(CSS_LIBS, function(done) {
	gulp.src(config.css.libs)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(config.css.dest));
	done();
});

gulp.task(CSS_SRC, function(done) {
	sass(config.css.src, {
			sourcemap: true
		}).pipe(sourcemaps.write())
		.pipe(gulp.dest(config.css.dest));
	done();
});

gulp.task(CSS, [CSS_LIBS, CSS_SRC]);

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task(JS_LIBS, function(done) {
	gulp.src(config.js.libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(config.js.dest));
	done();
});

gulp.task(JS_SRC, function(done) {
	gulp.src(config.js.src)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.js.dest));
	done();
});

gulp.task(JS, [JS_LIBS, JS_SRC]);

// ============================================================
// === Templates ==============================================
// ============================================================

gulp.task(TEMPLATES, function(done) {
	gulp.src(config.templates.src).pipe(gulp.dest(config.templates.dest));
	done();
});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task(COPY, function(done) {
	gulp.src(config.copy.src)
		.pipe(gulp.dest(config.copy.dest));
	done();
});

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task(LAUNCH, function(done) {
	child_process.spawn('node', ["./debug/server.js"]);
	done();
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task(WATCH, function() {
	gulp.watch(['./source/**/*','!./source/app','!./source/app/assets/styles'], [COPY]);
	gulp.watch(['./source/assets/styles/**/*'], [CSS_SRC]);
	gulp.watch(["./source/app/**/*.js"], [JS_SRC]);
	gulp.watch(["./source/app/**/*.html"], [TEMPLATES]);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', [CSS, JS, TEMPLATES, COPY, LAUNCH, WATCH]);