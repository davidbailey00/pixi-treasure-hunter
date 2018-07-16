const gulp = require('gulp');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

function bundle(dev) {
  let opts = {};

  if (dev) {
    opts = { cache: {}, packageCache: {}, plugin: ['watchify'], debug: true };
  }

  const stream = browserify('src/main.js', opts)
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('bundle.js'));

  if (!dev) {
    stream.pipe(streamify(uglify()));
  }

  stream.pipe(gulp.dest('dist'));
}

gulp.task('js-dev', () => bundle(true));
gulp.task('js', () => bundle());

gulp.task('serve', ['js-dev'], () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/**/*.js', ['js-dev']);
  gulp.watch('dist/**/*').on('change', browserSync.reload);
});

gulp.task('clean', () => del.sync('dist/bundle.js'));
gulp.task('build', () => runSequence('clean', 'js'));
