module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      builds: {
        src: ['build']
      }
    },
    copy: {
      jsfiles: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '**',
            dest: 'build/',
            filter: function(fname) { return /(.*).js$/g.test(fname) }
          }
        ]
      }
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "src",
          src: "**/*.jade",
          dest: "build",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    jshint: {
      options: {
        asi: true,
        camelcase: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: true,
        maxcomplexity: 10,
        maxlen: 120,
        noarg: true,
        noempty: true,
        nonbsp: true,
        node: true,
        nonew: true,
        undef: true,
        unused: true,
        strict: false,
        trailing: true
      },
      files: ['src']
    },
    stylus: {
      compile: {
        options: {},
        files: [ {
          cwd: "src",
          src: "**/*.styl",
          dest: "build",
          expand: true,
          ext: ".css"
        } ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-stylus')

  grunt.registerTask('build', ['jade', 'stylus', 'copy:jsfiles'])
}
