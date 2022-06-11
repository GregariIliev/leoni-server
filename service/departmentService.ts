import db from '../models/index'

export class DepartmentService {


    async getAllDepartments(){
        const departments = await db.Department.findAll();

        return departments;
    }
}