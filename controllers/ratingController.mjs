import Product from "../models/product.mjs";
import Rating from "../models/rating.mjs";

export default class RatingController {

    async addRating(req, res, next) {
        try {
            const alreadyRated = await Rating.findOne({"userId" : req.body.userId});
            if (alreadyRated) {
                res.status(409).send({"error": "The user already rated the product"});
            } else {
                await Rating.create(...req.body);
                await this.calculateAverageRating(res,res, next);
                await this.saveAverageRating(req, res, next);
                res.status(200).send({"message": "Product successfully rated"});
            }
        } catch (e) {
            next(e);
        }
    }
    async getRatings(req, res, next) {
        try {
            const ratings = await Rating.find({"productId" : req.body.prodductId});
            if (!ratings) {
                res.status(404).send({"error": "Could not find ratings"});
            } else {
                res.status(200).send(ratings);
            }
        } catch (e) {
            next(e);
        }
    }
    //Inner methods
    async calculateAverageRating(req, res ,next) {
        try {
            const productRatings = Rating.find({"prodductId" : res.body.prodductId});
            if (!productRatings) {
                res.status(409).send({"error": "Error retrieving the product"});
            } else {
                let ratings = 0;
                for (let i = 0; i < productRatings.length; i++) {
                   ratings += productRatings[i].productRating;
                }
                average = ratings / productRatings.length;
                res.status(200).send({"average" : average});
            }
        } catch (e) {
            next(e);
        }
    }
    async saveAverageRating(req, res, next) {
        try {
            const productRatings = Rating.find({"prodductId" : res.body.prodductId});
            if (!productRatings) {
                res.status(409).send({"error": "Error retrieving the product"});
            } else {
                let ratings = 0;
                for (let i = 0; i < productRatings.length; i++) {
                   ratings += productRatings[i].productRating;
                }
                average = ratings / productRatings.length;
                await Product.findOneAndUpdate({_id: req.body._id},{rating: average}).then(() => {
                    res.status(200).send({"newRating": average});
                }).catch((errorData) => {
                    res.status(409).send({"error": errorData});
                });
            }
        } catch(e) {
            next(e);
        }
    }
}