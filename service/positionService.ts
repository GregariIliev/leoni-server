import db from '../models/index'

export class PositionService {
    constructor() {

    }

    async getAll() {
        return await db.Position.findAll({
            attributes: ['id', 'name', 'salaryMultiplayer', 'shift']
        });
    }

    async createPosition(position: any) {


        return await db.Position.create(position);
    }

    async count() {
        return await db.Position.count();
    }

    async getById(id: number) {
        return await db.Position.findByPk(id);
    }

    async create(position: any) {
        return await db.Position.create(position);
    }
}