import { Request, Response } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";

class EditCategoryController {

    async handle(request: Request, response: Response) {

        const { name } = request.body;
        const category_id = request.query.category_id as string;

        try {

            const editCategoryService = new EditCategoryService;
            const categoryEdited = editCategoryService.execute({ category_id, name });
            return response.status(200).json(categoryEdited)

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                response.status(400).json({ error: err.message });
            }
        }



    }

}

export { EditCategoryController }