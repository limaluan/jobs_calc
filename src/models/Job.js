let data = [
    {
        id: 1,
        name: 'Sorte.io ',
        'daily-hours': '2',
        'total-hours': '1',
        created_at: 1630701203342,
        remaining: 4,
        status: 'progress',
        budget: 75
    },
    {
        id: 2,
        name: '2',
        'daily-hours': '1',
        'total-hours': '55',
        created_at: 1630701211018,
        remaining: 55,
        status: 'progress',
        budget: 4125
    }
];

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}
