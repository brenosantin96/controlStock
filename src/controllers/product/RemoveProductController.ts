import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

class RemoveProductController {

    async handle(request: Request, response: Response) {

        const product_id = request.query.product_id as string;
        const removeProductService = new RemoveProductService();

        try {
            const productRemove = await removeProductService.execute({ product_id });
            response.status(200).json({ message: `Product with ID ${product_id} removed with success` })

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                response.status(400).json({ error: err.message });
                return;
            }

        }

    }
}

export { RemoveProductController }