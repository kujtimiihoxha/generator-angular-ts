'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
module.exports = yeoman.Base.extend({

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
    },{
      type: 'input',
      name: 'email',
      message: 'Project email ?',
    },{
      type: 'input',
      name: 'appModule',
      message: 'Project main angular module ?',
      default: _.camelCase(this.appname)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('test'),
      this.destinationPath('.'),{
        hello:"HI"
      }
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
