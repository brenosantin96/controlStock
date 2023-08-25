import prismaClient from "../../prisma";
import { EditUserRequest } from "../../models/interfaces/user/EditUserRequest";

export const EditUserService = async ({ user_id, name }: EditUserRequest) => {

    if (user_id === "" || name === "" || !user_id || !name) {
        throw new Error("Invalid arguments to edit user");
    }

    const userEdited = await prismaClient.user.update({
        where: {
            id: user_id
        },
        data: {
            name: name
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    });

    if (!userEdited) {
        throw new Error(`An error has ocurried. ${userEdited}`);
    }

    return userEdited;

}

