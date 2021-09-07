const Job = require("../models/Job");
const JobUtil = require("../utils/JobUtil");
const Profile = require("../models/Profile");

module.exports = {
    create(req, res) {
        return res.render("job");
    },

    async save(req, res) {
        let job = {
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now(),
            budget: JobUtil.calculateBudget(await Profile.get(), req.body['total-hours']),
        };

        // adiciona o tempo restante eo status ao job antes de salva-lo
        job = {
            ...job,
            remaining: JobUtil.remainingDays(job),
            status: JobUtil.remainingDays(job) > 0 ? 'progress' : 'done'
        }

        await Job.save(job);
        return res.redirect("/");
    },

    async show(req, res) {
        let id = req.params.id;
        const jobs = await Job.get();

        let job = jobs.find(job => Number(job.id) === Number(id));
        if (!job) {
            return res.send('Job Not Found!');
        }

        job = {
            ...job,
            remaining: JobUtil.remainingDays(job),
            status: JobUtil.remainingDays(job) > 0 ? 'progress' : 'done',
            budget: JobUtil.calculateBudget(await Profile.get(), job["total-hours"])
        };

        return res.render("job-edit", { job });
    },

    async update(req, res) {
        const id = req.params.id;
        const jobs = await Job.get();

        let job = jobs.find(job => Number(job.id) === Number(id));

        job = {
            ...job,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            name: req.body.name
        }
        await Job.update(job);
        res.redirect('/job/' + id);
    },

    async delete(req, res) {
        const id = req.params.id;
        const jobs = await Job.get();

        jobs.filter(job => {
            Number(job.id) === Number(id) ? Job.delete(job) : "Job não encontrado";
        });

        res.redirect('/');
        
    }
}
