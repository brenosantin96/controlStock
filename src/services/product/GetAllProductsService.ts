import prismaClient from "../../prisma";

class GetAllProductsService {

    async execute() {

        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                amount: true
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return products;

    }
}

export {GetAllProductsService};