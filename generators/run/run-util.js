var _ = require('lodash');
module.exports = {
  getOptions: function (arguments) {

    /**
     * Config name.
     * @type {string|null}
     */
    var name = null;

    /**
     * Dependencies
     * @type {[]|null}
     */
    var inject = null;

    arguments.forEach(function (argument) {
      if (argument.includes('inject')) {
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          inject = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            inject = [argument];
          }
        }
      } else if(argument.includes('name')){
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          name = _.upperFirst(_.camelCase(argument.split('=')[1]));
        }
      }
    });
    return {
      name: name,
      inject: inject
    }
  },
  getDestinationPath: function (config) {
   return config.src.paths.base+config.src.paths.app+config.src.paths.run;
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
