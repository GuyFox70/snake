const gulp = require('gulp');

const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');
// const concatJs = require('gulp-concat');
// const uglifyes = require('uglify-es');
// const composer = require('gulp-uglify/composer');
// const uglify = composer(uglifyes, console);
// const del = require('del');

// browser-sync start --server --files "*.*"

const cssFile = [
    './src/css/field.css',
    './src/css/snake.css',
    './src/css/start.css',
    './src/css/blink.css',
    './src/css/lose.css'
];

const jsFile = [
    './src/js/snake.js'
];

function styles() {
    return gulp.src(cssFile)

    .pipe(concatCss('style.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))

    .pipe(gulp.dest('./build/css'))
}

function scripts() {
    return gulp.src(jsFile)

    // .pipe(concatJs('script.js'))

    // .pipe(uglify(
    //     {mangle: {toplevel: true}}
    // ))

    .pipe(gulp.dest('./build/js'))
}

// gulp.task('compress', function () {
//     return gulp.src(jsFile)
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/js'))
// });

// function clean() {
//     return del(['build/*'])
// }

gulp.task('styles',styles);

gulp.task('scripts', scripts);

// gulp.task('compress',compress);

// gulp.task('del', clean);

gulp.task('build', gulp.series(gulp.parallel(styles,scripts)));