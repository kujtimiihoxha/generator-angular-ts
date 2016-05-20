/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
'use strict';
/**
 * Plugins.
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import fs from 'fs';
import watch from 'gulp-watch';
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
 * Tasks.
 */
import './gulp/tasks/scss.task'
import './gulp/tasks/ts.task'
import './gulp/tasks/tpl.task'
import './gulp/tasks/img.task'
import './gulp/tasks/bower.task'
import './gulp/tasks/fonts.task'
import './gulp/tasks/lib.task'
import './gulp/tasks/index.task'
import karma  from 'karma'
const  Server = karma.Server;
// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function(done) {
    gutil.log(gutil.colors.green('Loading Gulp Watch'), '');
    if(config.proxy){
        browserSync.init({
            proxy:config.proxy
        });
    } else {
        browserSync.init({
            server: {
                baseDir: config.dist.paths.base,
                index: "index.html"
            }
        });
    }
    watch(config.src.patters.ts,function () {
        gulp
            .start('ts')
            .on('end', browserSync.reload);
    });
    watch(config.src.patters.sass,function () {
        gulp
            .start('sass')
            .on('end', browserSync.reload);
    });
    watch(config.src.patters.img,function () {
        gulp
            .start('img')
            .on('end', browserSync.reload);
    });
    watch(config.bowerJson,function () {
        gulp
            .start(['bower-js','bower-css'])
            .on('end', browserSync.reload);
    });
    watch(config.src.patters.templates,function () {
        gulp
            .start('tpl')
            .on('end', browserSync.reload);
    });
    watch(config.src.patters.fonts,function () {
        gulp
            .start('fonts')
            .on('end', browserSync.reload);
    });
    watch(config.src.patters.lib,function () {
        gulp
            .start('lib')
            .on('end', browserSync.reload);
    });
    watch(config.src.index,function () {
        gulp
            .start('index')
            .on('end', browserSync.reload);
    });
    if(process.argv.indexOf("--no-tests")=== -1){
        new Server({
            configFile: __dirname +"/"+config.tests.karma,
        },  function() {
            done();
        }).start()
    }
});
/**
 * Task:test
 */
gulp.task('test',["build"],function(done) {
    new Server({
        configFile: __dirname +"/"+config.tests.karma,
        singleRun: true
    },  function() {
        done();
    }).start();
});
if (!config.index) {
    gulp.task('build',
        [
            'bower-js',
            'bower-css',
            'img',
            'lib',
            'fonts',
            'ts',
            'tpl',
            'sass'
        ]);
} else {
    gulp.task('build',
        [
            'bower-js',
            'bower-css',
            'img',
            'lib',
            'fonts',
            'ts',
            'tpl',
            'sass',
            'index'
        ]);
}
/**
 * Task: default
 */
gulp.task('default', [
  'build'
]);