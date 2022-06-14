import { Router } from "express";

import { AuthController } from "../controller/authController";
import { DepartmentController } from "../controller/departmentController";

export class Routes {
    declare router: any;
    declare authController: AuthController;
    declare departmentController: DepartmentController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.departmentController = new DepartmentController(this.router);
    }

    setRoutes() {

        this.authController.setRoutes();
        this.departmentController.setRoutes();

        this.router.use(this.authController.getRoutes());
        this.router.use(this.departmentController.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}