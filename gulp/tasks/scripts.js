module.exports = function () {
    $.gulp.task('scripts', function () {
        return $.gulp.src('./src/js/*.js')
    
        .pipe($.terser({
            keep_fnames: true,
            mangle: false,
            compress: true
        }))
    
        .pipe($.gulp.dest('./build/js'))
    
        .on('end',$.browserSync.reload);
    });
}