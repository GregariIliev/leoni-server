import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    if (req.headers.cookie?.split('=')[0] === 'leoni' && req.url === '/api/authenticate') {
        res.status(200).send();

    } else if (req.headers.cookie?.split('=')[0] === 'leoni' && req.url !== '/api/authenticate') {

        try {
            const token: any = req.headers.cookie?.split('=')[1];
            const secret: any = process.env.JWT_SECRET;
            const valid = jwt.verify(token, secret)

            if (valid) {
                next()

            } else {
                res.status(401).send();
            }

        } catch (error) {
            return false
        }
    }else {
        next();
    }
}