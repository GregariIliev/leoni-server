import express, { Router, Application } from 'express'
import cors from 'cors'
import { Routes } from './routes/routes';



export class App {
    declare app: Application;
    declare router: Router;

    constructor() {
        this.app = express();
        this.router = Router();
    }

    run(PORT: string | number) {
        
        this.app.listen(PORT, () => {
            this.app.use()
            
        })
        
    }
}