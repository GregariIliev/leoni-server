import { Router } from "express";

import { DepartmentService } from "../service/departmentService";

export class DashboardController {
    declare router: Router;
    declare departmentService: DepartmentService;

    constructor() {
        this.router = Router();
        this.departmentService = new DepartmentService();
    }

    setRoutes() {
        this.router.get('/api/departments', async (req: any, res: any) => {
            try {
                const departments = await this.departmentService.getAllDepartments();

                if (!departments) {
                    throw new Error('Fetch departments fail!')
                }

                res.status(200).json(departments);

            } catch (err) {
                res.status(404).json({ Error: 'Fetch departments fail!' });
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}