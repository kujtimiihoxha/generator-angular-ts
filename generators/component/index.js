'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var componentUtil = require('./component-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    /*--Flags--*/
    /**
     * If true the generator will not create the test.
     */
    this.option("noTest");
    /**
     * The parent directory will be created.
     */
    this.option('forceParent');
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
     * Html tag.
     * @type {string|null}
     */
    var selector;

    /**
     * Component bindings.
     * @type {[]|null}
     */
    var bindings;


    /**
     * Dependencies
     * @type {[]|null}
     */
    var inject;

    /**
     * Parent
     * @type {string|null}
     */
    var parent;
    
    /*-----------*/

    var options = componentUtil.getOptions(this.arguments);
    selector = options.selector;
    inject = options.inject;
    bindings = options.bindings;
    parent = options.parent;

    /**
     * Bindings value in the decorator.
     */
    var bindingsValue;
    /**
     * Bindings as a controller parameter.
     */
    var bindingsParam;
    /**
     * If the option parent is not null determine the parent path.
     * @type {string}
     */
    var parentDirectory;
    /**
     * The module name
     * @type {string}
     */
    var module;
    /**
     * The template url.
     * @type {string}
     */
    var templateUrl;

    /**
     * The destination path
     */
    var destinationPath;

    if (selector === null) {
      this.log.error("You must specify a selector");
      done();
      return;
    }
    bindingsValue = componentUtil.getBindings(bindings).bindingsValue;
    bindingsParam = componentUtil.getBindings(bindings).bindingsParam;
    var that = this;
    parentDirectory = componentUtil.getParentDirectory(parent, config, this.options.forceParent, function () {
      that.log.error("No parent component with this name could be found");
      done();
    });
    module = componentUtil.getModule(parent);
    templateUrl = componentUtil.getTemplateUrl(parentDirectory, selector, config);
    destinationPath = componentUtil.getDestinationPath(parentDirectory, selector, config);
    var injects = componentUtil.getInjection(inject);
    this.fs.copyTpl(
      this.templatePath('component.ts.tpl'),
      this.destinationPath(destinationPath + "/" + selector + ".component.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        module: module,
        selector: selector,
        path: templateUrl,
        bindingsParam: bindingsParam,
        bindingsValue: bindingsValue,
        injectName: injects.injectName,
        selectorCamel: _.upperFirst(_.camelCase(selector)),
        injectConstructor: injects.injectConstructor
      }
    );
    this.fs.copyTpl(
      this.templatePath('component.scss.tpl'),
      this.destinationPath(destinationPath + "/" + selector + ".scss"), {
        selector: selector
      }
    );
    this.fs.copyTpl(
      this.templatePath('component.html.tpl'),
      this.destinationPath(destinationPath + "/" + selector + ".template.html"), {
        selector: selector
      }
    );
    if (!this.options.noTest) {
      var testDir;
      if (parentDirectory != null) {
        testDir = parentDirectory.replace(
            config.src.paths.base + config.src.paths.app + config.src.paths.components,
            config.tests.paths.base + config.tests.paths.components) + '/' + selector
      } else {
        testDir = config.tests.paths.base + config.tests.paths.components + '/' + selector;
      }
      this.fs.copyTpl(
        this.templatePath('component.spec.ts.tpl'),
        this.destinationPath(testDir + "/" + selector + ".component.spec.ts"), {
          moduleName: config.moduleName,
          moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
          module: module,
          selector: selector,
          selectorCamel: _.upperFirst(_.camelCase(selector))
        }
      );
    }
  }
});
