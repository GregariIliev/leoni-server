import db from "../models";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class EmployeeService {
    constructor() {

    }

    async login(email: string, password: string) {
        const employee = await db.Employee.findOne({ where: { email } });

        if (!employee) {
            throw new Error('Invalid email or password');
        }

        const checkPassword = await bcrypt.compare(password, employee.dataValues.password);

        if (!checkPassword) {
            throw new Error('Invalid email or password');
        }

        const payload = {
            id: 0,
            email: ''
        }
        
        const SECRET: any = process.env.JWT_SECRET;

        const token = jwt.sign(payload, SECRET);

        return token;
    }

    async createEmployee(employee: any){

        //TODO remove admin_id and set department_id and shift_id
        return db.Employee.create(employee);
    }
}