import express from 'express';
import ProductController from '../controllers/productController.mjs';

const router = express.Router();
const productController = new ProductController();

router.post('product', productController.createProduct);

router.get('products', productController.getAllProducts);
router.get('product/:id', productController.getProductById);

router.patch('product/:id', productController.updateProduct);

router.delete('product/:id', productController.deleteProduct);

export default router;