/*global module:false*/
var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        folders: {
            components: 'bower_components',
            target: 'src/Resources/public',
            src: 'src/Resources'
        },
        
        less: {
            app: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= folders.src %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/app.css': "<%= folders.src %>/less/css-app.less"
                }
            },
            login: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= folders.src %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/login.css': "<%= folders.src %>/less/css-login.less"
                }
            }
        },
        copy:
        {
            glyphicons: {
                files: [
                    {
                        src: '*',
                        dest: '<%=folders.target%>/fonts/',
                        expand: true,
                        cwd: '<%=folders.components%>/bootstrap/dist/fonts/'
                    }
                ]
            }
        },

        watch: {
            less: {
                files: '<%= folders.src %>/less/**/*.less',
                tasks: ['less']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task aliases
    grunt.registerTask('js', ['concat']);
    grunt.registerTask('css', ['less']);

    // Build & Deploy
    grunt.registerTask('build', ['copy', 'css']);
    grunt.registerTask('default', ['build', 'watch']);
};