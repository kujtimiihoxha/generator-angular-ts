'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');
var ff = require('node-find-folder');
var folders = [];
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    // This makes `appname` a required argument.
    this.option('noTest');
    this.option('abstract');
    this.option('forceParent');
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
    var dir = null;
    var templateUrl = '';
    var module = '';
    var url = null;
    var routeName = null;
    var component = null;
    var parent = null;
    var inject = null;
    var destinationPath;
    var moduleCamel=_.upperFirst(_.camelCase(config.moduleName));
    this.arguments.forEach(function (argument) {
      if(argument.includes('name')){
        name =argument.split('=')[1];
      }  else if (argument.includes('inject')) {
        inject = argument.split('=')[1].split(',');
        if(argument.split('=')[1].split(',').length == 0){
          inject = [argument];
        }
      } else if (argument.includes('parent')) {
        parent = argument.split('=')[1];
      } else if (argument.includes('url')) {
        url = argument.split('=')[1];
      } else if (argument.includes('component')) {
        component = argument.split('=')[1];
      }
    });
    if(url ==null && !this.options.abstract){
      this.log.error("You must specify a url for the route");
      done();
      return;
    }
    if (name == null) {
      this.log.error("You must specify a name for the route");
      done();
      return;
    }
    if(parent != null) {
      parent= parent.replace(new RegExp('\\\\', 'g'), '/');
      parent=_.trim(parent,'/');
      var result = getDirectories(config.src.paths.base+config.src.paths.app+config.src.paths.routes);
      result.forEach(function (folder) {
          if(folder === (config.src.paths.base+config.src.paths.app+config.src.paths.routes+"/"+parent)){
            dir = folder;
          }
      });
      if(dir ==null){
        if(!this.options.forceParent) {
          this.log.error("No parent route with this name could be found");
          done();
          return;
        }
        else if (this.options.forceParent){
            parent=_.trimStart(parent,'/');
            parent=_.trimEnd(parent,'/');
            dir = config.src.paths.base+config.src.paths.app+config.src.paths.routes+"/"+ parent;
        }
      }
      var parents = parent.split('/');
      if(parent.split('/').length === 0){
         parents =[parent];
      }
      var parentsCamel=[];
      routeName='';
      parents.forEach(function (prnt) {
        routeName=  routeName + '.' + _.camelCase(prnt);
        module=  module + '.' + _.upperFirst(_.camelCase(prnt));
      });

      routeName= routeName +'.'+ _.camelCase(name);
      routeName= _.trimStart(routeName,'.');
    } else {
      routeName = _.camelCase(name);
    }

    if(dir != null){
      templateUrl = config.templates.options.prefix+dir.replace(config.src.paths.base+config.src.paths.app +'/','')+'/'+_.kebabCase(name)+"/"+_.kebabCase(name)+".template.html";
      destinationPath = dir+'/'+_.kebabCase(name)
    } else {
      templateUrl = config.templates.options.prefix+_.trim(config.src.paths.routes,'/')+'/'+_.kebabCase(name)+"/"+_.kebabCase(name)+".template.html";
      destinationPath = config.src.paths.base+config.src.paths.app+config.src.paths.routes+'/'+_.kebabCase(name)
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

      if(component !=null) {
        this.fs.copyTpl(
          this.templatePath('route.ts.tpl'),
          this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".route.ts"),{
            moduleCamel:moduleCamel,
            routeUrl:url,
            module:module,
            routeName:routeName,
            component:component,
            templateUrl:templateUrl,
            abstract: this.options.abstract,
            name:_.upperFirst(_.camelCase(name)),
            injectName:injectName,
            injectConstructor:injectConstructor
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('route.ts.tpl'),
          this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".route.ts"),{
            moduleCamel:moduleCamel,
            routeUrl:url,
            routeName:routeName,
            module:module,
            component:false,
            templateUrl:templateUrl,
            abstract: this.options.abstract,
            name:_.upperFirst(_.camelCase(name)),
            injectName:injectName,
            injectConstructor:injectConstructor
          }
        );
      }
    }
    else {
      if(component !=null) {
        this.fs.copyTpl(
          this.templatePath('route.ts.tpl'),
          this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".route.ts"),{
            moduleCamel:moduleCamel,
            module:module,
            routeName:routeName,
            routeUrl:url,
            component:component,
            templateUrl:templateUrl,
            abstract: this.options.abstract,
            name:_.upperFirst(_.camelCase(name)),
            injectName:false,
            injectConstructor:false
          }
        );
      } else {
        console.log("ktu");
        this.fs.copyTpl(
          this.templatePath('route.ts.tpl'),
          this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".route.ts"),{
            moduleCamel:moduleCamel,
            module:module,
            routeUrl:url,
            routeName:routeName,
            component:false,
            templateUrl:templateUrl,
            abstract: this.options.abstract,
            name:_.upperFirst(_.camelCase(name)),
            injectName:false,
            injectConstructor:false
          }
        );
      }
    }
    if(component == null) {
      this.fs.copyTpl(
        this.templatePath('route.html.tpl'),
        this.destinationPath(destinationPath+"/"+_.kebabCase(name)+".template.html"),{
          route:_.kebabCase(name),
          url:url
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
