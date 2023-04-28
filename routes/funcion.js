const { createFuncion, deleteFuncion, updateFuncion, getFuncion, getFunciones } = require('../controllers/funcion');

const router = require('express').Router();

router.post('/', createFuncion);

router.patch('/:funcionId', updateFuncion);

router.delete('/:funcionId', deleteFuncion);

router.get('/:funcionId', getFuncion);

router.get('/', getFunciones);

module.exports = router;

