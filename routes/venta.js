const { createVenta, deleteVenta, getVentas, getVenta, getVentaFromUser, searchVenta, devolverVenta, cancelarVenta} = require('../controllers/venta');
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/',isAuth, createVenta);

router.delete('/:ventaId',isAuth, isAuthorized, deleteVenta);

router.get('/',isAuth, isAuthorized, getVentas);

router.get('/:ventaId',isAuth, isAuthorized, getVenta);

router.get('/ventas/user',isAuth, getVentaFromUser);

router.get('/search/venta/',isAuth, searchVenta);

router.get('/devolver/:ventaId',isAuth, devolverVenta);

router.get('/cancelar/:ventaId',isAuth, cancelarVenta);

module.exports = router;
