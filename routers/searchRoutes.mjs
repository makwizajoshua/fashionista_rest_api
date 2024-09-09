import express from 'express';
import SearchController from '../controllers/searchController.mjs';

const searchRouter = express.Router();
const searchController = new SearchController();

searchRouter.post('search/general', searchController.generalSearch);

export default searchRouter;