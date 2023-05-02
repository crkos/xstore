const { createProducto, updateProducto, deleteProducto, getProducto, getProductos } = require('../controllers/producto');
const {uploadImage} = require("../middlewares/multer");
const {isAuth, isAuthorized} = require("../middlewares/auth");


const router = require('express').Router();

router.post('/',isAuth, isAuthorized, uploadImage.single('imagen_producto'), createProducto);

router.patch('/:productoId',isAuth, isAuthorized, uploadImage.single('imagen_producto') ,updateProducto);

router.delete('/:productoId',isAuth, isAuthorized, deleteProducto);

router.get('/:productoId', getProducto);

router.get('/', getProductos);

module.exports = router;