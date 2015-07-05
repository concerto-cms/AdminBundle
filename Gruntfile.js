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
        
        // Task configuration.
        concat: {
            base: {
                src: [
                    '<%= folders.components %>/jquery/dist/jquery.js',
                    '<%= folders.components %>/underscore/underscore.js',
                    '<%= folders.components %>/backbone/backbone.js',
                    '<%= folders.components %>/backbone.stickit/backbone.stickit.js',
                    '<%= folders.components %>/bootstrap/js/alert.js',
                    '<%= folders.components %>/bootstrap/js/collapse.js',
                    '<%= folders.components %>/bootstrap/js/dropdown.js',
                    '<%= folders.components %>/bootstrap/js/tab.js',
                    '<%= folders.components %>/bootstrap/js/modal.js',
                    '<%= folders.components %>/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                    '<%= folders.components %>/twig.js/twig.js',
                    '<%= folders.components %>/jquery-file-upload/js/vendor/jquery.ui.widget.js',
                    '<%= folders.components %>/jquery-file-upload/js/jquery.fileupload.js'
                ],
                dest: '<%= folders.target %>/js/base.js',
                nonull: true
            }
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
        twig: {
            options: {
                amd_wrapper: false,
                each_template: '{{ variable }}["{{ filepath }}"] = Twig.twig({ allowInlineIncludes: true, id: "{{ filepath }}", data: {{ compiled }} });',
                template_key: path.basename
            },
            admin: {
                files: {
                    '<%= folders.target%>/js/templates.admin.js' : [
                        '<%= folders.src %>/twigjs/*.twig'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: '<%= folders.src %>/less/**/*.less',
                tasks: ['less']
            },
            twig: {
                files: '<%= folders.src %>/twigjs/**/*.twig',
                tasks: ['twig:admin']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-twig');

    // Task aliases
    grunt.registerTask('js', ['concat']);
    grunt.registerTask('css', ['less']);

    // Build & Deploy
    grunt.registerTask('default', ['copy', 'twig', 'js', 'css']);
};