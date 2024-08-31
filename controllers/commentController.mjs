import Comment from "../models/comment.mjs";

export default class CommentController {
    async addComment(req, res, next) {
        try {
            await Comment.create(...req.body).then((data) => {
                res.status(200).send({"message" : "Comment created successfully"});
            }).catch(() => {
                res.status(409).send({"error" : "An error occured while creating the comment"});
            });
        } catch(e) {
            next(e);
        }
    }
    async getComments(req, res, next) {
        try {
            const comments = await Comment.find({"productId": req.body.productId}).catch(() => {
                res.status(409).send({"error": "Failed to fetch comments from the database"});
            });
            if (comments) {
                res.status(200).send({"message": "No comment found"});
            } else {
                res.status(200).send(comments);
            }
        } catch(e) {
            next(e);
        }
    }
    async getCommentCount(req, res, next) {
        try {
            const comments = await Comment.find({"productId": req.body.productId}).catch(() => {
                res.status(409).send({"error": "Failed to fetch comment conunt from the database"});
            });
            if (comments) {
                res.status(200).send({"count": 0});
            } else {
                res.status(200).send({"count" : comments.length});
            }
        } catch(e) {
            next(e);
        }
    }
    async deleteComment(req, res, next) {
        try {
            await Comment.findOneAndUpdate({"userId": req.body.userId, "productId": req.body.productId}, {"commentContent": "This comment was deleted"}).catch(() => {
                res.status(409).send({"error": "Could not delete the comment"});
            });
            res.status(200).send({"message": "Comment deleted successfully"});
        } catch(e) {
            next(e);
        }
    }
}