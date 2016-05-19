'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    /*--Flags--*/
    /**
     * If true the generator will create the app clean.
     */
    this.option("clean");
    /*---------*/

  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-angular-ts') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Your project name ?',
      default: this.appname
    },{
      type: 'input',
      name: 'version',
      message: 'Project version ?',
      default: '1.0.0'
    },{
      type: 'input',
      name: 'author',
      message: 'Project author ?',
      default: ""
    },{
      type: 'input',
      name: 'description',
      message: 'Project description ?',
      default: ""
    },{
      type: 'input',
      name: 'licence',
      message: 'Project licence ?',
      default: "MIT"
    },{
      type: 'input',
      name: 'appModule',
      message: 'Project main angular module ?',
      default: _.camelCase(this.appname)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
     if(this.options.clean){
       this.fs.copyTpl(
         this.templatePath('angular-ts-clean'),
         this.destinationRoot(),{
           appName:this.props.appName,
           appVersion: this.props.version,
           appDescription:this.props.description,
           appAuthor:this.props.author,
           appLicence:this.props.licence,
           appModule:this.props.appModule,
           appModuleCamel: _.upperFirst(_.camelCase(this.props.appModule))
         }
       );
       this.fs.copyTpl(
         this.templatePath('angular-ts-clean/**/.*'),
         this.destinationRoot(),{
           appName:this.props.appName,
           appVersion: this.props.version,
           appDescription:this.props.description,
           appAuthor:this.props.author,
           appLicence:this.props.licence,
           appModule:this.props.appModule,
           appModuleCamel: _.upperFirst(_.camelCase(this.props.appModule))
         }
       );
     }
  },

  install: function () {
    this.installDependencies({
      npm:true,
      bower:true
    });
    this.spawnCommand('typings', ['install']);
  }
});
