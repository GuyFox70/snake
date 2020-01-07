'user strict'

global.$ = {
    gulp: require('gulp'),
    concatCss: require('gulp-concat-css'),
    autoprefixer: require('gulp-autoprefixer'),
    cleanCSS: require('gulp-clean-css'),
    ttf2woff2: require('gulp-ttf2woff2'),
    notify: require('gulp-notify'),
    sourcemaps: require('gulp-sourcemaps'),
    imagemin: require('gulp-imagemin'),
    imageminJpg: require('imagemin-jpeg-recompress'),
    imageminPng: require('imagemin-optipng'),
    terser: require('gulp-terser'),
    browserSync: require('browser-sync').create(),
    clean: require('gulp-clean'),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(taskPath => {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    $.gulp.parallel('html','styles','scripts'),
    $.gulp.parallel('watch','serve')
));