import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import express from 'express';
import db from './models';

import { employees } from './seeders/customEmployees'
import { departments } from './seeders/customDepartments';
import { positions } from './seeders/customPositions';

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

        db.sequelize.sync({force: true}).then(() => {

            employees.map(async (e) => await db.Employee.create(e));
            departments.map(async (d) => await db.Department.create(d));
            positions.map(async (p) => await db.Position.create(p));

            console.log("Database connected successful.");
            

            const app = new App();

            app.run(PORT)
        })
    })
    .catch(err => console.log(err));