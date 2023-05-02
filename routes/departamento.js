const { createDepartamento, deleteDepartamento, getDepartamento, getDepartamentos, updateDepartamento } = require('../controllers/departamento');
const {isAuth, isAuthorized} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/', createDepartamento);

router.patch('/:departamentoId',isAuth, isAuthorized, updateDepartamento);

router.delete('/:departamentoId',isAuth, isAuthorized, deleteDepartamento);

router.get('/:departamentoId', getDepartamento);

router.get('/', getDepartamentos);

module.exports = router;