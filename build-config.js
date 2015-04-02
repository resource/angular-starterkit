var config = module.exports = {

    /**
     * The styles object references both library and source styles. Library styles
     * are assumed to be CSS while srouce styles are assumed to be SASS.
     */
    styles: {

        libs: {

            /**
             * Anytime you see a files object you can use either a glob, relative
             * file references or both. Using both is a way to insure that file
             * dependecies are loaded in order.
             */
            files: [
                'source/libs/bootstrap.css',
                'source/libs/**/*.css'
            ],

            /**
             * Because this glob may be diffrent than the files that you are concatonating
             * a seperate list is needed for files to watch changes on. Any changes on these files
             * will force the task associated to run. You can see this happening in the terminal
             * window started debugging in.
             */
            watch: ['source/libs/**/*.css'],
            dest: 'assets/libs.css'
        },

        src: {

            // same as styles libs
            files: ['source/styles/main.scss'],

            // same as styles libs
            watch: ['source/**/*.scss'],

            /**
             * This destination folder is the only one that is different from the rest in
             * this file. Because of how the task works for the sass compilation, it will use
             * the name of your main scss file for the name of it's css ourtput.
             */
            dest: 'assets'
        }
    },

    /**
     * 'scripts' references both the javascript files in the libs directory as well as the
     * entire app directory (minus the views subdirectory). The libs will be concatonated into
     * one file, while the application logic will be compiled into an application specific file.
     */
    scripts: {

        libs: {

            // same as styles libs
            files: [
                'source/libs/angular.js',
                'source/libs/*.js'
            ],

            // same as styles libs
            watch: ['source/libs/**/*.js'],

            // same as styles libs
            dest: 'assets/libs.js'
        },

        src: {

            // same as styles libs
            files: ['source/app/**/*.js'],

            // same as styles libs
            watch: [
                'source/app/**/*.js',
                'source/app/directives/**/*.html'
            ],

            // same as styles libs
            dest: 'assets/main.js'
        }
    },

    /**
     * There are two ways that views are moved into build directories. They can either be
     * a straight copy or they can be pre-cached using angulars templateCache module.
     */
    views: {

        copy: {

            // same as styles libs
            files: ['source/app/views/*.html'],

            // same as styles libs
            watch: ['source/app/views/*.html'],

            /**
             * By default this is set to views in order to keep some consistancy in how
             * views are referenced within parts of the application like the router. If you
             * change this you will have to change how you are referencing views within
             * your application.
             */
            dest: 'views'
        },

        compile: {

            // same as styles libs
            files: ['source/app/views/templates/**/*.html'],

            // same as styles libs
            watch: ['source/app/views/templates/**/*.html'],

            /**
             * Tempaltes are compiled into a single javascript file. The name of the script
             * is also the name of the module you'll include in your application.
             */
            dest: 'assets/templates.js'
        }
    },

    /**
     * Static files should be included in the assets directory. Be careful not to name static files
     * the same as your derived as they will be overwritten.
     */

    /**
     * See http://karma-runner.github.io/0.8/config/configuration-file.html for detailed explanations
     * of the karma portion of the build configuration.
     */
    karma: {

        /**
         * Optional and should only contain library files that may have been loaded through cdns in your
         * project. Store any of these library files within tests/libs. Only include the files array if order
         * matters, otherwise omit the array as all library files within the tests/libs directory
         * will be loaded (alphabetically).
         */
        // files:['jquery.js'],
        frameworks: ['jasmine'],
        exclude: [],
        preprocessors: {},
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: 'ERROR',
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    },

    /**
     * See https://github.com/angular/protractor/blob/master/docs/referenceConf.js for details.
     */
    protractor: {
        capabilities: {
            browserName: 'chrome' // defaults to chrome
        },
        params: {},
        jasmineNodeOpts: {
            isVerbose: true,
            showColors: true,
            includeStackTrace: true,
            defaultTimeoutInterval: 30000
        }

    }

};