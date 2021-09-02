const express = require('express');
const router = express.Router();

const views = __dirname + "/views/"
express.urlencoded();

const Job = {
    data: [],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress';

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(Profile.data, job["total-hours"])
                };
            });
            Job.data = [...updatedJobs];
            return res.render(views + "index", { profile: Profile.data, jobs: Job.data });
        },

        create(req, res) {
            return res.render(views + "job");
        },

        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push(
                {
                    id: lastId + 1,
                    name: req.body.name,
                    'daily-hours': req.body['daily-hours'],
                    'total-hours': req.body['total-hours'],
                    created_at: Date.now()
                }
            );
            return res.redirect("/");
        },

        show(req, res) {
            let id = req.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(id));
            if (!job) {
                return res.send('Job Not Found!');
            }

            res.render(views + "job-edit", { job })
        },

        update(req, res) {
            const id = req.params.id;

            let job = Job.data.find(job => Number(job.id) === Number(id));

            if (!job) return res.send("Parece que ocorreu um erro.");

            let index = Job.data.indexOf(job);
            
            Job.data[index] = {
                ...job,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                budget: Job.services.calculateBudget(Profile.data, req.body['total-hours'])
            }
            console.log(Job.data)
            res.redirect('/job/' + id);
        },

        delete(req, res) {
            const id = req.params.id;

            Job.data = Job.data.filter(job => Number(job.id) !== Number(id))

            return res.redirect('/');
        }
    },

    services: {
        remainingDays(job) {
            const createdAt = new Date(job.created_at);

            const estimatedDays = Math.floor((job['total-hours'] / job['daily-hours']));
            const dueDay = Number(estimatedDays) + createdAt.getDate();
            const dueDate = createdAt.setDate(dueDay);

            return Math.floor((dueDate - job.created_at) / 1000 / 60 / 60 / 24);
        },
        
        calculateBudget (profile_data, total_hours) {
            return profile_data['value-hour'] * total_hours;
        }
    }
}

const Profile = {
    data: {
        name: "Luan Lima",
        avatar: "https://github.com/limaluan.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 3,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            const data = req.body;

            const weeksPerYear = 52;

            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

            const weekTotalHours = (data["hours-per-day"] * data["days-per-week"]);

            const monthlyTotalHours = weekTotalHours * weeksPerMonth;

            data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = data;

            return res.redirect("/profile");
        }
    }
}

// index
router.get("/", Job.controllers.index);

router.get("/job/:id", Job.controllers.show);
router.post("/job/:id", Job.controllers.update);

router.post("/job/delete/:id", Job.controllers.delete);

// Job
router.get("/job", Job.controllers.create);
router.post("/job", Job.controllers.save);

router.get("/profile", Profile.controllers.index);
router.post("/profile", Profile.controllers.update);

module.exports = router;
