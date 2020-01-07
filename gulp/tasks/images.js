module.exports = function () {
    $.gulp.task('images', function () {
        return $.gulp.src('src/img/*.{jpg,png}')
    
        .pipe($.imagemin([
            $.imageminJpg({
                loops: 4,
                min: 50,
                max: 95,
                quality: 'high' 
            }),

            $.imageminPng({
                optimizationLevel: 5
            })
        ]))
        .pipe($.gulp.dest('build/img'))

        .on('end',$.browserSync.reload);
    });
}