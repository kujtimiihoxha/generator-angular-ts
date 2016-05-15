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
    this.option('noTest');
    this.option('link');
    this.option('compile');
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
    var selector = null;
    var selectorCamel = null;
    var inject = null;
    var destinationPath;
    var moduleCamel=_.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
      if (argument.includes('selector')) {
          selector=_.kebabCase(argument.split('=')[1]);
          selectorCamel = _.upperFirst(_.camelCase(selector));
      } else if (argument.includes('inject')) {
          inject = argument.split('=')[1].split(',');
          if(argument.split('=')[1].split(',').length == 0){
           inject = [argument];
          }
      }
    });
    if (selector == null) {
        this.log.error("You must specify a selector");
        done();
        return;
    }
    destinationPath = config.src.paths.base+config.src.paths.app+config.src.paths.directives;
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
        this.templatePath('directive.ts.tpl'),
        this.destinationPath(destinationPath+"/"+selector+".directive.ts"),{
          moduleCamel:moduleCamel,
          selector:selector,
          link:this.options.link,
          compile: this.options.compile,
          injectName:injectName,
          selectorCamel:selectorCamel,
          injectConstructor:injectConstructor,
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath('directive.ts.tpl'),
        this.destinationPath(destinationPath+"/"+selector+".directive.ts"),{
          moduleCamel:moduleCamel,
          selector:selector,
          injectName:false,
          link:this.options.link,
          compile: this.options.compile,
          injectConstructor:false,
          selectorCamel:selectorCamel,
        }
      );
    }
    if(!this.options.noTest){

      var testDir = config.tests.paths.base + config.tests.paths.directives;
      this.fs.copyTpl(
        this.templatePath('directive.spec.ts.tpl'),
        this.destinationPath(testDir+"/"+selector+".directive.spec.ts"),{
          moduleName:config.moduleName,
          moduleCamel:moduleCamel,
          selector:selector,
          selectorCamel:selectorCamel
        }
      );
    }
  }
});
