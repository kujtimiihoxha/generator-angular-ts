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
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
import plumber  from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import fs from 'fs';

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
 * Task:ts
 */
gulp.task('ts', function() {
    return gulp.src([config.src.paths.typings,config.src.main,config.src.decorators,config.src.patters.ts])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(ts({
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true,
            "experimentalDecorators": true
        }))
        .pipe(uglify())
        .pipe(concat(config.dist.js))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.paths.base+config.dist.paths.js))
        .pipe(browserSync.reload({stream: true}));
});
