module.exports = function () {
    $.gulp.task('html', function () {
        return $.gulp.src('./src/index.html')
    
        .pipe($.gulp.dest('./build'))
    
        .on('end',$.browserSync.reload);
    });
}