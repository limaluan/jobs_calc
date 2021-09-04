let data = [];

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}
