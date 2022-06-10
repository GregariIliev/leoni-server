import { Router } from "express";

import { AuthController } from "../controller/authController";

export class Routes {
    declare router: any;
    declare authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
    }

    setRoutes() {

        this.authController.setRoutes();
        

        this.router.use(this.authController.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}