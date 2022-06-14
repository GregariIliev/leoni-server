import db from '../models/index'

export class DepartmentService {
    constructor() {

    }

    async getAllDepartmentsIncludePositions() {
        return await db.Department.findAll({ include: db.Position });
    }

    async createDepartment(name: string, maxEmployees: number, salaryMultiplayer: number) {
        return await db.Department.create({ name, maxEmployees, salaryMultiplayer });
    }
}