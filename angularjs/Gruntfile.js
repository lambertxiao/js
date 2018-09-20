module.exports = function(grunt) {
  grunt.initConfig({
    serve: {
        options: {
            port: 9000
        }
    }
  });

  grunt.loadNpmTasks('grunt-serve');
  grunt.registerTask('default', ['grunt-serve']);
};
