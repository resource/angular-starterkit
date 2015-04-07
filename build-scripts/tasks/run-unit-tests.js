// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var KarmaConfig = require('../../node_modules/karma/lib/config').Config;
var karmaConfig = new KarmaConfig();
require('../../tests/karma.conf.js')(karmaConfig);

gulp.task('karma-start', function (done) {
    process.chdir('../tests/');
    karma.start(karmaConfig, function (exitCode) {
        done();
    });
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-unit-tests', ['run-build'], function () {
    gulp.start('karma-start');
});