module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({

        stylus: {
            compile: {
                files: {
                    'client/packaged/css/main.css': ['client/src/styl/*.styl']
                }
            },
        },

        jshint: {
            all: ['*.js', 'server/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        browserify: {
            'client/packaged/js/main.js': 'client/src/js/app/main.js'
        },

        clean: [
            'client/packaged/css/*',
            'client/packaged/js/*'
        ],

        watch: {
            build: {
                files: ['client/src/styl/*.styl', 'client/src/js/**/*.js', 'client/src/swig/**/*.swig'],
                tasks: ['stylus', 'browserify'],
                options: {
                    spawn: false,
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            jslibs: {
                src: ['client/libs/js/**/*.js'],
                dest: 'client/packaged/js/libs.js',
            },
            csslibs: {
                src: ['client/libs/css/**/*.css'],
                dest: 'client/packaged/css/libs.css',
            },
        }

    });

    grunt.registerTask('build', ['clean', 'jshint', 'stylus', 'browserify', 'concat:*', 'watch:build']);
    grunt.registerTask('default', ['build']);

};

