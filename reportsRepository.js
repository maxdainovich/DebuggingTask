/// This file is a dependency mock - no code should be changed here

function getReports() {
    return generateRandomReports(100);
}

function generateRandomReports(count) {

    var result = [];
    var i = 0;
    for (; i < count; i++) {
        result.push({
            _id: (i + 1),
            branch_id: '5c5d86fbd5c001080f5764f2',
            pos_id: i % 2 === 0 ? '5c5d86fcd5c001080f576518' : '5c5d86fcd5c001080f576519',
            company: 'Random ' + (i + 1),
            name: 'Z Report',
            sum: i * (i + 1) * 3
        });
    }

    return result.concat([
        {
            _id: i + 1,
            pos_id: null,
            branch_id: '5c5d86fbd5c001080f5764f2',
            company: 'Random ' + (i + 1),
            name: 'Z Report',
            sum: i * (i + 1) * 3
        }
    ]);
}

module.exports = {
    getReports: getReports
};
