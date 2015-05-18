var through = require('through2');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var jsStringEscape = require('js-string-escape');
var _ = require('underscore');

const PLUGIN_NAME = 'compile-directives';

module.exports = function() {

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
        }

        if (file.isBuffer()) {

            if (file.path.search("/directives/") > -1) {

                var script = file.contents.toString();
                var moduleName = script.match(/angular\.module\s*\(\s*['"](.[^'"]+)/);
                var name = moduleName[1];
                var htmlPaths = script.match(/templateUrl\s*:\s*['"](.[^'"]+)['"]/g);

                //console.log(htmlPaths);

                _.each(htmlPaths, function (htmlPath) {

                    htmlPath = htmlPath.match(/templateUrl\s*:\s*['"](.[^'"]+)['"]/)[1];

                    if (htmlPath !== null) {

                        htmlPath.replace(/\r|\n/, ' ');

                        var html;

                        try {

                            html = fs.readFileSync(file.base + htmlPath, 'utf8');
                        } catch (e) {
                            this.emit('error', new PluginError(PLUGIN_NAME, 'HTML not found at' + file.base + htmlPath + ' for ' + name + 'directive.'));
                        }

                        var cacheStr = "angular.module('" + name + "').run(['$templateCache', function ($templateCache) { $templateCache.put('" + htmlPath + "', '" + jsStringEscape(html) + "');" + " }]);";
                        var htmlBuffer = new Buffer(cacheStr, 'utf8');

                        file.contents = Buffer.concat([file.contents, htmlBuffer]);

                    }


                }, this);


            }
        }

        cb(null, file);

    });

};