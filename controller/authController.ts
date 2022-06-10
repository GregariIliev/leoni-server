import { Router } from "express";

import { AuthService } from "../service/authService";

export class AuthController {
    declare router: Router;
    declare authService: AuthService;

    constructor() {
        this.router = Router();
        this.authService = new AuthService;
    }

    setRoutes() {
        this.router.post('/api/employees', async (req: any, res: any) => {
            try {
                const { email, password } = req.body;

                const token = await this.authService.login(email, password);

                if (!token) {
                    throw new Error('Invalid email or password.');
                }


                res.cookie('leoni', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000)
                    //secure: true
                });

                res.status(200).json({ Authorized: true });

            } catch (error: any) {
                
                res.status(401);
                res.json(error.message)
            }
        })
    }

    getRoutes() {
        return this.router;
    }
}