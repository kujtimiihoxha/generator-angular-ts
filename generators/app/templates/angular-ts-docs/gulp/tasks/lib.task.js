/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import fs from 'fs';
import clean from 'gulp-clean'
/**
 * Config
 */
let  config = null;
if (fs.existsSync('ng-ts.json')) {
    config = JSON.parse(fs.readFileSync('ng-ts.json', 'utf-8'));
} else {
    gutil.log(gutil.colors.bgRed("Error: ng-ts.json not found in directory"));
    gutil.log("Please view the README.md to setup.");
    process.exit(1);
}
/**
 * Error
 */
var onError = function(error) {
    gutil.log(gutil.colors.red(error));
    this.emit('end');
};

/**
 * Task:fonts-clean
 */
gulp.task('lib-clean', function () {
    return gulp.src(config.dist.paths.base+config.dist.paths.lib, {read: false})
        .pipe(clean());
});
/**
 * Task:fonts
 */
gulp.task('lib',['lib-clean'], function() {
    return gulp.src([config.src.patters.lib])
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.lib))
        .pipe(browserSync.reload({stream: true}));
});