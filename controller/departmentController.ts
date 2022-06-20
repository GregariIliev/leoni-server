import { Router, Request, Response } from "express";

import { DepartmentService } from "../service/departmentService";

export class DepartmentController {

    constructor(private router: Router, private departmentService: DepartmentService) { }

    setRoutes() {
        this.router.get('/api/departments', async (req: any, res: any) => {
    getAll() {
        this.router.get('/api/departments', async (req: Request, res: Response) => {
            try {
                const department = await this.departmentService.getAll();

                if (!department) {
                    throw new Error('Fetch departments fail.');
                }

                res.status(200).json(department);

            } catch (err) {
                res.status(404).send(err);
            }
        })
    }

    getCount() {
        this.router.get('/api/departments/count', async (req: Request, res: Response) => {
            try {
                const departmentCount = await this.departmentService.count();

                if (!departmentCount) {
                    throw new Error('Fetch departments count fail');
                }

                res.status(200).json(departmentCount);

            } catch (err) {
                res.status(404).send(err)
            }
        })
    }
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