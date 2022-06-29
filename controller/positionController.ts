import { Router, Request, Response } from "express";

import { PositionService } from "../service/positionService";

export class PositionController {

    constructor(private router: Router, private positionService: PositionService) { }

    setRoutes() {
        this.getAll();
        this.getCount();
        this.getCreate();
        this.getById();
        this.getUpdate();
        this.getDelete();
    }

    getById() {
        this.router.get('/api/positions/:id', async (req: Request, res: Response) => {
            try {
                const id = req.params.id;

                const position = await this.positionService.getById(id);

                if (!position) {
                    throw new Error(`Cannot find departmanet whit id ${id}`);
                }

                res.status(200).json(position);

            } catch (err) {
                res.status(404).json(err);
            }
        })
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

    getCreate() {
        this.router.post('/api/positions', async (req: Request, res: Response) => {
            try {
                const position = req.body;

                const pos = await this.positionService.create(position);

                res.status(201).json(pos);

            } catch (err) {
                res.status(424).send(err);
            }
        })
    }

    getUpdate() {
        this.router.put('/api/positions/:id', async (req: Request, res: Response) => {
            try {
                const positionId = req.params.id;
                const position = req.body;

                const updated = await this.positionService.update(position, positionId);

                res.status(201).json(updated);
            } catch (err) {
                res.status(404).json(err);
            }
        })
    }

    getDelete() {
        this.router.delete('/api/positions/:id', async (req: Request, res: Response) => {
            try {
                const id = req.params.id;

                const deleted = await this.positionService.delete(id);

                res.status(201).json(deleted);

            } catch (err) {
                res.status(404).json(err);
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}