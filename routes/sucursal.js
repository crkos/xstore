const {createSucursal, deleteSucursal, updateSucursal, getSucursal, getSucursales} = require("../controllers/sucursal");
const router = require('express').Router();

router.post('/', createSucursal);

router.delete('/:sucursalId', deleteSucursal);

router.patch('/:sucursalId', updateSucursal);

router.get('/:sucursalId', getSucursal);

router.get('/', getSucursales);

module.exports = router;