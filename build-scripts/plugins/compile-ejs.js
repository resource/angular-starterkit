var through = require('through2');
var ejs = require('ejs');
var _ = require('underscore');

module.exports = function (data) {

    data = data || {};
    data.ext = data.ext || '.html';

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
        }

        if (file.isBuffer()) {

            if (file.path.search("." + data.ext) > -1) {

                var options = {};
                options.cache = false;

                var htmlStr = String(file.contents);
                var ejsStr = ejs.render(htmlStr, data, options);
                file.contents = new Buffer(ejsStr);

            }
        }

        cb(null, file);

    });

};