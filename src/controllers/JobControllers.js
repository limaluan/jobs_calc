const Job = require("../models/Job");
const JobUtil = require("../utils/JobUtil");
const Profile = require("../models/Profile");

module.exports = {
    create(req, res) {
        return res.render("job");
    },

    save(req, res) {
        const jobs = Job.get();
        const lastId = jobs[Job.get().length - 1]?.id || 0;

        jobs.push(
            {
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                created_at: Date.now()
            }
        );

        Job.update([...jobs]);
        return res.redirect("/");
    },

    show(req, res) {
        let id = req.params.id;
        const jobs = Job.get();

        const job = jobs.find(job => Number(job.id) === Number(id));
        if (!job) {
            return res.send('Job Not Found!');
        }

        res.render("job-edit", { job })
    },

    update(req, res) {
        const id = req.params.id;
        const jobs = Job.get();

        let job = jobs.find(job => Number(job.id) === Number(id));

        if (!job) return res.send("Parece que ocorreu um erro.");

        let index = jobs.indexOf(job);

        jobs[index] = ({
            ...job,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            budget: JobUtil.calculateBudget(Profile.get(), req.body['total-hours'])
        });

        Job.update([...jobs]);
        console.log(Job.get())
        res.redirect('/job/' + id);
    },

    delete(req, res) {
        const id = req.params.id;
        const

            jobData = Job.get().filter(job => Number(job.id) !== Number(id))
        Job.update([...jobData]);

        return res.redirect('/');
    }
}
