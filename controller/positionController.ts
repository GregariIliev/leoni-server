import { Router } from "express";

import { PositionService } from "../service/positionService";

export class PositionController {
    declare positionService: PositionService;

    constructor(private router: Router) {
        this.positionService = new PositionService;
    }

    setRoutes() {
        // this.router.get('/api/positions', async (req: any, res: any) => {
        //     try {
        //         const positions = await this.positionService.getAllPositions();

        //         if (!positions) {
        //             throw new Error('Fetch positions fail!');
        //         }

        //         res.status(200).json(positions);

        //     } catch (err) {
        //         res.status(404).send();
        //     }

        // })
    }

    getRoutes() {
        return this.router;
    }
}