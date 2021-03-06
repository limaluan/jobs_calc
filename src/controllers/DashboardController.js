const Job = require('../models/Job');
const JobUtil = require('../utils/JobUtil');
const Profile = require('../models/Profile');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            done: 0,
            progress: 0,
            total: jobs.length
        }

        let jobTotalHours = 0;
        
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtil.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';
            jobTotalHours += status == 'progress' ? Number(job['daily-hours']) : 0;

            statusCount[status] += 1;
            
            return {
                ...job,
                remaining,
                status,
                budget: JobUtil.calculateBudget(profile, job["total-hours"])
            };
        });

        // job = {
        //     ...job,
        //     budget: JobUtil.calculateBudget(await Profile.get(), job["total-hours"]),
        //     remaining: JobUtil.remainingDays(job),
        //     status: JobUtil.remainingDays(job) > 0 ? "progress" : "done"
        // }

        let freeHours = Number(profile["hours-per-day"]) - jobTotalHours;
        
        return res.render("index", { profile: profile, jobs: updatedJobs, statusCount, freeHours });
    }
};
