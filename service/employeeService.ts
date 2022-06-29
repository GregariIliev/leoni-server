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
            id: employee.id,
            email: employee.email
        }

        const SECRET: any = process.env.JWT_SECRET;

        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        return token;
    }

    async createEmployee(employee: any) {
        return db.Employee.create(employee);
    }

    async update(employee: any, employeeId: string) {
        return db.Employee.update(employee, { where: { id: employeeId } });
    }

    async getAll() {
        return await db.Employee.findAll({
            attributes: ['id', 'firstName', 'middleName', 'lastName', 'shift', 'salary', 'address', 'phone'],
            include: [
                { model: db.Department, attributes: ['name'] },
                { model: db.Position, attributes: ['name'] }
            ]
        });
    }

    async count() {
        return await db.Employee.count();
    }

    async getByIdInclude(id: string) {
        return await db.Employee.findOne({
            where: { id: id },
            include: [
                { model: db.Department },
                { model: db.Position }
            ]
        })
    }

    async delete(id: string) {
        return await db.Employee.destroy({ where: { id: id } });
    }
}