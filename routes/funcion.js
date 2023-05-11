const { createFuncion, deleteFuncion, updateFuncion, getFuncion, getFunciones } = require('../controllers/funcion');
const {isAuth, isAuthorized} = require("../middlewares/auth");

//Estas rutas no tienen mucha utilidad, pero se dejan por si se necesitan en un futuro
const router = require('express').Router();

router.post('/',isAuth, isAuthorized,createFuncion);

router.patch('/:funcionId',isAuth, isAuthorized, updateFuncion);

router.delete('/:funcionId',isAuth, isAuthorized, deleteFuncion);

router.get('/:funcionId',isAuth, isAuthorized, getFuncion);

router.get('/',isAuth, isAuthorized, getFunciones);

module.exports = router;

