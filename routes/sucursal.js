const {createSucursal, deleteSucursal, updateSucursal, getSucursal, getSucursales} = require("../controllers/sucursal");
const {isAuth, isAuthorized} = require("../middlewares/auth");
const router = require('express').Router();

router.post('/',isAuth, isAuthorized, createSucursal);

router.delete('/:sucursalId',isAuth, isAuthorized, deleteSucursal);

router.patch('/:sucursalId',isAuth, isAuthorized, updateSucursal);

router.get('/:sucursalId',isAuth, isAuthorized, getSucursal);

router.get('/', isAuth, isAuthorized, getSucursales);

module.exports = router;