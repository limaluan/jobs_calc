const Profile = require("../models/Profile");

module.exports = {
    async index(req, res) {
        const profile = await Profile.get();
        res.render("profile", { profile })
    },

    async update(req, res) {
        const data = req.body;
        const profile = await Profile.get()

        const weeksPerYear = 52;

        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

        const weekTotalHours = (data["hours-per-day"] * data["days-per-week"]);

        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

        await Profile.update({
            ...profile,
            ...data
        });

        return res.redirect("/profile");
    }
}