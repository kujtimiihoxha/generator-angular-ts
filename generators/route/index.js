'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var routUtil = require('./route-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    /*--Flags--*/
    /**
     * The route is abstract.
     */
    this.option('abstract');
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
     * The route name
     */
    var name;
    /**
     * Dependencies
     */
    var inject;
    /**
     * The parent directory
     */
    var parent;
    /**
     * The url
     */
    var url;
    /**
     * The component
     */
    var component;

    /*-----------*/

    var options = routUtil.getOptions(this.arguments);
    name = options.name;
    inject = options.inject;
    parent = options.parent;
    url = options.url;
    component = options.component;
    /**
     * If the name is not given throw an error.
     */
    if (name == null) {
      this.log.error("You must specify a name for the route");
      done();
      return;
    }

    /**
     * If the url is not given and the route is not abstract throw error.
     */
    if (url == null && !this.options.abstract) {
      this.log.error("You must specify a url for the route");
      done();
      return;
    }
    /**
     * If the option parent is not null determine the parent path.
     * @type {string}
     */
    var parentDirectory;
    /**
     * The template url.
     * @type {string}
     */
    var templateUrl;
    /**
     * The module name
     * @type {string}
     */
    var module;
    /**
     * The state name;
     */
    var stateName;
    /**
     * The destination path
     */
    var destinationPath;

    var that= this;
    parentDirectory = routUtil.getParentDirectory(parent,config,this.options.forceParent,function () {
      that.log.error("No parent route with this name could be found");
      done();
    });
    stateName= routUtil.getStateName(parent,name).stateName;
    module= routUtil.getStateName(parent,name).module;
    templateUrl=routUtil.getTemplateUrl(parentDirectory,name,config);
    destinationPath = routUtil.getDestinationPath(parentDirectory,name,config);
    var injects = routUtil.getInjection(inject);
    this.fs.copyTpl(
      this.templatePath('route.ts.tpl'),
      this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".route.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        routeUrl: url,
        module: module,
        routeName: stateName,
        component: component,
        templateUrl: templateUrl,
        abstract: this.options.abstract,
        name: _.upperFirst(_.camelCase(name)),
        injectName: injects.injectName,
        injectConstructor: injects.injectConstructor
      }
    );
    if (component === null) {
      this.fs.copyTpl(
        this.templatePath('route.html.tpl'),
        this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".template.html"), {
          route: _.kebabCase(name),
          url: url
        }
      );
    }
  }
});
