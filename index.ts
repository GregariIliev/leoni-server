import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import db from './models';

import { App } from './app';

const PORT: string | number = process.env.SERVER_PORT || 3000;

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
    .then(async (c) => {
        await c.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        await c.end();

        db.sequelize.sync({ force: true })
            .then(async () => {
                await db.createCustomEmployees();
                await db.createCustomDepartments();
                await db.createCustomPositions();
                await db.addPositionsOnDepartments(1, [1, 2, 3, 4, 5]);
                await db.addPositionsOnDepartments(2, [1, 2, 3, 4, 5]);
                await db.addPositionsOnDepartments(3, [6, 7]);
                await db.addPositionsOnDepartments(4, [8])
            });

            const app = new App();

            app.run(PORT)
        })
    })
    .catch(err => console.log(err));