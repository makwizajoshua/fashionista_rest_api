import Wishlist from "../models/wishlist.mjs";

export default class WishlistController {
    async createOrDeleteWishlistItem(req, res, next) {
        try {
            const wishlisted = await Wishlist.findOne({ "userId": req.body.userId, "productId": req.body.productId });
            if (wishlisted) {
                await Wishlist.findOneAndDelete({ userId: req.body.userId, productId: req.body.productId }).then(function(result) {
                    if (result) {
                        res.status(200).send({ "message": "Wishlisted item deleted successfully." });
                    } else {
                        res.status(404).send({ "error": "Wishlist item not found." });
                    }
                });
            } else {
                await Wishlist.create({ "userId": req.body.userId, "productId": req.body.productId, "productName": req.body.productName, "productImageUrl": req.body.productImageUrlgdhhf}).then(function(result) {
                    if (result) {
                        res.status(200).send({ "message": "Wishlisted item created successfully." });
                    } else {
                        res.status(409).send({ "error": "Wishlist could not be created" });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }

    async clearWishlist(req, res, next) {
        try {
            await Wishlist.findOneAndDelete({ "userId": req.body.userId, "productId": req.body.productId }).then(function(data) {
                if (data) {
                    res.status(200).send({ "message": "Wishlisted item deleted successfully." });
                } else {
                    res.status(404).send({ "error": "Wishlist item not found." });
                }
            }).catch(function(error) {
                res.status(409).send({ "error": error.message });
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteWishlistedItem(req, res, next) {
        try {
            const wishlisted = await Wishlist.findOneAndDelete({ "userId": req.params.id });
            if (wishlisted) {
                res.status(200).send({ "message": "Wishlisted item deleted successfully." });
            } else {
                res.status(404).send({ "error": "Wishlist item not found." });
            }
        } catch (error) {
            next(error);
        }
    }

    async getWishlistedItems(req, res, next) {
        try {
            await Wishlist.find({"userId" : req.params.userId}).then(function(wishlisted) {
                if (wishlisted.length > 0) {
                    res.status(200).send(wishlisted);
                } else {
                    res.status(404).send({ "error": "No wishlist items found." });
                }
            });
        } catch (e) {
            next(e);
        }
    }
}