var grunt = function(grunt) {

    grunt.initConfig({
        watch: {
            templates: {
                files: ['./ts/templates/**/*.hbs'],
                tasks: ['copy']
            },

        },
        copy: {
            templates: {
                files: [{
                    expand: true,
                    cwd: './ts/templates',
                    src: ['*.hbs'],
                    dest: './js/templates'
                }]
            }
        },

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['copy', 'watch']);

};
module.exports = grunt;
