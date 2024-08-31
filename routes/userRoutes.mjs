import express from "express";
import UserController from "../controllers/userController.mjs";

const userRouter = express.Router();

// Log in functionality
userRouter.post("/user/login", async (req, res, next) => await new UserController().login(req, res, next));
// Log in with id functionality
userRouter.post("/user/login/:id", async (req, res, next) => await new UserController().loginWithId(req, res, next));

// Register functionality
userRouter.post("/user/register", async (req, res, next) => await new UserController().register(req, res, next));

// Get all users from the db
userRouter.get("/users", async (req, res, next) => await new UserController().getUsers(req, res, next));
// Get a specific user from the db
userRouter.get("/user/:id", async (req, res, next) => await new UserController().getUser(req, res, next));

// Update a user's details
userRouter.put("/user/:id", async (req, res, next) => await new UserController().updateUser(req, res, next));
// Update a user's username
userRouter.put("/user/username/:id", async (req, res, next) => await new UserController().changeUsername(req, res, next));
// Update a user's email
userRouter.put("/user/email/:id", async (req, res, next) => await new UserController().changeEmail(req, res, next));
// Update a user's gender
userRouter.put("/user/gender/:id", async (req, res, next) => await new UserController().updateUser(req, res, next));
// Update a user's password
userRouter.put("/user/password/:id", async (req, res, next) => await new UserController().changePassword(req, res, next));

// Delete a user from the db
userRouter.delete("/user/:id", async (req, res, next) => await new UserController().deleteUser(req, res, next));

export default userRouter;