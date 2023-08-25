import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";

export const EditUserController = async (req: Request, res: Response) => {

    const { name } = req.body;
    const user_id = req.query.user_id as string;


    try {
        const editedUser = await EditUserService({ name, user_id });
        console.log("EDITED USER: ", editedUser);
        return res.status(200).json(editedUser)

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err);
            res.status(400).json({ error: err.message });
        }
    }

}

