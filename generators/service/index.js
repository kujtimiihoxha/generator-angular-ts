'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var enfsfind = require('enfsfind');
var ff = require('node-find-folder');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.option('no-test');
    this.option('force-parent');
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
    var inject = null;
    var parent = null;
    var module = '';
    var dir = null;
    var name = null;
    var destinationPath;
    var moduleCamel = _.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
      if (argument.includes('inject')) {
        inject = argument.split('=')[1].split(',');
        if (argument.split('=')[1].split(',').length == 0) {
          inject = [argument];
        }
      } else if (argument.includes('name')) {
        name = _.upperFirst(_.camelCase(argument.split('=')[1]));
      } else if (argument.includes('parent')) {
        parent = argument.split('=')[1];
      }
    });

    if (parent != null) {
      var result = new ff(parent, {nottraversal: ['**/*']});
      // console.log(result);

      result.forEach(function (folder) {
        if (_.startsWith(folder, config.src.paths.base)) {
          if (folder === (config.src.paths.base + config.src.paths.app + config.src.paths.services + "/" + parent)) {
            dir = folder;
          }
        }
      });
      if (dir == null && !this.options.forceParent) {
        if (!this.options.forceParent) {
          this.log.error("No parent folder with this name could be found");
          done();
          return;
        }
        else if (this.options.forceParent) {
          parent = _.trimStart(parent, '/');
          parent = _.trimEnd(parent, '/');
          dir = config.src.paths.base + config.src.paths.app + config.src.paths.services + "/" + parent;
        }
      }

      var parents = parent.split('/');
      if (parent.split('/').length === 0) {
        parents = [parent];
      }
      parents.forEach(function (prnt) {
        module = module + '.' + _.upperFirst(_.camelCase(prnt));
      });
    }
    if (dir != null) {
      destinationPath = dir
    } else {
      destinationPath = config.src.paths.base + config.src.paths.app + config.src.paths.services
    }
    if (inject != null) {
      var injectName = '';
      var injectConstructor = '';
      inject.forEach(function (dep) {
        injectName = injectName + "," + '"' + dep + '"';
        injectConstructor = injectConstructor + ",private " + _.camelCase(dep) + ": any";
      });
      injectName = _.trim(injectName, ',');
      injectConstructor = _.trim(injectConstructor, ',');
      this.fs.copyTpl(
        this.templatePath('service.ts.tpl'),
        this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".service.ts"), {
          moduleCamel: moduleCamel,
          module: module,
          serviceName: name,
          injectName: injectName,
          injectConstructor: injectConstructor
        }
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath('service.ts.tpl'),
        this.destinationPath(destinationPath + "/" + _.kebabCase(name) + ".service.ts"), {
          moduleCamel: moduleCamel,
          module: module,
          serviceName: name,
          injectName: false,
          injectConstructor: false
        }
      );
    }
    if (!this.options.noTest) {
      var testDir;
      if (dir != null) {
        testDir = dir.replace(
          config.src.paths.base + config.src.paths.app + config.src.paths.services,
          config.tests.paths.base + config.tests.paths.services)
      } else {
        testDir = config.tests.paths.base + config.tests.paths.services;
      }
      this.fs.copyTpl(
        this.templatePath('service.spec.ts.tpl'),
        this.destinationPath(testDir + "/" + _.kebabCase(name) + ".spec.ts"), {
          moduleName: config.moduleName,
          moduleCamel: moduleCamel,
          module: module,
          serviceName: name,
        }
      );
    }

  }
});
