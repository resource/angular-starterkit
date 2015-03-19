var config = module.exports = {

    /**
     *
     */
    styles: {

        libs: {

            // You can use a glob here or list files in order if there are dependencies.
            files: [
                'source/libs/bootstrap.css',
                'source/libs/**/*.css'
            ],
            watch: ['source/libs/**/*.css'],
            dest: 'assets/libs.css'
        },

        src: {

            // You can use a glob here or list files in order if there are dependencies.
            files: ['source/assets/styles/main.scss'],

            watch: ['source/**/*.scss'],

            // Dont supply a name to this destination path becase it
            // is taken from your main .scss files name
            dest: 'assets'
        }
    },

    /**
     *
     */
    scripts: {

        libs: {

            // You can use a glob here or list files in order if there are dependencies.
            files: [
                'source/libs/angular.js',
                'source/libs/jquery.js',
                'source/libs/*.js'
            ],

            watch: ['source/libs/**/*.js'],

            // provide the route as well as the name for the destination
            dest: 'assets/libs.js'
        },

        src: {

            // You can use a glob here or list files in order if there are dependencies.
            files: ['source/app/**/*.js'],

            watch: [
                'source/app/**/*.js',
                'source/app/directives/**/*.html'
            ],

            // provide the directory as well as the name for the destination
            dest: 'assets/main.js'
        }
    },

    /**
     *
     */
    views: {

        copy: {
            files: ['source/app/views/**/*.html'],
            watch: ['source/app/views/**/*.html'],
            dest: 'views'
        },

        compile: {
            files: ['source/app/views/**/*.html'],
            watch: [],

            // provide the directory as well as the name for the destination
            dest: 'assets/templates.js'
        }
    },

    static: {

        src: {
            files: [
                'source/{favicon.ico,*.html,*.js,*.json}',
                'source/**/{images,videos,fonts}/**/*'
            ],
            watch: [
                'source/{favicon.ico,*.html,*.js,*.json}',
                'source/**/{images,videos,fonts}/**/*'
            ],
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