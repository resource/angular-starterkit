// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var karmaConfig = {};
require('../../tests/karma.conf.js')(karmaConfig);

gulp.task('karma-start', function (done) {
    process.chdir('../tests/');
    karma.start(karmaConfig, done);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-unit-tests', ['run-build'], function () {
    gulp.start('karma-start');
});