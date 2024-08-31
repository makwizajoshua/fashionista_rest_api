import express from "express";
import RatingController from "../controllers/ratingController.mjs";

const ratingRouter = express.Router();

// Creates a rating for a product from the db
ratingRouter.post("/ratings/add", async (req, res, next) => await new RatingController().addRating(req, res, next));

//Gets the ratings fro a particular product from the db
ratingRouter.get("/ratings/:id", async (req, res, next) => await new RatingController().getRatings(req, res, next));

export default ratingRouter;