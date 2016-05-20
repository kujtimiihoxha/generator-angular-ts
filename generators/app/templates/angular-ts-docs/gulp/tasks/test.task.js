/**
 * @author    Kujtim Hoxha {@link http://kujtimhoxha.com}
 * @copyright Copyright (c) 2016, Kujtim Hoxha
 * @license   MIT
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import fs from 'fs';
import karma  from 'karma'
const  Server = karma.Server;
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
 * Task:fonts
 */
gulp.task('test',function(done) {
    new Server({
        configFile: __dirname +"../../"+config.tests.karma,
        singleRun: true
    }, done).start();
});