import db from '../models/index'

export class DepartmentService {
    constructor() {

    }

    async createDepartment(name: string, maxEmployees: number, salaryMultiplayer: number) {
        return await db.Department.create({ name, maxEmployees, salaryMultiplayer });
    }

    async getAll() {
        return await db.Department.findAll({
            attributes: ['id', 'name', 'maxEmployees', 'salaryMultiplayer'],
            include: [
                { model: db.Position }
            ]
        });
    }

    async count() {
        return await db.Department.count();
    }

    async getById(id: string) {
        return await db.Department.findByPk(id);
    }

    async create(department: any) {
        return await db.Department.create(department)
    }

    async update(department: any, deparmtnetId: any) {

        await db.setPositionsOnDepartments(deparmtnetId, department.positions);
        return await db.Department.update(department, { where: { id: deparmtnetId } });
    }

    async delete(id: string) {
        return await db.Department.destroy({ where: { id: id } })
    }
}