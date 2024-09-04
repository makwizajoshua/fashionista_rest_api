import express from 'express';
import UserController from '../controllers/userController.mjs';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('user', userController.createUser);

userRouter.get('users', userController.readUsers);
userRouter.get('user/:id', userController.readUser);

userRouter.patch('user/:id', userController.updateUser);

userRouter.delete('user/:id', userController.deleteUser);

export default userRouter;