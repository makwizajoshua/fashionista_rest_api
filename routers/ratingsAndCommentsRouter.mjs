import express from 'express';
import RatingsAndCommentsController from '../controllers/ratingsAndCommentsController.mjs';

const ratingsAndCommentsRouter = express.Router();
const ratingsAndCommentsController = new RatingsAndCommentsController();

ratingsAndCommentsRouter.post('ratingsAndComments', ratingsAndCommentsController.createRatingAndComment);

ratingsAndCommentsRouter.get('ratingsAndComments', ratingsAndCommentsController.getRatingsAndComments);
ratingsAndCommentsRouter.get('ratingsAndComments/:id', ratingsAndCommentsController.getRatingAndCommentById);

ratingsAndCommentsRouter.patch('ratingsAndComments/:id', ratingsAndCommentsController.updateRatingAndComment);

ratingsAndCommentsRouter.delete('ratingsAndComments/:id', ratingsAndCommentsController.deleteRatingAndComment);

export default ratingsAndCommentsRouter;