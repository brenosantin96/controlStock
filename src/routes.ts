import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { RemoveUserController } from './controllers/user/RemoveuserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';
import { EditUserController } from './controllers/user/EditUserController';

const router = Router();

router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });

});

// User
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/user/edit", isAuthenticated, EditUserController);
router.delete("/user/remove", new RemoveUserController().handle);



// Category
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", isAuthenticated, new EditCategoryController().handle);

export default router;