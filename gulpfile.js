var gulp = require('gulp'),
    umd = require('gulp-umd'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel'),
    stylus = require('gulp-stylus'),
    notifier = require('node-notifier'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = function () {
      return require('gulp-plumber')({
        errorHandler: function (error) {
          notifier.notify({
            title: 'Gulp Error',
            message: error.message,
            sound: true
          })
          console.log(error.message)
          this.emit('end')
        }
      })
    }
    config = {
      src: 'src',
      build: 'build',
      dist: 'dist',
      babelSrc: 'src/**/*.js',
      stylusSrc: 'src/css/app.styl',
      stylusWatchSrc: 'src/**/*.styl',
      jadeSrc: 'src/**/*.jade',
      jadeLocals: {
        env: process.env.NODE_ENV || 'development',
        version: 'v' + require('./package.json').version,
        esriVersion: 3.15
      },
      server: {
        baseDir: 'build',
        port: process.env.PORT || 3000,
        files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css']
      }
    }

gulp.task('jade-build', function () {
  return gulp.src(config.jadeSrc)
    .pipe(plumber())
    .pipe(jade({ locals: config.jadeLocals, pretty: true }))
    .pipe(gulp.dest(config.build))
})

gulp.task('jade-dist', function () {
  return gulp.src(config.jadeSrc)
    .pipe(jade({ locals: config.jadeLocals, pretty: true }))
    .pipe(gulp.dest(config.dist))
})

gulp.task('jade-watch', ['jade-build'], function () {
  gulp.watch(config.jadeSrc, ['jade-build'])
})

gulp.task('babel-build', function () {
  return gulp.src(config.babelSrc)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build))
})

gulp.task('babel-watch', ['babel-build'], function () {
  gulp.watch(config.babelSrc, ['babel-build'])
})

gulp.task('stylus-build', function () {
  return gulp.src(config.stylusSrc, { base: config.src })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({ 'include css': true }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build))
})

gulp.task('stylus-dist', function () {
  return gulp.src(config.stylusSrc, { base: config.src })
    .pipe(sourcemaps.init())
    .pipe(stylus({ 'include css': true, compress: true }))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist))
})

gulp.task('stylus-watch', ['stylus-build'], function () {
  gulp.watch(config.stylusWatchSrc, ['stylus-build'])
})

gulp.task('shim-babel-polyfill', function () {
  return gulp.src('build/vendor/babel-polyfill/browser-polyfill.js')
    .pipe(umd({
      exports: function () { return '_babelPolyfill' },
      namespace: function () { return 'window._babelPolyfill' }
    }))
    .pipe(gulp.dest('build/shim/babel-polyfill/'))
})

gulp.task('shim-fetch', function () {
  return gulp.src('build/vendor/fetch/fetch.js')
    .pipe(umd({
      exports: function () { return 'fetch' },
      namespace: function () { return 'window.fetch' }
    }))
    .pipe(gulp.dest('build/shim/fetch/'))
})

gulp.task('shim', ['shim-babel-polyfill', 'shim-fetch'])

gulp.task('serve', function () {
  browserSync({
    server: config.server.baseDir,
    files: config.server.files,
    port: config.server.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    open: false,
    ui: false
  });
})

// TODO:
// - image optimization
// - eslint
// - prerender

gulp.task('build', ['jade-build', 'babel-build', 'stylus-build', 'shim'])

gulp.task('watch', ['jade-watch', 'babel-watch', 'stylus-watch', 'shim'])

gulp.task('dist', ['jade-dist', 'babel-build', 'stylus-dist', 'shim'])
