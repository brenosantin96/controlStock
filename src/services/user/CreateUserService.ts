import prismaClient from '../../prisma/index';
import { hash } from "bcryptjs"
import { UserRequestInterface } from '../../models/interfaces/user/UserRequest';

class CreateUserService {

    async execute({ name, email, password }: UserRequestInterface) {
        if (!email) {
            throw new Error("Incorrect Email");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email already exists!");
        }

        //encrypting user password
        const passwordHash = await hash(password, 8);

        //creating user;
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;

    }

}

export { CreateUserService }
