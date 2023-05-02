const { createVenta, deleteVenta, getVentas, getVenta} = require('../controllers/venta');
const {isAuth, isAuthorized} = require("../middlewares/auth");


const router = require('express').Router();

router.post('/',isAuth, isAuthorized, createVenta);

router.delete('/:ventaId',isAuth, isAuthorized, deleteVenta);

router.get('/',isAuth, isAuthorized, getVentas);

router.get('/:ventaId',isAuth, isAuthorized, getVenta);
