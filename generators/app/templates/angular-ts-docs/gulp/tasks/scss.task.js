/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
/**
 * Plugins
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import postcss  from 'gulp-postcss';
import plumber  from 'gulp-plumber';
import autoprefixer from 'autoprefixer';
import cssnano from 'gulp-cssnano';
import gutil from 'gulp-util';
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
 * Task:sass
 */
gulp.task('sass', function() {
    return gulp.src([config.src.patters.sass])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(concat(config.dist.css))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.css))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.css))
        .pipe(browserSync.reload({stream: true}));
});
