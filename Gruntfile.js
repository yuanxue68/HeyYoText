module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js','server.js', 'public/js/**/*.js', 
      'models/**/*.js', 'routes/**/*.js']
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    env: {
      dev: { src: ".env" },
    }

  });

  grunt.registerTask('default', ['jshint','env:dev', 'nodemon']);
};