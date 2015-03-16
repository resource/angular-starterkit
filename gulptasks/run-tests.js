var gulp = require('gulp');
var karma = require('karma').server;
var _ = require('underscore');
var debug = require('gulp-debug');
var config = require('../karma.conf');

// ============================================================
// === Testing Tasks ==========================================
// ============================================================

var karmaConfig = {};

config({set:function(conf){
    karmaConfig = conf;
}});

gulp.task('karma-start', function(done) {
    karma.start(karmaConfig, done);
});

// ============================================================
// === Macro Task =============================================
// ============================================================

gulp.task('run-tests', ['karma-start']);