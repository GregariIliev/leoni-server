import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import express from 'express';
import db from './models';

const port = process.env.SERVER_PORT || 3000;
const app = express();
