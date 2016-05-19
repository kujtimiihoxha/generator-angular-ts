'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var serviceUtil = require('./service-util');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.option('noTest');
    this.option('forceParent');
    // And you can then access it later on this way; e.g. CamelCased
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

    /*-----------*/

    var options = serviceUtil.getOptions(this.arguments);
    name = options.name;
    inject = options.inject;
    parent = options.parent;

    if (name == null) {
      this.log.error("You must specify a name for the service");
      done();
      return;
    }
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
     * The destination path
     */
    var destinationPath;

    var that= this;
    parentDirectory = serviceUtil.getParentDirectory(parent,config,this.options.forceParent,function () {
      that.log.error("No parent route with this name could be found");
      done();
    });

    module= serviceUtil.getModule(parent).module;
    destinationPath = serviceUtil.getDestinationPath(parentDirectory,name,config);
    var injects = serviceUtil.getInjection(inject);

    this.fs.copyTpl(
      this.templatePath('service.ts.tpl'),
      this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".service.ts"), {
        moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
        module: module,
        serviceName: name,
        injectName: injects.injectName,
        injectConstructor: injects.injectConstructor
      }
    );
    if (!this.options.noTest) {
      var testDir;
      if (parentDirectory != null) {
        testDir = parentDirectory.replace(
          config.src.paths.base + config.src.paths.app + config.src.paths.services,
          config.tests.paths.base + config.tests.paths.services)
      } else {
        testDir = config.tests.paths.base + config.tests.paths.services;
      }
      this.fs.copyTpl(
        this.templatePath('service.spec.ts.tpl'),
        this.destinationPath(testDir + "/" + _.kebabCase(name) + ".spec.ts"), {
          moduleName: config.moduleName,
          moduleCamel: _.upperFirst(_.camelCase(config.moduleName)),
          module: module,
          serviceName: name
        }
      );
    }

  }
});

function getDirectories(srcpath) {
  var items = fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync('./' + srcpath + '/' + file).isDirectory();
  });
  for (var i = 0; i < items.length; i++) {
    var file = srcpath + '/' + items[i];
    folders.push(file);
    getDirectories(file);
  }
  return folders;
}
