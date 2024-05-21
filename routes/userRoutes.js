import express from "express";
import { createProductController, deleteProductController, getproductController, loginController, registerController, updateProductController } from "../controllers/userController.js";
import { checkUserLogin } from "../middlewares/middleware.js";
import upload from "../middlewares/upload.js";
const userRouter = express.Router();

userRouter.post('/register',registerController);
userRouter.post('/login',loginController);
userRouter.post(
    '/create-product',
    checkUserLogin,
    upload.fields([
      { name: 'image', maxCount: 1 }, 
    ]),
    createProductController
  );
 userRouter.get('/get-products',checkUserLogin,getproductController);
userRouter.put('/update-product/:id',checkUserLogin,
upload.fields([
    { name: 'image', maxCount: 1 }, 
  ]),updateProductController);
userRouter.delete('/delete-product/:id',checkUserLogin,deleteProductController);

export default userRouter;