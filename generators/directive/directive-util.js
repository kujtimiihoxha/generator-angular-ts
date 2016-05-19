var _ = require('lodash');
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

    arguments.forEach(function (argument) {
      if (argument.includes('selector')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          selector = _.kebabCase(argument.split('=')[1]);
        }
      } else if (argument.includes('inject')) {
        if (argument.split('=').length === 2 && argument.split('=')[1] !== '') {
          inject = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            inject = [argument];
          }
        }
      }
    });

    return {
      selector: selector,
      inject: inject
    }
  },
  getDestinationPath: function (config) {
    return config.src.paths.base+config.src.paths.app+config.src.paths.directives;
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
