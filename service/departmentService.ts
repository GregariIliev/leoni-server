import db from '../models/index'

export class DepartmentService {
    constructor() {

    }

    async getAllDepartmentsIncludePositions() {
        return await db.Department.findAll({ include: db.Position });
    }

    }
}