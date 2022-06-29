import db from '../models/index'

export class PositionService {
    constructor() {

    }

    async getAll() {
        return await db.Position.findAll({
            attributes: ['id', 'name', 'salaryMultiplayer', 'shift']
        });
    }

    async createPosition(name: string, salaryMultiplayer: number) {
        return await db.Position.create(name, salaryMultiplayer);
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