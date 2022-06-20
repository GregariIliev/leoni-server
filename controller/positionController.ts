import { Router, Request, Response } from "express";

import { PositionService } from "../service/positionService";

export class PositionController {

    constructor(private router: Router, private positionService: PositionService) { }

    setRoutes() {
        this.getAll();
        this.getCount();
        this.create();
    }

    getAll() {
        this.router.get('/api/positions', async (req: Request, res: Response) => {
            try {
                const positions = await this.positionService.getAll();

                if (!positions) {
                    throw new Error('Fetch positions fail!');
                }

                res.status(200).json(positions);

            } catch (err) {
                res.status(404).send(err);
            }

        })
    }

    getCount() {
        this.router.get('/api/positions/count', async (req: Request, res: Response) => {
            try {
                const positionsCount = await this.positionService.count();

                if (!positionsCount) {
                    throw new Error('Fetch positions count fail.');
                }

                res.status(200).json(positionsCount);

            } catch (err) {
                res.status(404).send(err);
            }
        })
    }

    create() {
        this.router.post('/api/positions', async (req: Request, res: Response) => {
            try {
                const position = await this.positionService.create(req.body);

                if (!position) {
                    throw new Error('Fail create position');
                }

            } catch (err) {
                res.status(401).send(err);
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}