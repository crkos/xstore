const { createDepartamento, deleteDepartamento, getDepartamento, getDepartamentos, updateDepartamento } = require('../controllers/departamento');

const router = require('express').Router();

router.post('/', createDepartamento);

router.patch('/:departamentoId', updateDepartamento);

router.delete('/:departamentoId', deleteDepartamento);

router.get('/:departamentoId', getDepartamento);

router.get('/', getDepartamentos);

module.exports = router;