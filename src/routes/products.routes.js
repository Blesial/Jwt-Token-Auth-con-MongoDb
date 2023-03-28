const {Router} = require('express');
const allControllers = require('../controllers/Products.controller');
const router = Router();
const {verifyToken, verifyIsModerador, verifyIsAdmin} = require('../middleware/verifyToken');

router.get('/', allControllers.getProduct);
router.get('/:productId', allControllers.getProductById)
router.post('/', [verifyToken, verifyIsModerador], allControllers.createProduct);
router.put('/:productId', [verifyToken, verifyIsModerador], allControllers.upadateProductById);
router.delete('/:productId', [verifyToken, verifyIsAdmin], allControllers.deleteProductById);



module.exports = router;