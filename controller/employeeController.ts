import { Router } from "express";
import { Request, Response } from "express";

import { EmployeeService } from "../service/employeeService";
import { DepartmentService } from "../service/departmentService";
import { PositionService } from "../service/positionService";

export class EmployeeController {
    private DEFAULT_SALARY: number = 700;

    constructor(private router: Router,
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private positionsService: PositionService
    ) { }

    setRoutes() {
        this.login();
        this.createEmployee();
    }

    login() {
        this.router.post('/api/employees/login', async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;

                const token = await this.employeeService.login(email, password);

                if (!token) {
                    throw new Error('Invalid email or password.');
                }


                res.cookie('leoni', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000),
                    maxAge: 99999999,
                    sameSite: 'none',
                    //secure: true
                });

                res.status(200).json({ Authorized: true });

            } catch (err) {

                res.status(401).send(err);
            }
        })
    }

    createEmployee() {
        this.router.post('/api/employees/register', async (req: Request, res: Response) => {
            try {
                const employee = req.body;
                const empty = Object.values(req.body).includes('');

                if (empty) {
                    throw new Error('Form register is not valid.')
                }

                const newEmployee = await this.employeeService.createEmployee(employee)

                res.status(200).json(req.body)

            } catch (error) {
                res.status(401).send(error);
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}