'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var runUtil = require('./run-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },
  writing: function () {
    /**
     * Config
     */
    var  config = null;
    if (fs.existsSync('ng-ts.json')) {
      config = JSON.parse(fs.readFileSync('ng-ts.json', 'utf-8'));
    } else {
      this.log.error("Error: ng-ts.json not found in directory");
      done();
      return;
    }
    /*--Options--*/

    /**
     * The config name
     */
    var name;
    /**
     * Dependencies
     */
    var inject;
    /*-----------*/

    var options = runUtil.getOptions(this.arguments);
    name = options.name;
    inject = options.inject;
    if (name == null) {
      this.log.error("You must specify a name for the config");
      done();
      return;
    }
    var destinationPath = runUtil.getDestinationPath(config);
    var injects = runUtil.getInjection(inject);
    this.fs.copyTpl(
      this.templatePath('run.ts.tpl'),
      this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".run.ts"),{
        moduleCamel:_.upperFirst(_.camelCase(config.moduleName)),
        runName:name,
        injectName:injects.injectName,
        injectConstructor:injects.injectConstructor
      }
    );
  }
});
