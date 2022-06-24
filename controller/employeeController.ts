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
        this.getAll();
        this.getCount();
        this.getById();
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
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    maxAge: 360000000
                    //secure: true
                });

                res.status(200).json({ email: email });
                
            } catch (err: any) {
                res.status(401).json(err.message);
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
                const departmentId = employee.department_id;
                const positionid = employee.position_id;

                const department = await this.departmentService.getById(departmentId);
                const position = await this.positionsService.getById(positionid);

                const currentEmployeesCount = this.departmentService.count();
                const maxEmployees = department.dataValues.maxEmployees;

                if (currentEmployeesCount === maxEmployees) {
                    throw new Error(`Department ${department.dataValues.name} is full.`);
                }

                const salaryMultiplayerDepartment = department.dataValues.salaryMultiplayer;
                const salaryMultiplayerPositions = position.dataValues.salaryMultiplayer;

                const salary = this.DEFAULT_SALARY * salaryMultiplayerDepartment * salaryMultiplayerPositions;

                employee['salary'] = salary.toFixed(2);

                const newEmployee = await this.employeeService.createEmployee(employee);

                if (!newEmployee) {
                    throw new Error('Fail create employee');
                }

                res.status(200).json(newEmployee)

            } catch (err) {
                res.status(424).json(err);
            }
        })
    }


    getAll() {
        this.router.get('/api/employees', async (req: Request, res: Response) => {
            try {
                const employees = await this.employeeService.getAll();

                if (!employees) {
                    throw new Error('Not found employees')
                }

                res.status(200).json(employees);

            } catch (err) {
                res.status(404).json(err);
            }

        })
    }

    getCount() {
        this.router.get('/api/employees/count', async (req: Request, res: Response) => {
            try {
                const employeeCount = await this.employeeService.count();

                if (!employeeCount) {
                    throw new Error('Fetch employees count fail.')
                }

                res.status(200).json(employeeCount);

            } catch (err) {
                res.status(404).send(err);
            }
        })
    }

    getById() {
        this.router.get('/api/employees/:id', async (req: Request, res: Response) => {
            try {

                const id = req.params.id

                const employee = await this.employeeService.getByIdInclude(id);

                res.status(200).json(employee);

            } catch (error) {
                res.status(404).send(error);
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}