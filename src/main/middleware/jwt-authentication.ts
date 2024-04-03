import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { envs } from "../config/envs";


export const jwtAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1] ?? '';

    if (!token) res.status(401).json({ error: 'Unathorized' })

    try {
        
        jwt.verify(token, envs.secret_jwt_key) as { email: string }
        next()

    } catch (error: any) {
        return res.status(403).json({ error: 'Forbidden' })
    }
}