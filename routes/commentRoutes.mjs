import express from "express";
import CommentController from "../controllers/commentController.mjs";

const commentRouter = express.Router();

// Adds a comment to the db
commentRouter.post("/comments/", async (req, res, next) => await new CommentController().checkBusinessExist(req, res, next));

// Get all comment for a particular prodcut from the db
commentRouter.get("/comments", async (req, res, next) => await new CommentController().getBusinesses(req, res, next));
// Get a count of all the comment a product has from the db

commentRouter.get("/comments/count", async (req, res, next) => await new CommentController().getBusiness(req, res, next));
// Delete a business from the db
commentRouter.delete("/comments", async (req, res, next) => await new CommentController().deleteBusiness(req, res, next));

export default commentRouter;