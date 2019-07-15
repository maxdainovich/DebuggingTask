const reportsRepository = require('./reportsRepository');
const mongodb = require('mongodb')


const ObjectID = mongodb.ObjectID;

var branchCollection = [
    { _id: '5c5d86fbd5c001080f5764f2', name: 'Branch 1' },
    { _id: '5c5d86fbd5c001080f5764f3', name: 'Branch 2' },
    { _id: '5c5d86fbd5c001080f5764f4', name: 'Branch 3' },
    { _id: '5c5d86fbd5c001080f5764f5', name: 'Branch 4' },
];
var posCollection = [
    { _id: '5c5d86fcd5c001080f576518', name: 'POS 1' },
    { _id: '5c5d86fcd5c001080f576519', name: 'POS 2' }
];

const mapToObjectId = array => array.map(id => ObjectID(id));

const getReducer = filter => (accumulator, report) => {
    if (accumulator.indexOf(report[filter]) === -1) {
        accumulator.push(report[filter]);
    }
    return accumulator;
};

function findReports() {

    var existingReports = reportsRepository.getReports();

    var results = {
        branch: mapToObjectId(existingReports.reduce(getReducer('branch_id'), [])),
        pos: mapToObjectId(existingReports.reduce(getReducer('pos_id'), []))
    };

    var branches = branchCollection.filter(function (branch) {
        return results.branch.findIndex(function (branchResult) {
            return branchResult.toString() === branch._id;
        }) !== -1;
    });
    var pos = posCollection.filter(function (pos) {
        return results.pos.findIndex(function (posResult) {
            return posResult.toString() === pos._id;
        }) !== -1;
    });

    var instances = {
        branch: branches,
        pos: pos,
    };

    const mappedResults = {};
    const unexpectedError = ['branch', 'pos'].some(prop => {
        const filterArrayLength = results[prop].length;
        const resultsArrayLength = instances[prop].length;

        if (filterArrayLength > resultsArrayLength) {
            const foundIds = [];
            instances[prop].forEach(item => foundIds.push(String(item._id)));
            results[prop].forEach(id => {
                if (foundIds.indexOf(String(id)) === -1) {
                    console.log(`Missing ${prop}_id ${id}`)
                }
            });
            return true;
        }

        mappedResults[prop] = {};
        results[prop].forEach(record => {
            mappedResults[prop][record._id] = record;
        });
    });

    return unexpectedError;
}

module.exports = {
    findReports: findReports,
    posCollection: posCollection
};
