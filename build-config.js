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

            files: ['source/assets/styles/main.scss'],
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
     * The scripts section is all of our source and library javascript files used in
     * the application.
     *
     */
    scripts: {

        libs: {

            files: ['source/libs/angular.js', 'source/libs/jquery.js', 'source/libs/*.js'],
            watch: ['source/libs/**/*.js'],
            dest: 'assets/libs.js'

        },

        src: {

            files: ['source/app/**/*.js'],
            watch: ['source/app/**/*.js','source/app/directives/**/*.html'],
            dest: 'assets/main.js'

        }
    },

    /**
     * THROW IN EXPLANATION HERE
     */
    views: {

        /**
         * THROW IN EXPLANATION HERE
         */
        copy: {

            files: ['source/app/views/**/*.html'],
            watch: ['source/app/views/**/*.html'],

            /**
             * Destination here is a directory without a file because we're just copying
             * the views over to the output directory
             */
            dest: 'views'

        },

        /**
         * THROW IN EXPLANATION HERE
         */
        compile: {

            files: ['source/app/views/**/*.html'],
            watch: [],

            /**
             * In the case of pre-compiling views into angulars templateCace templates is the name
             * of the javascript file as well as the name of the module you'll need to import
             * into your application.
             */
            dest: 'assets/templates.js'
        }
    },

    /**
     * THROW IN EXPLANATION HERE
     */
    static: {

        src: {
            files: ['source/{favicon.ico,*.html,*.js,*.json}', 'source/**/{images,videos,fonts}/**/*'],
            watch: ['source/{favicon.ico,*.html,*.js,*.json}', 'source/**/{images,videos,fonts}/**/*'],
            dest: './'
        }

    },

    /**
     * See http://karma-runner.github.io/0.8/config/configuration-file.html for detailed explanations
     * of the karma portion of the build configuration.
     */
    karma: {
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
    }
};