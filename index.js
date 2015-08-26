var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('hello hapi');
    }
});

server.start( function (err) {

    console.log( server.info.uri);
});
