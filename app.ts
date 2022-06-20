import express, { Router, Application } from 'express'
import cors from 'cors'
import { Routes } from './routes/routes';
import { valid } from './middleware/authentication';

export class App {
    declare app: Application;
    declare router: Router;

    constructor() {
        this.app = express();
        this.router = Router();
    }

    run(PORT: string | number) {

        this.app.listen(PORT, () => {

            console.log(`Server is running on port ${PORT}`);

            this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(valid);

            const routes = new Routes();

            routes.setRoutes();

            this.app.use(routes.getRoutes());
        })

    }
}