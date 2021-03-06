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

    async getById(id: string) {
        return await db.Position.findByPk(id);
    }

    async create(position: any) {
        return await db.Position.create(position);
    }

    async update(position: any, id: string) {
        return await db.Position.update(position, { where: { id: id } });
    }

    async delete(id: string) {
        return await db.Position.destroy({ where: { id: id } });
    }
}