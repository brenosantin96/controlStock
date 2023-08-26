import { Request, Response } from "express";
import { GetAllProductsService } from "../../services/product/GetAllProductsService";

class ListProductsController {

    async handle(request: Request, response: Response) {
        const listProductsService = new GetAllProductsService();

        try {

            const products = await listProductsService.execute();
            return response.json(products);


        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                response.status(400).json({ error: err.message });
                return;
            }

        }

    }
}



export { ListProductsController }