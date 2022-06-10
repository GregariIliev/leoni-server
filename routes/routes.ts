import { Router } from "express";

import { AuthController } from "../controller/authController";
import { DashboardController } from "../controller/dashboardController";

export class Routes {
    declare router: any;
    declare authController: AuthController;
    declare dasshboardController: DashboardController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.dasshboardController = new DashboardController();
    }

    setRoutes() {

        this.authController.setRoutes();
        this.dasshboardController.setRoutes();
        

        this.router.use(this.authController.getRoutes());
        this.router.use(this.dasshboardController.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}