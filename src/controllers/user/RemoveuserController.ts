import { Request, Response, NextFunction, response } from 'express'
import { RemoveUserService } from '../../services/user/RemoveUserService'

class RemoveUserController {

    async handle(req: Request, res: Response) {


        try {

            const user_id = req.query.user_id as string;
            const removeUserService = new RemoveUserService();
            const removeUser = removeUserService.execute({ user_id });
            return res.json(removeUser)

        } catch (err: unknown) {

            if (err instanceof Error) {
                res.status(400).json({ error: err.message })
                console.log(err);

            }
        }



    }

}

export { RemoveUserController }