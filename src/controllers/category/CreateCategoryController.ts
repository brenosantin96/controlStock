import { Request, Response } from 'express';
import { CategoryRequest } from '../../models/interfaces/category/CategoryRequest';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {

    async handle(request: Request, response: Response) {
        const { name }: CategoryRequest = request.body;

        try {
            const createCategoryService = new CreateCategoryService();
            const category = await createCategoryService.execute({ name });
            return response.json(category);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                response.status(400).json({ error: err.message });
            }
        }


    }



}

export { CreateCategoryController }