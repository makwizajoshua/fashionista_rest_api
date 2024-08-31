import express from "express";
import WishlistController from "../controllers/wishlistController.mjs";

const wishlistRouter = express.Router();

// Create a wishlisted item on the db and delete if it already present
wishlistRouter.post("/wishlist", async (req, res, next) => await new WishlistController().createOrDeleteWishlistItem(req, res, next));

// Gets the wishlisted item of a particular user
wishlistRouter.get("/wishlist/:id", async (req, res, next) => await new WishlistController().getWishlistByUser(req, res, next));

// Deletes all the wishlists of a particular user
wishlistRouter.delete("/wishlist/clear", async (req, res, next) => await new WishlistController().clearWishlist(req, res, next));
// Deletes one particular wishlist in the db
wishlistRouter.delete("/wishlist/clear/:id", async (req, res, next) => await new WishlistController().deleteWishlistedItem(req, res, next));

export default wishlistRouter;