import { Request, Response, NextFunction, response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService';
import { UserRequestInterface } from '../../models/interfaces/user/UserRequest';

class CreateUserController {

    async handle(req: Request, res: Response) {

        try {
            const { name, email, password }: UserRequestInterface = req.body
            const createUserService = new CreateUserService;

            const user = await createUserService.execute({
                name,
                email,
                password
            });

            return res.json(user);

        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message })
                console.log(err);
            }
        }


    }

}

export { CreateUserController }