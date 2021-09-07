module.exports = {
    remainingDays(job) {
        const createdAt = new Date(job.created_at);
        const estimatedDays = Math.floor((job['total-hours'] / job['daily-hours']));
        const dueDay = Number(estimatedDays) + createdAt.getDate();
        const dueDate = createdAt.setDate(dueDay);

        return Math.floor((dueDate - job.created_at) / 1000 / 60 / 60 / 24);
    },
    
    calculateBudget (profile_data, total_hours) {
        return profile_data['value-hour'] * Number(total_hours);
    }
}
