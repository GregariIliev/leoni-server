import { Router } from "express";

import { EmployeeService } from "../service/employeeService";

export class EmployeeController {
    declare employeeService: EmployeeService;

    constructor(private router: Router) {
        this.employeeService = new EmployeeService;
    }

    setRoutes() {
        this.login();
        this.createEmployee();
    }

    login() {
        this.router.post('/api/employees', async (req: any, res: any) => {
            
            console.log(req.body);
            try {
                const { email, password } = req.body;

                const token = await this.employeeService.login(email, password);

                if (!token) {
                    throw new Error('Invalid email or password.');
                }


                res.cookie('leoni', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000)
                    //secure: true
                });

                res.status(200).json({ Authorized: true });

            } catch (error: any) {

                res.status(401).send();
            }
        })
    }

    createEmployee() {
        this.router.post('/api/employees', async (req: any, res: any) => {
            try {
                console.log(req.body);
                res.status(200).json(req.body)

            } catch (err) {
                console.log(err);

            }
        })
    }

    getRoutes() {
        return this.router;
    }
}