const Job = require('../models/Job');
const JobUtil = require('../utils/JobUtil');
const Profile = require('../models/Profile');

module.exports = {
    index(req, res) {
        const jobs = Job.get();

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
                budget: JobUtil.calculateBudget(Profile.get(), job["total-hours"])
            };
        });

        let freeHours = Number(Profile.get()["hours-per-day"]) - jobTotalHours;
        
        Job.update([...updatedJobs]);
        return res.render("index", { profile: Profile.get(), jobs: Job.get(), statusCount, freeHours });
    }
};
