const { createVenta } = require('../controllers/venta');


const router = require('express').Router();

router.post('/', createVenta);
