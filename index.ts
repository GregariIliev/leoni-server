import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import express from 'express';
import db from './models';

import { employees } from './seeders/customEmployees'
import { departments } from './seeders/customDepartments';
import { positions } from './seeders/customPositions';

const port = process.env.SERVER_PORT || 3000;
const app = express();

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
    .then(async (c) => {
        await c.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        await c.end();

        db.sequelize.sync().then(() => {
            app.listen(port, () => {
                console.log(`Servers is runinng on port ${port}...`);
                
            })
        })
    })
    .catch(err => console.log(err));