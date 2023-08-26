import prismaClient from "../../prisma";

class ListCategoryService {

    async execute() {
        //get all categories
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return categories;

    }

}

export { ListCategoryService }