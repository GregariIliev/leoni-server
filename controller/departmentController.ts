import { Router, Request, Response } from "express";

import { DepartmentService } from "../service/departmentService";

export class DepartmentController {

    constructor(private router: Router, private departmentService: DepartmentService) { }

    setRoutes() {
        this.getAll();
        this.getCount();
        this.create();
        this.getById();
        this.getUpdate();
        this.getDelete();
    }

    getById() {
        this.router.get('/api/departments/:id', async (req: Request, res: Response) => {
            try {
                const id = req.params.id;

                const department = await this.departmentService.getById(id);

                if (!department) {
                    throw new Error(`Cannot find departmanet whit id ${id}`);
                }
                res.status(201).json(department);

            } catch (err) {
                res.status(404).json(err);
            }
        })
    }

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

    create() {
        this.router.post('/api/departments', async (req: Request, res: Response) => {
            try {
                const { positions } = req.body;

                const department = await this.departmentService.create(req.body);
                await department.addPositions(positions);

                if (!department) {
                    throw new Error('Fail to create new department');
                }
                res.status(201).json(department)
            } catch (err: any) {
                res.status(424).send(err);
            }
        })
    }

    getUpdate() {
        this.router.put('/api/departments/:id', async (req: Request, res: Response) => {
            try {
                const departmentId = req.params.id;
                const department = req.body;

                const id = await this.departmentService.update(department, departmentId);

                res.status(201).json('id');
            } catch (err) {
                console.log(err);

                res.status(404).send();
            }
        })
    }

    getDelete() {
        this.router.delete(`/api/departments/:id`, async (req: Request, res: Response) => {
            try {
                const id = req.params.id;

                const deleted = await this.departmentService.delete(id);

                res.status(200).json(deleted)
            } catch (err) {
                res.status(404).json(err);
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}