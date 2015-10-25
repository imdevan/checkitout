module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-scss-lint');

  var base = './_site';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          loadPath: ['bower_components',
            'bower_components/breakpoint-sass/stylesheets/',
            'bower_components/singularity/stylesheets/'
          ]
        },
        files: {
          'css/s_main.css': '_sass/s_main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer-core')({
            browsers: 'last 2 versions'
          }), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },
    jekyll: {
      dist: {
        options: {
          dest: '<%= dist %>',
          config: '_config.yml'
        }
      }
    },
    connect: {
      options: {
        port: 8080,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [base]
        }
      }
    },
    watch: {
      html: {
        files: [
          'index.html',
          'projects/index.html',
          'about/index.html',
          'talks/index.html',
          'blog/index.html',
          '_posts/**/*.html',
          '_posts/**/*.md',
          '_layouts/*.html',  
          '_includes/*.html',
        ],
        tasks: ['jekyll'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['_sass/**/*.scss', 'css/i.css'],
        tasks: ['sass', 'postcss', 'jekyll'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jekyll'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.config('scsslint',{
    allFiles: [
      '_sass/**/*.scss'
    ],
    options: {
      config: '.scss-lint.yml',
      reporterOutput: 'scss-lint-report.xml',
      colorizeOutput: true
    }
  });

  grunt.registerTask('slint', ['scsslint']);

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'sass',
      'postcss',
      'jekyll',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('default', ['serve']);
}
