import prismaClient from "../../prisma";
import { RemoveProductRequest } from "../../models/interfaces/product/RemoveProductRequest";

class RemoveProductService {

    async execute({ product_id }: RemoveProductRequest) {

        if (!product_id) {
            throw new Error("Id must be indicated");
        }

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        })

        if (!product) {
            throw new Error("Product with this ID does not exists.");
        }

        const productDeleted = await prismaClient.product.delete({
            where: {
                id: product_id
            }
        })

        return productDeleted;

    }

}

export { RemoveProductService }