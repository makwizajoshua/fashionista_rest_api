import express from "express";
import AuthenticationController from "../controllers/authenticationController.mjs";

const authenticationRouter = express.Router();
const authenticationController = new AuthenticationController();

authenticationRouter.get("auth/login", authenticationController.login);

authenticationRouter.post("auth/register", authenticationController.register);

authenticationRouter.patch("auth/password", authenticationController.changePassword);

export default authenticationRouter;
