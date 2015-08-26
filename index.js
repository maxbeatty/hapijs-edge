var Async = require('async');
var Bell = require('bell');
var Blipp = require('blipp');
var Hapi = require('hapi');
var HapiAuthCookie = require('hapi-auth-cookie');
var Hoek = require('hoek');
var Api = require('./api');
var Authentication = require('./authentication');
var Controllers = require('./controllers');
var Models = require('./models');
var Routes = require('./routes');

var internals = {
    servers: {
        http: {
            port: 8080,
            host: '0.0.0.0',
            labels: ['http']
        },
        api: {
            port: 8088,
            host: '0.0.0.0',
            labels: ['api']
        }
    },
    options: {
        files: {
            relativeTo: __dirname
        }
    }
};

exports.init = function (callback) {

    var server = new Hapi.Server();
    server.connection(internals.servers.http);
    server.connection(internals.servers.api);

    server.path(internals.options.files.relativeTo);

    server.on('request-error', function (request, response) {

        console.log('request-error:');
        console.dir(response);
    });

    var registerHttpPlugins = function (next) {

        server.register([
            Bell,
            Blipp,
            HapiAuthCookie,
            Authentication,
            Controllers,
            Models,
            Routes
        ],
        { select: 'http' },
        function (err) {

            return next(err);
        });
    };

    var registerApiPlugins = function (next) {

        server.register([
            Blipp,
            Controllers,
            Models,
            Api
        ],
        { select: 'api' },
        function (err) {

            return next(err);
        }
        );
    };

    Async.auto({
        http: registerApiPlugins,
        api: registerApiPlugins
    }, function (err, data) {

        if (err) {
            console.log('server.register err:', err);
            return callback(err);
        }

        server.start(function () {

            return callback(null, server);
        });
    });

};

exports.init(Hoek.ignore);
