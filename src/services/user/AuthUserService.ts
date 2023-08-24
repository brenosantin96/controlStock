import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma/index'
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest'

class AuthUserService {

    async execute({ email, password }: AuthRequest) {

        if (!email) {
            throw new Error("Email has to be sent!");
        }

        if (!password) {
            throw new Error("Password has to be sent!");
        }

        //verify in database if user exists
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Wrong username or password!");
        }

        //verify if password is correct
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Wrong password!")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,

            {
                subject: user.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }

}

export { AuthUserService }