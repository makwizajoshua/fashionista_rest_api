import Category from "../models/category.mjs";

export default class CategoryController {
    async addCategory(req, res, next) {
        try {
            Category.create(...req.body).then((data) => {
                res.status(200).send({message: "Category created successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch(e) {
            next(e);
        }
    }
    async getCategories(req, res, next) {
        try {
            Category.find().then((data) => {
                res.status(200).send(data);
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch(e) {
            next(e);
        }
    }
    async getCategory(req, res, next) {
        try {
            Category.findOne({_id: req.params.id}).then((data) => {
                res.status(200).send(data);
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch(e) {
            next(e);
        }
    }
    async updateCategory(req, rs, next) {
        try {
            Category.findOneUpdate({_id: req.params.id},...req.body).then((data) => {
                res.status(200).send({message: "Category updated successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch(e) {
            next(e);
        }
    }
    async deleteCategory(req, rs, next) {
        try {
            Category.findOneDelete({_id: req.params.id}).then((data) => {
                res.status(200).send({message: "Category deleted successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch(e) {
            next(e);
        }
    }
}