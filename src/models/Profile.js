// Importante NÃO deixar como CONST pois causará erro na atribuição do "update"
let data = {
    name: "Luan Lima",
    avatar: "https://github.com/limaluan.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 3,
    "value-hour": 75
};

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}
