const Database = require('../db/config');

module.exports = {
    async get() {
        let db = await Database();

        await db.open();

        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close();
        let jobsFormated = [];
        jobs.map(job => {
            jobsFormated.push({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            });
        });
        return jobsFormated;
    },

    async save(newData) {
        let db = await Database();
        await db.open();

        await db.run(`INSERT INTO jobs(name, daily_hours, total_hours, created_at)
        VALUES('${newData.name}', ${newData['daily-hours']}, ${newData['total-hours']}, ${newData.created_at})`)

        await db.close();
    },

    async update(newData) {
        let db = await Database();

        await db.open();

        await db.run(`UPDATE jobs
        SET name = "${newData.name}", daily_hours = ${newData["daily-hours"]},
        total_hours = ${newData["total-hours"]} WHERE id = ${newData.id}`);
        
        await db.close();
    },

    async delete(job) {
        let db = await Database();

        await db.open();

        await db.run(`DELETE FROM jobs WHERE id = "${job.id}"`);

        await db.close();
    }
}
