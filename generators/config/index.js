'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var configUtil = require('./config-util');
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

    var options = configUtil.getOptions(this.arguments);
    name = options.name;
    inject = options.inject;
    
    if (name == null) {
      this.log.error("You must specify a name for the config");
      done();
      return;
    }
    
 
    var destinationPath = configUtil.getDestinationPath(config);

    var injects = configUtil.getInjection(inject);
    this.fs.copyTpl(
      this.templatePath('config.ts.tpl'),
      this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".config.ts"),{
        moduleCamel:_.upperFirst(_.camelCase(config.moduleName)),
        configName:name,
        injectName:injects.injectName,
        injectConstructor:injects.injectConstructor
      }
    );
  }
});
