require('dotenv').config();
const sequelize = require('./config/database');
const colaboradoresScheduler = require('./schedulers/ColaboradoresScheduler');

async function startCron() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        colaboradoresScheduler.start();
    } catch (error) {
       throw error;
    }
}

startCron();