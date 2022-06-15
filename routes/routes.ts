import { Router } from "express";

import { EmployeeController } from "../controller/employeeController";
import { DepartmentController } from "../controller/departmentController";
import { PositionController } from "../controller/positionController";

export class Routes {
    declare router: any;
    declare employeeController: EmployeeController;
    declare departmentController: DepartmentController;
    declare positionController: PositionController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController(this.router);
        this.departmentController = new DepartmentController(this.router);
        this.positionController = new PositionController(this.router);
    }

    setRoutes() {
        this.employeeController.setRoutes();
        this.departmentController.setRoutes();
        this.positionController.setRoutes();

        this.router.use(this.employeeController.getRoutes());
        this.router.use(this.departmentController.getRoutes());
        this.router.use(this.positionController.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}