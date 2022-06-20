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

    async getAll() {
        return await db.Department.findAll();
    }

    async count() {
        return await db.Department.count();
    }

    async getById(id: number) {
        return await db.Department.findByPk(id);
    }

    async create(department: any) {
        return await db.Department.create(department)
    }
}