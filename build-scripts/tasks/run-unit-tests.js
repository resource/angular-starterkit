// ============================================================
// === Required ===============================================
// ============================================================

var gulp = require('gulp');
var karma = require('karma').server;
var KarmaConfig = require('../../node_modules/karma/lib/config').Config;
var karmaConfig = new KarmaConfig();
require('../../tests/karma.conf.js')(karmaConfig);

gulp.task('karma-start', function (done) {
    karma.start(karmaConfig, function () {
        done();
    });
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-unit-tests', ['run-build'], function () {
    gulp.start('karma-start');
});