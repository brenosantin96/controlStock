import { Request, Response, NextFunction } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest'

class AuthUserController {

    async handle(request: Request, response: Response) {
        const { email, password }: AuthRequest = request.body;

        try {
            const authUserService = new AuthUserService();
            const auth = await authUserService.execute({ email, password })
            return response.json(auth);

        } catch (err: unknown) {
            if (err instanceof Error) {
                response.status(400).json({ error: err.message });
                console.log("TESTE ERRO: ", err)
                return;
            }
        }


    }

}

export { AuthUserController }