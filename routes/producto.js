const { createProducto, updateProducto, deleteProducto, getProducto, getProductos } = require('../controllers/producto');
const {uploadImage} = require("../middlewares/multer");


const router = require('express').Router();

router.post('/', uploadImage.single('imagen_producto'), createProducto);

router.patch('/:productoId', uploadImage.single('imagen_producto') ,updateProducto);

router.delete('/:productoId', deleteProducto);

router.get('/:productoId', getProducto);

router.get('/', getProductos);

module.exports = router;