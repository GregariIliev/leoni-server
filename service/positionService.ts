import db from '../models/index'

export class PositionService {
    constructor() {

    }

    async getAllPositions() {
        return await db.Position.findAll();
    }

    async createPosition(name: string, salaryMultiplayer: number){
        return await db.Position.create(name, salaryMultiplayer);
    }
}