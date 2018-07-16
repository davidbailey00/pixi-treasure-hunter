const gulp = require('gulp');

const fs = require('fs');
const del = require('del');

const browserSync = require('browser-sync');
const browserify = require('browserify');
const runSequence = require('run-sequence');

function bundle(dev) {
  let opts = { plugin: ['tinyify'] };

  if (dev) {
    opts = { cache: {}, packageCache: {}, plugin: ['watchify'], debug: true };
  }

  browserify('src/main.js', opts)
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(fs.createWriteStream('dist/bundle.js'));
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
