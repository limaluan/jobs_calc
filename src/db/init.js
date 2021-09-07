const Database = require("./config");


const initDb = {
    async init() {
        const db = await Database(); // Abre o banco de dados

        // profile table
        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INTEGER,
            hours_per_day INTEGER,
            days_per_week INTEGER,
            vacation_per_year INTEGER,
            value_hour INTEGER
        )`);

        // jobs table
        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INTEGER,
            total_hours INTEGER,
            created_at DATETIME
        )`);

        // insert default data on profile table
        await db.run(`INSERT INTO 
                    profile(
                        name, avatar, monthly_budget,
                        hours_per_day, days_per_week, vacation_per_year,
                        value_hour) 
                        VALUES(
                        "Luan",
                        "https://github.com/limaluan.png",
                        3000,
                        5,
                        5,
                        3,
                        75
                        )`);

        await db.close(); // Fechar o banco de dados
    }
};

initDb.init();
