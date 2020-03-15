const compatibility = [
  'last 2 versions',
  'ie >= 9',
  'ios >= 7'
];

export default {
  server: {
    root: 'dist',
    port: 8000
  },
  paths: {
    src: {
      root: 'src',
      html: 'src/index.html',
      sass: 'src/assets/scss/**/*.scss',
      js:   'src/assets/js',
      img:  'src/assets/img/**/*'
    },
    dest: {
      root: 'dist',
      html: 'dist',
      css:  'dist/assets/css',
      js:   'dist/assets/js',
      img:  'dist/assets/img'
    },
    deps: {
      js: [
        'node_modules/three/build/three.min.js',
        'node_modules/stats.js/build/stats.min.js',
        'node_modules/jquery/dist/jquery.min.js',
      ]
    }
  },
  compatibility: compatibility,
  settings: {
    autoprefixer: {
      browsers: compatibility
    },
    cleanCss: {
      compatibility: 'ie9'
    },
  },
  init: function () {
    return this;
  }
}.init();
