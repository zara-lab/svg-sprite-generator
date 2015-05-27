var multiline = require('multiline');

module.exports = function(grunt) {
  grunt.initConfig({
    svgstore: {
      options: {
        //fill with currentColor will get preserved (otherwise fills removed)
        cleanup: ['fill', 'stroke'],
        prefix: 'icon-',
        includedemo: multiline.stripIndent(function(){/*
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                html, body {
                  margin: 0;
                }

                .container {
                  font-size: 0;
                }

                .container div {
                  display: inline-block;
                  margin: 10px;
                }

                .container span {
                  display: block;
                  margin-top: 4px;
                  color: #555;
                  text-align: center;
                  font-size: 14px;
                }

                svg {
                  display: block;
                  width: 50px;
                  height: 50px;
                  border-radius: 3px;
                  background-color: #f6f6f6;
                  pointer-events: none;

                  fill: #333;
                }

                .container > div:hover svg {
                  fill: red;
                }
              </style>
            </head>
          <body>
            <div class="container">
              {{{svg}}}
              {{#each icons}}
              <div>
                <svg>
                  <use xlink:href="#{{name}}" />
                </svg>
                <span>{{title}}</span>
              </div>
              {{/each}}
            </div>
          </body>
          </html>
          */}),
        formatting: {
          indent_size: 2
        }
      },
      default: {
        files: {
          '.tmp/icons.svg': ['svgs/*.svg']
        }
      }
    },
    svgmin: {
      options: {
        plugins: [{
          cleanupIDs: false
        }, {
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }]
      },
      dist: {
        files: {
          'dist/icons.svg': '.tmp/icons.svg'
        }
      }
    },
    svg2png: {
      all: {
        files: [{
          cwd: 'svgs/',
          src: ['*.svg'],
          dest: 'pngs'
        }]
      }
    },
    copy: {
      main: {
        nonull: true,
        src: '.tmp/*.html',
        dest: 'dist/index.html'
      }
    },
    clean: {
      dist: {
        src: ['dest', '.tmp']
      }
    }
  });

  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('cleanup', ['clean:dist']);
  grunt.registerTask('default', [
                     'clean:dist',
                     'svgstore',
                     'svgmin:dist',
                     'copy:main',
                     'svg2png',
                     'clean:dist'
                     ]);
};
