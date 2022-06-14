import { Router } from "express";

import { AuthController } from "../controller/authController";
import { DepartmentController } from "../controller/departmentController";
import { PositionController } from "../controller/positionController";

export class Routes {
    declare router: any;
    declare authController: AuthController;
    declare departmentController: DepartmentController;
    declare positionController: PositionController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController(this.router);
        this.departmentController = new DepartmentController(this.router);
        this.positionController = new PositionController(this.router);
    }

    setRoutes() {
        this.authController.setRoutes();
        this.departmentController.setRoutes();
        this.positionController.setRoutes();

        this.router.use(this.authController.getRoutes());
        this.router.use(this.departmentController.getRoutes());
        this.router.use(this.positionController.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}