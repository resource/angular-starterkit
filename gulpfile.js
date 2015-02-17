var gulp = require('gulp');
var karma = require('gulp-karma');
var concat = require('gulp-concat');

require('require-dir')('./gulptasks');

var testFiles = [
	'tests/libs/angular.js',
	'tests/libs/angular-mocks.js',
	'source/libs/**/*.js',
	'source/app/app.js',
	'source/app/**/*.js',
	'tests/specs/**/*.js'
];

gulp.task('default', function() {
	gulp.src(testFiles)
		.pipe(concat('temp.js'))
		.pipe(gulp.dest('tests/'))
		.pipe(karma({
			configFile: 'karma.conf.js'//,
			//action: 'watch'
		}));
});