// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var config = require('./config.json').release;

// ============================================================
// === Constants ==============================================
// ============================================================

var CSS_SRC = 'release-csssrc';
var CSS_LIBS = 'release-csslibs';

var JS_SRC = 'release-jssrc';
var JS_LIBS = 'release-jslibs';

var TEMPLATES = 'release-templates';

var COPY = 'release-copy';

// ============================================================
// === CSS Tasks ==============================================
// ============================================================

gulp.task(CSS_LIBS, function(done) {
	gulp.src(config.css.libs)
		.pipe(concat('libs.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(config.css.dest));
	done();
});

gulp.task(CSS_SRC, function(done) {
	sass(config.css.src)
		.pipe(cssmin())
		.pipe(gulp.dest(config.css.dest));
	done();
});

// ============================================================
// === JS Tasks ===============================================
// ============================================================

gulp.task(JS_LIBS, function(done) {
	gulp.src(config.js.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.js.dest));
	done();
});

gulp.task(JS_SRC, function(done) {
	gulp.src(config.js.src)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.js.dest));
	done();
});

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
// === Macro Task =============================================
// ============================================================

gulp.task('build-release', [CSS_LIBS, CSS_SRC, JS_LIBS, JS_SRC, TEMPLATES, COPY]);