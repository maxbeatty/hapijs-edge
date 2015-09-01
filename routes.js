exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply();
        }
    });

    next();
};

exports.register.attributes = {
    name: 'routes'
};
