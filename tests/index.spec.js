var expect = require('chai').expect;
var regenerateZ = require('../index');

describe('findReports', function () {

    it('should pass', function (done) {

        var results = regenerateZ.findReports();

        expect(results).to.be.equal(false);
        done();
    });
});
