module.exports = function () {
    var app = 'src/app/';
    //var homeViews = 'views/home/';

    var config = {
        //homeViews: homeViews,
        //index: homeViews + 'index.cshtml',
        index: 'index.html',
        buildTarget: './dist',
        appScss : './src/<%= ngapp %>.scss',
        appCss: './dist/<%= ngapp %>.css',
        appJs: app + '/',
        testFiles : testFiles = [
            '*.js'
            , './src/**/*.js'
            , '!Gruntfile.js'
            , '!gulpfile.js'
            , '!gulp.config.js'
            , '!bower_components/**'
            , '!node_modules/**'
            , '!config/**'
        ],
        js : [].concat(this.testFiles, '!**/*_test.js'),
        appName: '<%= ngapp %>',

        bower: {
            json: require('./bower.json'),
            directory: './lib/',
            ignorePath: './',
            relative: true
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};