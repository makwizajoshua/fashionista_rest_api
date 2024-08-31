import Business from "../models/business.mjs";

export default class BusinessController {
    // POST methods below
    async checkBusinessExist(req, res, next) {
        try {
            const business = await Business.findOne({"userId": req.params.id});
            if (!business) {
                res.status(404).send({ "error": "Business not found" });
            } else {
                res.status(202).send({
                    "_id": business._id,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    async createBusiness(req, res, next) {
        try {
            const business = await Business.findOne({ "businessName": req.body.businessName });
            if (business) {
                res.status(409).send({ error: "Business already exists" });
            } else {
                await Business.create({'productId': req.body.productId, 'userId' : req.body.userId, 'businessName': req.body.businessName, 'businessDescription': req.body.businessDescription, 'businessLocation': req.body.businessLocation}).then(function(business) {
                    res.status(200).send({ "_id": business._id });
                }).catch((err) => {
                    res.status(404).send({"error": "fjkl"});
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // GET methods below
    async getBusiness(req, res, next) {
        await Business.findOne({'userId' : req.params.id}).then(function(business) {
            if (business) {
                res.status(200).send(business);
            } else {
                res.status(404).send({ "error": "Business not found." });
            }
        }).catch(next);
    }

    async getBusinesses(req, res, next) {
        await Business.find().then(function(businesses) {
            res.status(200).send(businesses);
        }).catch(next);
    }

    // PUT methods below
    async updateBusiness(req, res, next) {
        const businessId = req.params.id;
        await Business.findOneAndUpdate({ "_id": businessId }, req.body, { new: true }).then(function(updatedBusiness) {
            if (updatedBusiness) {
                res.status(200).send(updatedBusiness);
            } else {
                res.status(404).send({ "error": "Business not found. Could not update Business details." });
            }
        }).catch(next);
    }

    // DELETE methods below
    async deleteBusiness(req, res, next) {
        if (req.method != 'DELETE')
            res.status(409).send({"error" : "Invalid request received!"});

        const businessId = req.params.id;
        Business.findOneAndDelete({ "_id": businessId }).then(function(result) {
            if (result) {
                res.status(200).send({ "message": "Business deleted successfully." });
            } else {
                res.status(404).send({ "error": "Business not found." });
            }
        }).catch(next);
    }
}