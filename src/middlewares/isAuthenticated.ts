import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { Payload } from '../models/interfaces/user/auth/Payload';

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    //access token JWT 
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [ab, token] = authToken.split(" ");

    try {
        //validate Token
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

        //getting userID
        request.user_id = sub;
        console.log("SUB: ", sub); //bringing only userID info!


        return next();
    } catch (error) {
        return response.status(401).end();
    }
}