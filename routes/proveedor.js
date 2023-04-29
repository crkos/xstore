const {createProveedor, deleteProveedor, getProveedor, getProveedores, updateProveedor} = require('../controllers/proveedor');

const router = require('express').Router();

router.post('/', createProveedor);

router.patch('/:proveedorId', updateProveedor);

router.delete('/:proveedorId', deleteProveedor);

router.get('/:proveedorId', getProveedor);

router.get('/', getProveedores);

module.exports = router;