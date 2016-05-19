'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var directiveUtil = require('./directive-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    /*--Flags--*/
    /**
     * If true the generator will not create the test.
     */
    this.option('noTest');
    /**
     * If true the link function will be implemented.
     */
    this.option('link');
    /**
     * If true the compile function will be implemented
     */
    this.option('compile');

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
     * Html attribute.
     * @type {string|null}
     */
    var selector;
    /**
     * Dependencies
     * @type {[]|null}
     */
    var inject;

    /*-----------*/

    var options = directiveUtil.getOptions(this.arguments);
    selector = options.selector;
    inject = options.inject;
    if (selector == null || selector === '') {
      this.log.error("You must specify a selector");
      done();
      return;
    }
    var destinationPath = directiveUtil.getDestinationPath(config);
    var injects = directiveUtil.getInjection(inject);
    this.fs.copyTpl(
      this.templatePath('directive.ts.tpl'),
      this.destinationPath(destinationPath + "/" + selector + ".directive.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        selector: selector,
        link: this.options.link,
        compile: this.options.compile,
        injectName: injects.injectName,
        selectorCamel: _.upperFirst(_.camelCase(selector)),
        injectConstructor: injects.injectConstructor
      }
    );
    if (!this.options.noTest) {
      var testDir = config.tests.paths.base + config.tests.paths.directives;
      this.fs.copyTpl(
        this.templatePath('directive.spec.ts.tpl'),
        this.destinationPath(testDir + "/" + selector + ".directive.spec.ts"), {
          moduleName: config.moduleName,
          moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
          selector: selector,
          selectorCamel: _.upperFirst(_.camelCase(selector))
        }
      );
    }
  }
});
