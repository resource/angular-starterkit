var through = require('through2');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var jsStringEscape = require('js-string-escape');
var escapeHtml = require('escape-html');


const PLUGIN_NAME = 'compile-directives';

function compileDirectives() {

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
        }

        if (file.isBuffer()) {

            if (file.path.search("/directives/") > -1) {

                var script = file.contents.toString();
                var moduleName = script.match(/angular\.module\('(.[^']+)/);

                if (moduleName !== null) {

                    var name = moduleName[1];
                    var htmlPath = script.match(/templateUrl:\s+'(.[^']+)'/);

                    if (htmlPath !== null) {

                        htmlPath = htmlPath[1].replace(/\r|\n/, ' ');

                        var html;

                        try {
                            html = fs.readFileSync(file.base + htmlPath, 'utf8');
                        } catch (e) {
                            this.emit('error', new PluginError(PLUGIN_NAME, 'HTML not found for the \'' + name + '\' directive.'));
                        }

                        var cacheStr = "angular.module('" + name + "').run(['$templateCache', function ($templateCache) { $templateCache.put('" + htmlPath + "', '" + jsStringEscape(html) + "');" + " }]);";
                        var htmlBuffer = new Buffer(cacheStr, 'utf8');

                        file.contents = Buffer.concat([file.contents, htmlBuffer]);


                    } else {

                        this.emit('error', new PluginError(PLUGIN_NAME, 'HTML path not specified for the ' + name + ' directive.'));

                    }

                } else {

                    this.emit('error', new PluginError(PLUGIN_NAME, 'Module not defined for directive.'));

                }
            }
        }

        cb(null, file);

    });

};

module.exports = compileDirectives;