module.exports = function () {
    $.gulp.task('fonts', function () {
        return $.gulp.src('./src/fonts/*.ttf')

        .pipe($.ttf2woff2())

        .pipe($.gulp.dest('./build/fonts'))

        .on('end',$.browserSync.reload);

    });
}