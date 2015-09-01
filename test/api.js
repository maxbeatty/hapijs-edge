var Lab = require('lab');
var Code = require('code');

var Api = require('../api');

var lab = exports.lab = Lab.script();

lab.experiment('api', function () {

    lab.test('exists', function (done) {

        Code.expect(Api.register.attributes.name).to.equal('api');

        done();
    });

    lab.test('runs', function (done) {

        Api.register({}, {}, done);
    });
});
