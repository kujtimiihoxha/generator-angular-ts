var _ = require('lodash');
var fs = require('fs');
/**
 * The folders and subfolders of the route directory
 * @type {[]}
 */
var folders = [];
module.exports = {
  getOptions: function (arguments) {
    /**
     * Name
     * @type {string|null}
     */
    var name = null;
    /**
     * Inject
     * @type {[]|null}
     */
    var inject = null;
    /**
     * Parent
     * @type {string|null}
     */
    var parent = null;

    arguments.forEach(function (argument) {
      if (argument.includes('inject')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          inject = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            inject = [argument];
          }
        }
      } else if (argument.includes('name')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          name = _.upperFirst(_.camelCase(argument.split('=')[1]));
        }
      } else if (argument.includes('parent')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          parent = argument.split('=')[1];
        }
      }
    });
    return {
      name: name,
      inject: inject,
      parent: parent
    }
  },
  getParentDirectory: function (parent,config, forceParent,errorCallback) {
    var parentDirectory=null;
    if(parent !== null){
      parent = parent.replace(new RegExp('\\\\', 'g'), '/');
      parent = _.trim(parent, '/');
      var result = getDirectories(config.src.paths.base + config.src.paths.app + config.src.paths.services);
      result.forEach(function (folder) {
        if (folder === (config.src.paths.base + config.src.paths.app + config.src.paths.services + "/" + parent)) {
          parentDirectory = folder;
        }
      });
      if (parentDirectory == null) {
        if (!forceParent) {
          errorCallback();
        }
        else {
          parent = _.trimStart(parent, '/');
          parent = _.trimEnd(parent, '/');
          return config.src.paths.base + config.src.paths.app + config.src.paths.services + "/" + parent;
        }
      }
      return parentDirectory;
    }
    return parentDirectory;
  },

  getModule: function (parent) {
    var module='';
    if(parent !== null){
      var parents = parent.split('/');
      if (parent.split('/').length === 0) {
        parents = [parent];
      }
      parents.forEach(function (prnt) {
        module = module + '.' + _.upperFirst(_.camelCase(prnt));
      });
    }
    return {
      module:module
    };
  },
  getTemplateUrl: function (parentDirectory,name,config) {
    var templateUrl;
    if (parentDirectory != null) {
      templateUrl = config.src.templates.options.prefix
        + parentDirectory.replace(config.src.paths.base + config.src.paths.app + '/', '')
        + '/'
        + _.kebabCase(name)
        + "/"
        + _.kebabCase(name)
        + ".template.html";
    } else {
      templateUrl = config.src.templates.options.prefix
        + _.trim(config.src.paths.routes, '/')
        + '/'
        + _.kebabCase(name)
        + "/"
        + _.kebabCase(name)
        + ".template.html";
    }
    return templateUrl;
  },
  getDestinationPath:function (parentDirectory, name, config) {
    var destinationPath;
    if (parentDirectory != null) {
      destinationPath = parentDirectory
    } else {
      destinationPath = config.src.paths.base
        + config.src.paths.app
        + config.src.paths.services
    }
    return destinationPath;
  },
  getInjection:function (inject) {
    var injectName ='';
    var injectConstructor ='';
    if(inject != null) {
      inject.forEach(function (dep) {
        injectName = injectName + "," + '"' + dep + '"';
        injectConstructor = injectConstructor + ",private " + _.camelCase(dep) + ": any";
      });
      injectName = _.trim(injectName, ',');
      injectConstructor = _.trim(injectConstructor, ',');
    } else {
      injectName = null;
      injectConstructor = null;
    }
    return {
      injectName: injectName,
      injectConstructor:injectConstructor
    }
  }
};

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
