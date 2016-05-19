var _ = require('lodash');
module.exports = {
  getOptions: function (arguments) {

    /**
     * Html tag.
     * @type {string|null}
     */
    var name = null;

    /**
     * Dependencies
     * @type {[]|null}
     */
    var param = null;

    arguments.forEach(function (argument) {
      if(argument.includes('name')){
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          name = _.upperFirst(_.camelCase(argument.split('=')[1]));
        }
      } else if(argument.includes('param')){
        if(argument.split('=').length === 2 && argument.split('=')[1]!=='') {
          param = argument.split('=')[1].split(',');
          if (argument.split('=')[1].split(',').length == 0) {
            param = [argument];
          }
        }
      }
    });

    return {
      name: name,
      param: param
    }
  },
  getDestinationPath: function (config) {
    return config.src.paths.base+config.src.paths.app+config.src.paths.filters;
  },
  getParams: function (param) {
    var parameters =null;
    if(param !=null) {
      parameters='';
      param.forEach(function (par) {
        parameters = parameters + par + ': any ,'
      });
      parameters = _.trimEnd(parameters, ',');
    }
    return parameters;
  }
};
