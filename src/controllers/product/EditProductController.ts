import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProductService";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductController {

    async handle(request: Request, response: Response) {

        const { name, amount, banner, description, price, product_id }: EditProductRequest = request.body;
        const editProductService = new EditProductService();

        try {

            const productEdited = await editProductService.execute({ name, amount, banner, description, price, product_id });
            return response.json(productEdited);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                response.status(400).json({ error: err.message });
                return;
            }
        }


    }

}

export { EditProductController }