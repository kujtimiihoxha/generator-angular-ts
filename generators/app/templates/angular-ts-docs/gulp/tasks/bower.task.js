/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
/**
 * Plugins
 */
import gulp from 'gulp'
import gulpBowerFiles  from 'gulp-main-bower-files';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import plumber  from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import fs from 'fs';
import filter from 'gulp-filter';
import cssnano from 'gulp-cssnano';

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
 * Task:bower-js
 */
gulp.task('bower-js', function() {
    return gulp.src(config.bowerJson)
        .pipe(gulpBowerFiles())
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(filter('**/*.js'))
        .pipe(uglify())
        .pipe(concat(config.dist.vendorJs))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.js))
        .pipe(browserSync.reload({stream: true}));
});
/**
 * Task:bower-css
 */
gulp.task('bower-css', function() {
    return gulp.src(config.bowerJson)
        .pipe(gulpBowerFiles())
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(filter('**/*.+(css)'))
        .pipe(cssnano())
        .pipe(concat(config.dist.vendorCss))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.css))
        .pipe(browserSync.reload({stream: true}));
});