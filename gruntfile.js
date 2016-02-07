module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public'
                }
            }
        },

        clean: [
            'public/'
        ],

        uglify: {
            my_target: {
                files: {
                    'public/app/angular.js': [
                        'bower_components/angular/angular.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.js'
                    ]
                }
            }
        },

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    assets: 'app/assets',
                    layout: 'app/templates/layouts/default.hbs',
                    data: 'app/content/data/*.yml',
                    partials: [
                        'app/templates/partials/*.hbs',
                    ]
                },
                flatten: true,
                expand: true,
                cwd: 'app/templates/pages/',
                src: ['**/*.hbs', '*.hbs'],
                dest: 'public/'
            }
        },

        sass: {
            dist: {
                files: {
                    'public/app.css' : 'app.scss'
                }
            }
        },

        browserify: {
            dist: {
                src: 'app/app.js',
                dest: 'public/app/app.js'
            }
        },

        watch: {
            css: {
                files: '*.scss',
                tasks: ['sass']
            },
            app: {
                files: 'app/**/*',
                tasks: ['assemble']
            },
            /*options: {
                livereload: true
            }*/
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['connect','clean','uglify','assemble','sass','watch']);
}