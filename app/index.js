/**
 * Created by ericjohndixon on 3/15/16.
 */
'use strict';

var generators = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    yosay = require('yosay');


module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        //this.argument('appname', { type: String, required: true});
        //this.appname = _.kebabCase(this.appname);
        //this.log('appname (arg): ' + this.appname);
    },

    initializing : function() {

    },
    prompting: function() {
        this.log(yosay('Welcome to ' + chalk.yellow('ANG-COMPONENT') + ' generator!'));

        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'Angular App Name (ng-app)',
            default: 'app'
        }, {
            type: 'input',
            name: 'readmedescription',
            message: 'README description',
            default: 'This is an Angular Component...'
        }], function(answers){
            this.appname = answers.appname;
            this.readmedescription = answers.readmedescription;
            done();
        }.bind(this));
    },
    configuring: function() {

    },
    writing: {
        gulpfile: function() {
            this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js'),
                {
                    ngapp: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('_gulp.config.js'),
                this.destinationPath('gulp.config.js'),
                {
                    ngapp: this.appname
                }
            );
        },
        packageJSON: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {
                    ngapp: this.appname
                }
            )
        },

        git: function() {
            this.copy('gitignore', '.gitignore');
        },

        bower: function() {
            var bowerJson = {
                name: this.appname,
                license: 'MIT',
                dependencies: {}
            };

            bowerJson.dependencies['angular'] = '~1.4.6';
            this.fs.writeJSON('bower.json', bowerJson);
            this.copy('bowerrc', '.bowerrc');
        },

        appStaticFiles: function () {
            //this.log('Template path: ' + this.templatePath());
            //this.log('Destination path: ' + this.destinationPath());
            //var source = this.templatePath('_favicon.ico');
            //var destination = this.destinationPath('src/favicon.ico');
            //this.log('Source: ' + source);
            //this.log('Destination: ' + destination);
            //this.copy('_favicon.ico', 'src/favicon.ico');
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                {
                    readmedescription: this.readmedescription,
                    ngapp: this.appname
                }
            );
            this.copy('app/_app.scss', 'src/' + this.appname + '.scss'); //for directories
        },

        scripts: function() {
            this.fs.copyTpl(
                this.templatePath('app/_app.js'),
                this.destinationPath('src/' + this.appname + '.js'),
                {
                    ngapp: this.appname
                }
            )
        },

        html: function() {
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('index.html'),
                {
                    appname: _.startCase(this.appname),
                    ngapp: this.appname
                }
            )
        }
    },
    conflicts: function() {

    },
    install: function() {
        //performs bower install and npm install
        this.installDependencies()
    },
    end: function() {
        this.log(chalk.yellow.bold('Installation successful!'));

        var howToPublish =
            '\nAfter you have completed development on your angular component you may publish to the bower.ldschurch registry in order to be used in other projects.' +
            '\nFirst, you must make sure you have this project committed to a remote repo (ie Stash or Git). After committing project to a repo, you simply use the command:' +
            '\n\n' + chalk.yellow.bold('bower register <my-package-name> <git-endpoint>') +
            '\n\nFor Example:' +
            '\n' + chalk.yellow.bold('bower register example-component git://github.com/user/example-component.git') +
            '\n\nAnd wallah! you may now use ' + chalk.yellow.bold('bower install example-component') + ' in any of your applications to add this component to your project.';

        this.log(howToPublish);
    }
});