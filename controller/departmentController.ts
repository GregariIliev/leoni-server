import { Router } from "express";

import { DepartmentService } from "../service/departmentService";

export class DepartmentController {

    constructor(private router: Router, private departmentService: DepartmentService) { }

    setRoutes() {
        this.router.get('/api/departments', async (req: any, res: any) => {
            try {
                const departments = await this.departmentService.getAllDepartmentsIncludePositions();

                if (!departments) {
                    throw new Error('Fetch departments fail!')
                }

                res.status(200).json(departments);

            } catch (err) {
                res.status(404).send();
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}