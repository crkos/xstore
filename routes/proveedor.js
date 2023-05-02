const {createProveedor, deleteProveedor, getProveedor, getProveedores, updateProveedor} = require('../controllers/proveedor');
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/',isAuth, isAuthorized, createProveedor);

router.patch('/:proveedorId',isAuth, isAuthorized, updateProveedor);

router.delete('/:proveedorId',isAuth, isAuthorized, deleteProveedor);

router.get('/:proveedorId',isAuth, isAuthorized, getProveedor);

router.get('/',isAuth, isAuthorized, getProveedores);

module.exports = router;