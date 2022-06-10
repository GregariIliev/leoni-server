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

            this.app.use(cors());
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));

            const routes = new Routes();

            routes.setRoutes();

            this.app.use(routes.getRoutes());
        })

    }
}