const gulp = require('gulp');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const fs = require('fs');
const packer = require('gamefroot-texture-packer');
const htmlmin = require('gulp-htmlmin');

const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');


// === Build Tasks ===

function bundle(bundler, dev) {
  const stream = bundler
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('bundle.js'));

  if (!dev) {
    stream.pipe(streamify(uglify()));
  }

  stream.pipe(gulp.dest('dist'));
}

gulp.task('js-dev', () => {
  const bundler = browserify('src/main.js', {
    cache: {},
    packageCache: {},
    plugin: ['watchify'],
    debug: true
  });

  bundler.on('update', () => bundle(bundler, true));
  bundle(bundler);
});

gulp.task('js', () => {
  const bundler = browserify('src/main.js');
  bundle(bundler);
});

// Requires ImageMagick with legacy tools
gulp.task('sprites', () => {
  fs.mkdirSync('dist');
  packer('src/images/*.png', {
    format: 'json',
    path: 'dist/images',
    name: 'textures',
    padding: 2
  });
});

gulp.task('html', () => {
  gulp.src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});


// === Dev/Build Sequence Tools ===

gulp.task('serve', ['js-dev', 'sprites', 'html'], () => {
  browserSync.init({
    server: './dist'
  });

  // js-dev automatically watches using watchify
  gulp.watch('src/images/*', ['sprites']);
  gulp.watch('src/index.html', ['html']);
  gulp.watch('dist/**/*').on('change', browserSync.reload);
});

gulp.task('clean', () => del.sync('dist'));
gulp.task('build', () => runSequence('clean', ['js', 'sprites', 'html']));
