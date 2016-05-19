'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var constantUtil = require('./constant-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

  },
  writing: function () {
    /**
     * Config
     */
    var config = null;
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
    /*-----------*/

    var options = constantUtil.getOptions(this.arguments);
    name = options.name;
    if (name == null) {
      this.log.error("You must specify a name for the constant file");
      done();
      return;
    }
    var destinationPath = constantUtil.getDestinationPath(config);
    this.fs.copyTpl(
      this.templatePath('constant.ts.tpl'),
      this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".constant.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        constantName: name
      }
    );
  }
});
