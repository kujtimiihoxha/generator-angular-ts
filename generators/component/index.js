'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var ff = require('node-find-folder');
var folders=[];
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.option("noTest");
    this.option('forceParent');
    // And you can then access it later on this way; e.g. CamelCased
  },
  writing: function () {
    var dir = null;
    var module='';
    var bindingsValue='';
    var bindingsParam='';
    var parent = null;
    var bindings = null;
    var bind = false;
    var selector = null;
    var selectorCamel = null;
    var inject = null;
    var templateUrl = '';
    var destinationPath;
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

    var moduleCamel=_.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
      if (argument.includes('selector')) {
          selector=_.kebabCase(argument.split('=')[1]);
          selectorCamel = _.upperFirst(_.camelCase(selector));
      } else if (argument.includes('parent')) {
        parent=argument.split('=')[1];
      }  else if (argument.includes('bind')) {
        bindings = argument.split('=')[1].split(',');
        if(argument.split('=')[1].split(',').length == 0){
          bindings = [argument];
        }
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
    if(bindings!=null){
      bind=true;
      bindings.forEach(function (bind) {
        bindingsValue =bindingsValue+"\t\t\t"+ _.camelCase(bind)+":'<'" + ',//object input\n';
        bindingsParam =bindingsParam+"\t\t"+ _.camelCase(bind)+": any" + ';\n'
      });
      bindingsValue = bindingsValue.substring(0,bindingsValue.length -',//object input\n'.length)+"//object input";
    }
    if(parent != null) {
      parent= parent.replace(new RegExp('\\\\', 'g'), '/');
      parent=_.trim(parent,'/');

      var result = getDirectories(config.src.paths.base+config.src.paths.app+config.src.paths.components);
      result.forEach(function (folder) {
          if(folder === (config.src.paths.base+config.src.paths.app+config.src.paths.components+"/"+parent)){
            dir = folder;
          }
      });
      if(dir == null){
        if (!this.options.forceParent) {
          this.log.error("No component with this name could be found");
          done();
          return;
        }
        else if (this.options.forceParent) {
          parent = _.trimStart(parent, '/');
          parent = _.trimEnd(parent, '/');
          dir = config.src.paths.base+config.src.paths.app+config.src.paths.components+"/"+ parent;
        }
      }

      var parents = parent.split('/');
      if(parent.split('/').length === 0){
          parents =[parent];
      }
      parents.forEach(function (prnt) {
        module=  module + '.' + _.upperFirst(_.camelCase(prnt));
      })
    }
    if(dir != null){
      templateUrl = config.src.templates.options.prefix+dir.replace(config.src.paths.base+config.src.paths.app +'/','')+'/'+selector;
      destinationPath = dir+'/'+selector

    } else {
      templateUrl = config.src.templates.options.prefix+_.trim(config.src.paths.components,'/')+'/'+selector;
      destinationPath = config.src.paths.base+config.src.paths.app+config.src.paths.components+'/'+selector
    }
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
        this.templatePath('component.ts.tpl'),
        this.destinationPath(destinationPath+"/"+selector+".component.ts"),{
          moduleCamel:moduleCamel,
          module:module,
          selector:selector,
          path:templateUrl,
          bindings:bind,
          bindingsParam:bindingsParam,
          bindingsValue:bindingsValue,
          injectName:injectName,
          selectorCamel:selectorCamel,
          injectConstructor:injectConstructor,
        }
      );
    }
    else {
      console.log(moduleCamel,module,selector,templateUrl,bindingsValue,bindingsParam,bind,selectorCamel);

      this.fs.copyTpl(
        this.templatePath('component.ts.tpl'),
        this.destinationPath(destinationPath+"/"+selector+".component.ts"),{
          moduleCamel:moduleCamel,
          module:module,
          selector:selector,
          path:templateUrl,
          bindingsValue:bindingsValue,
          bindingsParam:bindingsParam,
          injectName:false,
          bindings:bind,
          injectConstructor:false,
          selectorCamel:selectorCamel
        }
      );
    }
    this.fs.copyTpl(
      this.templatePath('component.scss.tpl'),
      this.destinationPath(destinationPath+"/"+selector+".scss"),{
        selector:selector
      }
    );
    this.fs.copyTpl(
      this.templatePath('component.html.tpl'),
      this.destinationPath(destinationPath+"/"+selector+".template.html"),{
        selector:selector
      }
    );
    if(!this.options.noTest){

      var testDir;
      if(dir != null){
        testDir = dir.replace(
          config.src.paths.base+config.src.paths.app+config.src.paths.components,
          config.tests.paths.base + config.tests.paths.components)+'/'+selector
      } else {
        testDir = config.tests.paths.base + config.tests.paths.components+'/'+selector;
      }
      this.fs.copyTpl(
        this.templatePath('component.spec.ts.tpl'),
        this.destinationPath(testDir+"/"+selector+".component.spec.ts"),{
          moduleName:config.moduleName,
          moduleCamel:moduleCamel,
          module:module,
          selector:selector,
          selectorCamel:selectorCamel,
        }
      );
    }
  }
});
function getDirectories(srcpath) {
  var items =fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync('./'+srcpath+'/'+ file).isDirectory();
  });
  for (var i=0; i<items.length; i++) {
    var file = srcpath + '/' + items[i];
    folders.push(file);
    getDirectories(file);
  }
  return folders;
}
