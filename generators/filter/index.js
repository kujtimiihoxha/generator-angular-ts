'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var filterUtil = require('./filter-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    /*--Flags--*/
    /**
     * If true the generator will not create the test.
     */
    this.option('noTest');

    /*---------*/

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
     * The filter name
     */
    var name;
    /**
     * Filter parameters
     */
    var param;
    /*-----------*/

    var options = filterUtil.getOptions(this.arguments);
    name = options.name;
    param = options.param;

    if (name == null) {
      this.log.error("You must specify a name for the config file");
      done();
      return;
    }

    var destinationPath = filterUtil.getDestinationPath(config);
    this.fs.copyTpl(
      this.templatePath('filter.ts.tpl'),
      this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".filter.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        filterName: name,
        parameters: filterUtil.getParams(param),
        filter: _.camelCase(name)
      }
    );
    if (!this.options.noTest) {

      var testDir = config.tests.paths.base + config.tests.paths.filters;
      this.fs.copyTpl(
        this.templatePath('filter.spec.ts.tpl'),
        this.destinationPath(testDir + '/' + _.camelCase(name) + ".filter.spec.ts"), {
          moduleName: config.moduleName,
          moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
          filterName: name,
          filter: _.camelCase(name)
        }
      );
    }
  }
});
