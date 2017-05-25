module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: { //target
                src: ['./public/App/**/*.js', '!./public/App/min/app.min.js','!./public/App/concat/app.concat.js'],
                dest: './public/App/concat/app.concat.js'
            }
        },
        jshint : {
            beforeconcat: ['./public/App/**/*.js', '!./public/App/min/app.min.js','!./public/App/concat/app.concat.js'],
            afterconcat: ['./public/App/min/app.js']
        },
        uglify: {
            js: { //target
                src: ['./public/App/concat/app.concat.js'],
                dest: './public/App/min/app.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['./public/App/**/*.js','./public/App/**/**/*.js', '!./public/App/min/app.js'],
                tasks: ['jshint:beforeconcat','concat','uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });
// Load the plugins that provide the tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default tasks
    grunt.registerTask('default', ['jshint:beforeconcat','concat','uglify']);
    

};