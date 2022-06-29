import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.url === '/api/employees/login') {
            next();
        } else {
            const token: any = req.headers.cookie?.split('=')[1];
            const secret: any = process.env.JWT_SECRET;
            const valid = jwt.verify(token, secret)

            if (valid && req.url === '/api/authenticate') {
                res.status(200).json(true);

            } else if (valid) {
                next()

            } else {
                res.status(401).json({ error: 'Invalid token' })

            }
        }

    } catch (error) {
        res.status(401).json(error);
    }
}