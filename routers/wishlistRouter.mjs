import express from 'express';
import WishlistedProductsController from '../controllers/wishlistedProductsController.mjs';

const wishlistRouter = express.Router();
const wishlistedProductsController = new WishlistedProductsController();

wishlistRouter.post('wishlisted-products', wishlistedProductsController.addProductToWishlist);

wishlistRouter.get('wishlisted-products', wishlistedProductsController.getAllWishlistedProducts);
wishlistRouter.get('wishlisted-products/:id', wishlistedProductsController.getWishlistedProductById);

wishlistRouter.delete('wishlisted-products/:id', wishlistedProductsController.removeProductFromWishlist);

export default wishlistRouter;