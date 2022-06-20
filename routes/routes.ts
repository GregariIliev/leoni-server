import { Router } from "express";

import { EmployeeController } from "../controller/employeeController";
import { DepartmentController } from "../controller/departmentController";
import { PositionController } from "../controller/positionController";

import { EmployeeService } from "../service/employeeService";
import { DepartmentService } from "../service/departmentService";
import { PositionService } from "../service/positionService";

export class Routes {
    declare router: any;
    declare employeeController: EmployeeController;
    declare departmentController: DepartmentController;
    declare positionController: PositionController;

    employeeService: EmployeeService = new EmployeeService();
    departmentService: DepartmentService = new DepartmentService();
    positionService: PositionService = new PositionService();

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController(this.router, this.employeeService, this.departmentService, this.positionService);
        this.departmentController = new DepartmentController(this.router, this.departmentService);
        this.positionController = new PositionController(this.router, this.positionService);
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