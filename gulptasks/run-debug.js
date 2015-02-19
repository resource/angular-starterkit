// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var child_process = require('child_process');
var watch = require('gulp-watch');

var config = require('../gulpconfig.json');

// ============================================================
// === Constants ==============================================
// ============================================================

var CSS_DEBUG = 'css-debug';
var CSS_SRC = 'css-src-debug';
var CSS_LIBS = 'css-libs-debug';
var JS_DEBUG = 'js-debug';
var JS_SRC = 'js-src-debug';
var JS_LIBS = 'js-libs-debug';
var TEMPLATES = 'templates-debug';
var COPY = 'copy-debug';
var WATCH = 'watch-debug';
var LAUNCH = 'launch-debug';
var DEBUG_DEST = './debug';

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task(CSS_LIBS, function(done) {
	gulp.src(config.css.libs)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(DEBUG_DEST + config.css.dest));
	done();
});

gulp.task(CSS_SRC, function(done) {
	sass(config.css.src, {
			sourcemap: true
		}).pipe(sourcemaps.write())
		.pipe(gulp.dest(DEBUG_DEST + config.css.dest));
	done();
});

gulp.task(CSS_DEBUG, [CSS_LIBS, CSS_SRC]);

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task(JS_LIBS, function(done) {
	gulp.src(config.js.libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(DEBUG_DEST + config.js.dest));
	done();
});

gulp.task(JS_SRC, function(done) {
	gulp.src(config.js.src)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(DEBUG_DEST + config.js.dest));
	done();
});

gulp.task(JS_DEBUG, [JS_LIBS, JS_SRC]);

// ============================================================
// === Templates ==============================================
// ============================================================

gulp.task(TEMPLATES, function(done) {
	gulp.src(config.templates.src).pipe(gulp.dest(DEBUG_DEST + config.templates.dest));
	done();
});

// ============================================================
// === Static Files ===========================================
// ============================================================

gulp.task(COPY, function(done) {
	gulp.src(config.copy.src)
		.pipe(gulp.dest(DEBUG_DEST + config.copy.dest));
	done();
});

// ============================================================
// === Launch =================================================
// ============================================================

gulp.task(LAUNCH, function(done) {
	child_process.spawn('node', ['./debug/server.js']);
	done();
});

// ============================================================
// === Watch ==================================================
// ============================================================

gulp.task(WATCH, function() {
	gulp.watch(['./source/**/*', '!./source/app', '!./source/app/assets/styles'], [COPY]);
	gulp.watch(['./source/assets/styles/**/*'], [CSS_SRC]);
	gulp.watch(['./source/app/**/*.js'], [JS_SRC]);
	gulp.watch(['./source/app/views/*.html'], [TEMPLATES]);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-debug', [CSS_DEBUG, JS_DEBUG, TEMPLATES, COPY, LAUNCH, WATCH]);