import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }
    
    try {
        const decoded = jwt.verify(authHeader as string, process.env.JWT_SECRET!);
        console.log(decoded)    
        // how to override the type of the express request object
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid token" });
    }
}