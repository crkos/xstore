const { createCliente, deleteCliente, getCliente, getClientes, loginCliente, updateClienteInfo } = require('../controllers/cliente');

const router = require('express').Router();

router.post('/', createCliente);

router.patch('/:clienteId', updateClienteInfo);

router.delete('/:clienteId', deleteCliente);

router.get('/:clienteId', getCliente);

router.get('/', getClientes);

router.post('/login', loginCliente);

module.exports = router;