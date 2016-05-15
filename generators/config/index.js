'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var ff = require('node-find-folder');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.option('no-test');
    // And you can then access it later on this way; e.g. CamelCased
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
    var inject = null;
    var name = null;
    var destinationPath;
    var moduleCamel=_.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
     if (argument.includes('inject')) {
          inject = argument.split('=')[1].split(',');
          if(argument.split('=')[1].split(',').length == 0){
           inject = [argument];
          }
      } else if(argument.includes('name')){
       name = _.upperFirst(_.camelCase(argument.split('=')[1]));
     }
    });
    if (name == null) {
      this.log.error("You must specify a name for the config");
      done();
      return;
    }
    destinationPath = config.src.paths.base+config.src.paths.app+config.src.paths.config;
    if(inject != null){
      var injectName='';
      var injectConstructor='';
      inject.forEach(function (dep) {
        injectName = injectName + "," + '"' +dep + '"';
        injectConstructor = injectConstructor + ",private "  +_.camelCase(dep) + ": any";
      });
      injectName = _.trim(injectName,',');
      injectConstructor = _.trim(injectConstructor,',');
      this.fs.copyTpl(
        this.templatePath('config.ts.tpl'),
        this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".config.ts"),{
          moduleCamel:moduleCamel,
          configName:name,
          injectName:injectName,
          injectConstructor:injectConstructor
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath('config.ts.tpl'),
        this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".config.ts"),{
          moduleCamel:moduleCamel,
          configName:name,
          injectName:false,
          injectConstructor:false
        }
      );
    }
  }
});