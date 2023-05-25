const {createProveedor, deleteProveedor, getProveedor, getProveedores, updateProveedor, searchProveedor} = require('../controllers/proveedor');
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/',isAuth, isAuthorized, createProveedor);

router.patch('/:proveedorId',isAuth, isAuthorized, updateProveedor);

router.delete('/:proveedorId',isAuth, isAuthorized, deleteProveedor);

router.get('/:proveedorId',isAuth, isAuthorized, getProveedor);

router.get('/',isAuth, isAuthorized, getProveedores);

router.get('/proveedor/search',isAuth, isAuthorized, searchProveedor);

module.exports = router;