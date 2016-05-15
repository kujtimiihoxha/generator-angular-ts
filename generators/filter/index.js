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
    var name = null;
    var param = null;
    var parameters = '';
    var destinationPath;
    var moduleCamel=_.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
      if(argument.includes('name')){
          name = _.upperFirst(_.camelCase(argument.split('=')[1]));
      } else if(argument.includes('param')){
        param = argument.split('=')[1].split(',');
        if(argument.split('=')[1].split(',').length == 0){
          param = [argument];
        }
      }
    });
    if (name == null) {
      this.log.error("You must specify a name for the config file");
      done();
      return;
    }
    destinationPath = config.src.paths.base+config.src.paths.app+config.src.paths.filters;
    if(param !=null){
      param.forEach(function (par) {
        parameters = parameters +par + ': any ,'
      });
      parameters = _.trimEnd(parameters,',');
      this.fs.copyTpl(
        this.templatePath('filter.ts.tpl'),
        this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".filter.ts"),{
          moduleCamel:moduleCamel,
          filterName:name,
          parameters:parameters,
          filter:_.camelCase(name)
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath('filter.ts.tpl'),
        this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".filter.ts"),{
          moduleCamel:moduleCamel,
          filterName:name,
          parameters:false,
          filter:_.camelCase(name)
        }
      );
    }
    if(!this.options.noTest){

      var testDir = config.tests.paths.base + config.tests.paths.filters;
      this.fs.copyTpl(
        this.templatePath('filter.spec.ts.tpl'),
        this.destinationPath(testDir+'/'+_.camelCase(name)+".filter.spec.ts"),{
          moduleName:config.moduleName,
          moduleCamel:moduleCamel,
          filterName:name,
          filter:_.camelCase(name)
        }
      );
    }
  }
});
