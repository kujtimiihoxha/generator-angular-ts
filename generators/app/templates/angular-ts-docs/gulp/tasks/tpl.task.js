/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
/**
 * Plugins
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import plumber  from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import ngHtml2Js from 'gulp-ng-html2js';
import fs from 'fs';
import htmlmin  from 'gulp-htmlmin';

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
 * Task:tpl
 */
gulp.task('tpl', function() {
    return gulp.src([config.src.patters.templates])
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments:true
        }))
        .pipe(ngHtml2Js(config.src.templates.options))
        .pipe(uglify())
        .pipe(concat(config.dist.templates))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.js))
        .pipe(browserSync.reload({stream: true}));
});
