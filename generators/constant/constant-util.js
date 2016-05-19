var _ = require('lodash');
module.exports = {
  getOptions: function (arguments) {

    /**
     * Constant name.
     * @type {string|null}
     */
    var name = null;

    arguments.forEach(function (argument) {
      if(argument.includes('name')){
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          name = _.upperFirst(_.camelCase(argument.split('=')[1]));
        }
      }
    });
    return {
      name: name
    }
  },
  getDestinationPath: function (config) {
   return config.src.paths.base+config.src.paths.app+config.src.paths.constants;
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
