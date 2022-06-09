import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import express from 'express';
import db from './models';

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
    })
    .catch(err => console.log(err));