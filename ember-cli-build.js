/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');


module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        outputPaths: {
            app: {
                html: 'index.html',
                css: {
                    'app': '/assets/css/cats-client.css'
                },
                js: '/assets/js/cats-client.js'
            },
            vendor: {
                css: '/assets/css/vendor.css',
                js: '/assets/js/vendor.js'
            }
        }
    });


    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.


    app.import('bower_components/jquery/dist/jquery.min.js');

    app.import('bower_components/jquery/dist/jquery.min.js');

    app.import('bower_components/slimScroll/jquery.slimscroll.min.js');

    app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

    app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

    app.import('bower_components/admin-lte/dist/css/AdminLTE.min.css');

    app.import('bower_components/admin-lte/dist/css/skins/skin-blue-light.css');

    app.import('bower_components/font-awesome/css/font-awesome.min.css');

    var fontAwesomeFonts = new Funnel('bower_components/font-awesome/fonts', {
        destDir: 'assets/fonts'
    });




    return MergeTrees([app.toTree(), fontAwesomeFonts]);
};