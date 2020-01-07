module.exports = function () {
    $.gulp.task('clean', function () {
        return $.gulp.src('build/js/*', {read: false})
            .pipe($.clean())
    });
    
}