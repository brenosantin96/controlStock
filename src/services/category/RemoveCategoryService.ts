import prismaClient from "../../prisma";
import { RemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";

class RemoveCategoryService {

    async execute({ category_id }: RemoveCategoryRequest) {

        if (!category_id) {
            throw new Error(`Category with this ${category_id} does not exists.`)
        }

        const category = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });

        if (!category) {
            throw new Error(`Category with this ${category_id} does not exists.`);
        }

        if (category_id) {
            const category = await prismaClient.category.delete(
                {
                    where: {
                        id: category_id
                    }
                });

            return category;
        }



    }
}

export { RemoveCategoryService }