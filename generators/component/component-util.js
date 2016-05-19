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
     * Html tag.
     * @type {string|null}
     */
    var selector = null;

    /**
     * Dependencies
     * @type {[]|null}
     */
    var inject = null;

    /**
     * Parent
     * @type {string|null}
     */
    var parent = null;
    /**
     * Component bindings.
     * @type {[]|null}
     */
    var bindings = null;

    arguments.forEach(function (argument) {
      if (argument.includes('selector')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          selector = _.kebabCase(argument.split('=')[1]);
        }
      } else if (argument.includes('parent')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          parent = argument.split('=')[1];
        }
      } else if (argument.includes('bind')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          bindings = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            bindings = [argument];
          }
        }
      } else if (argument.includes('inject')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          inject = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            inject = [argument];
          }
        }
      }
    });

    return {
      selector: selector,
      inject: inject,
      parent: parent,
      bindings: bindings
    }
  },
  getBindings: function (bindings) {
    var bindingsValue = null;
    var bindingsParam = null;
    if (bindings !== null) {
      bindingsValue = '';
      bindingsParam = '';
      bindings.forEach(function (bind) {
        bindingsValue = bindingsValue + "\t\t\t" + _.camelCase(bind) + ":'<'" + ',//object input\n';
        bindingsParam = bindingsParam + "\t\t" + _.camelCase(bind) + ": any" + ';\n'
      });
      bindingsValue = bindingsValue.substring(0, bindingsValue.length - ',//object input\n'.length) + "//object input";
   }

    return {
      bindingsValue: bindingsValue,
      bindingsParam: bindingsParam
    }
  },
  getParentDirectory: function (parent, config, forceParent, errorCallback) {
    var parentDirectory = null;
    if (parent !== null) {
      parent = parent.replace(new RegExp('\\\\', 'g'), '/');
      parent = _.trim(parent, '/');
      var result = getDirectories(config.src.paths.base + config.src.paths.app + config.src.paths.components);
      result.forEach(function (folder) {
        if (folder === (config.src.paths.base + config.src.paths.app + config.src.paths.components + "/" + parent)) {
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
          return config.src.paths.base + config.src.paths.app + config.src.paths.components + "/" + parent;
        }
      }
      return parentDirectory;
    }
    return parentDirectory;
  },

  getModule: function (parent) {
    var module = '';
    if (parent !== null) {
      var parents = parent.split('/');
      if (parent.split('/').length === 0) {
        parents = [parent];
      }
      parents.forEach(function (prnt) {
        module = module + '.' + _.upperFirst(_.camelCase(prnt));
      });

    }
    return module;
  },
  getTemplateUrl: function (parentDirectory, selector, config) {
    var templateUrl;
    if (parentDirectory != null) {
      templateUrl = config.src.templates.options.prefix
        + parentDirectory.replace(config.src.paths.base + config.src.paths.app + '/', '')
        + '/'
        + selector;
    } else {
      templateUrl = config.src.templates.options.prefix
        + _.trim(config.src.paths.components, '/')
        + '/'
        + selector;
    }
    return templateUrl;
  },
  getDestinationPath: function (parentDirectory, selector, config) {
    var destinationPath;
    if (parentDirectory != null) {
      destinationPath = parentDirectory + '/' + selector
    } else {
      destinationPath = config.src.paths.base
        + config.src.paths.app
        + config.src.paths.components
        + '/'
        + selector
    }
    return destinationPath;
  },
  getInjection: function (inject) {
    var injectName='';
    var injectConstructor='';

    if (inject != null) {
      inject.forEach(function (dep) {
        injectName = injectName + "," + '"' +dep + '"';
        injectConstructor = injectConstructor + ",private "  +_.camelCase(dep) + ": any";
      });
      injectName = _.trim(injectName,',');
      injectConstructor = _.trim(injectConstructor,',');
    } else {
      injectName = null;
      injectConstructor = null;
    }
    return {
      injectName: injectName,
      injectConstructor: injectConstructor
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
