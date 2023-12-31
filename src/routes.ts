import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { RemoveUserController } from './controllers/user/RemoveuserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';
import { EditUserController } from './controllers/user/EditUserController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { EditProductController } from './controllers/product/EditProductController';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { ListProductsController } from './controllers/product/ListProductsController';
import { RemoveProductController } from './controllers/product/RemoveProductController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });

});

// User
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/user/edit", isAuthenticated, EditUserController); //functional method
router.delete("/user/remove", new RemoveUserController().handle);


// Category
router.get("/category/all", isAuthenticated, new ListCategoryController().handle);
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", isAuthenticated, new EditCategoryController().handle);
router.delete("/category/remove", isAuthenticated, new RemoveCategoryController().handle)

//Product
router.get("/products", isAuthenticated, new ListProductsController().handle);
router.get("/product", isAuthenticated, new ListProductByCategoryController().handle);
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.put("/product/edit", isAuthenticated, upload.single("file"), new EditProductController().handle);
router.delete("/product/remove", isAuthenticated, new RemoveProductController().handle);

export default router;