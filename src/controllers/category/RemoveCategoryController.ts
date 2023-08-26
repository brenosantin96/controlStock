import { Request, response, Response } from "express";
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService";

class RemoveCategoryController {

    async handle(req: Request, res: Response) {


        try {
            const category_id = req.query.category_id as string;
            const removeCategoryService = new RemoveCategoryService();
            const category = await removeCategoryService.execute({ category_id });
            return res.status(200).json({ message: `Category with Id ${category_id} deleted successfully!` })


        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                res.status(400).json({ error: err.message });
                return
            }
        }



    }

}

export { RemoveCategoryController }