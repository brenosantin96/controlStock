import { Request, Response, NextFunction } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {

    async handle(request: Request, response: Response) {

        try {

            const user_id = request.user_id;
            const detailUserService = new DetailUserService();
            const user = await detailUserService.execute(user_id);
            return response.json(user)

        } catch (err: unknown) {
            if (err instanceof Error) {
                response.status(400).json({ error: err.message })
                console.log(err);
            }
        }


    }
}

export { DetailUserController }