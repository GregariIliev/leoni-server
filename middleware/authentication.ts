import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';


export const valid = (req: Request, res: Response, next: NextFunction) => {

    if (req.url === '/api/authenticate' && req.headers.cookie?.split('=')[0] === 'leoni') {
        checkToken(req, res, next);
        
        res.status(200).send();

    } else if (req.url === '/api/employees/login') {
        next();

    } else if (req.headers.cookie) {

        const token: any = req.headers.cookie?.split('=')[1];

        const secret: any = process.env.JWT_SECRET;

        const valid = jwt.verify(token, secret)

        if (valid) {
            next();
            
        } else {
            res.status(401).json({ unauthorized: true });
        }
    } else {
        res.status(401).json({ unauthorized: true });
    }
}
