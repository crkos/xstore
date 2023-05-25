const { createDepartamento, deleteDepartamento, getDepartamento, getDepartamentos, updateDepartamento,
    searchDepartamento
} = require('../controllers/departamento');
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/',isAuth, isAuthorized, createDepartamento);

router.patch('/:departamentoId',isAuth, isAuthorized, updateDepartamento);

router.delete('/:departamentoId',isAuth, isAuthorized, deleteDepartamento);

router.get('/:departamentoId', getDepartamento);

router.get('/', getDepartamentos);

router.get('/departamento/search',isAuth, isAuthorized, searchDepartamento);

module.exports = router;