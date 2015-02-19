// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var _ = require('underscore');
var config = require('../gulpconfig.json');

// ============================================================
// === Testing Tasks ==========================================
// ============================================================

gulp.task('karma-concat', function(done) {
	gulp.src(config.karma.files)
		.pipe(concat('temp.js'))
		.pipe(gulp.dest('./tests/'));
	done();
});

gulp.task('karma-start', function(done) {
	karma.start(_.extend({
		files: ['./temp.js']
	}, config.karma), done);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-tests', ['karma-concat', 'karma-start']);