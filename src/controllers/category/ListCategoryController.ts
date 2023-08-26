import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {

    async handle(req: Request, res: Response) {


        try {

            const listCategoryService = new ListCategoryService();
            const categories = await listCategoryService.execute();
            res.status(200).json(categories);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                res.status(400).json({ error: err.message });
            }
        }


    }

}

export { ListCategoryController }