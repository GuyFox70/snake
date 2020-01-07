module.exports = function () {
    $.gulp.task('styles', function () {
        return $.gulp.src('./src/css/*.css')
    
        .pipe($.sourcemaps.init())
    
        .pipe($.concatCss('style.css'))
        .pipe($.autoprefixer({
            cascade: false
        }))
    
        .on("error", $.notify.onError({
            message: "Error: Something happended",
            title: "style"
        }))
    
        .pipe($.cleanCSS({
            level: 2
        }))
    
        .pipe($.sourcemaps.write())
    
        .pipe($.gulp.dest('./build/css/'))
    
        .pipe($.browserSync.reload({
            stream: true
        }));
    });
}