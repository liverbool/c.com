module.exports = (grunt) ->
    grunt.initConfig

        coffee:
            options:
                bare: yes
            compile:
                expand: yes
                cwd: "./src"
                src: ["**/*.coffee"]
                dest: "../src"
                ext: ".js"

        watch:
            coffee:
                files: ["**/*.coffee"]
                tasks: ['coffee']

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'

    grunt.registerTask 'default', ['coffee', 'watch']
