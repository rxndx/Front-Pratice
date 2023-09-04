const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function startTask(done) {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  watch('./src/*.html', series(copyHtmlTask, reloadBrowser));
  watch('./src/*.js', series(copyJsTask, reloadBrowser));
  watch('./src/*.scss', series(buildSass, reloadBrowser));

  done();
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function buildTask() {
  return series(
      clearDistTask,
      parallel(
          copyHtmlTask,
          copyJsTask,
          buildSass,
      )
  );
}

function clearDistTask() {
  return src('./dist', { read: false, allowEmpty: true }).pipe(clean());
}

function copyHtmlTask() {
  return src('./src/index.html').pipe(dest('./dist'));
}

function copyJsTask() {
  return src('./src/*.js')
      .pipe(concat('app.js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(dest('./dist/js'));
}

function buildSass() {
  return src('./src/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(dest('./dist/css'));
}

exports.build = buildTask();
exports.start = series(buildTask(), startTask);