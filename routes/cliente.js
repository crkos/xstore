const { createCliente, deleteCliente, getCliente, getClientes, loginCliente, updateClienteInfo } = require('../controllers/cliente');
const {isAuth} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/', createCliente);

router.patch('/:clienteId',isAuth, updateClienteInfo);

router.delete('/:clienteId',isAuth, deleteCliente);

router.get('/:clienteId',isAuth, getCliente);

router.get('/',isAuth, getClientes);

router.post('/login', loginCliente);

module.exports = router;