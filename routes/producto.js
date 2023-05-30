const { createProducto, updateProducto, deleteProducto, getProducto, getProductos, searchProducto, editCantidadProducto,
    getProductoBySucursal
} = require('../controllers/producto');
const {uploadImage} = require("../middlewares/multer");
const {isAuth, isAuthorized} = require("../middlewares/auth");


const router = require('express').Router();

router.post('/',isAuth, isAuthorized, uploadImage.single('imagen_producto'),createProducto);

router.patch('/:productoId',isAuth, isAuthorized, uploadImage.single('imagen_producto') ,updateProducto);

router.delete('/:productoId',isAuth, isAuthorized, deleteProducto);

router.get('/:productoId', getProducto);

router.get('/', getProductos);

router.get('/productos/sucursal', isAuth, isAuthorized, getProductoBySucursal);

router.get('/search/producto', searchProducto);

router.patch('/edit/edit', isAuth, isAuthorized,editCantidadProducto);

module.exports = router;