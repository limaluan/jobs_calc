const express = require('express');
const router = express.Router();

const views = __dirname + "/views/"

let profile = {
    name: "Luan Lima",
    avatar: "https://github.com/limaluan.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 3
}

router.get("/", (req, res) => res.render(views + "index"));
router.get("/job/edit", (req, res) => res.render(views + "job-edit"));
router.get("/job", (req, res) => res.render(views + "job"));
router.get("/profile", (req, res) => res.render(views + "profile", { profile }));

module.exports = router;
