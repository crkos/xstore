const { createCliente, deleteCliente, getCliente, getClientes, loginCliente, updateClienteInfo } = require('../controllers/cliente');
const {isAuth} = require("../middlewares/auth");

const router = require('express').Router();

router.post('/', createCliente);

router.patch('/:clienteId',isAuth, updateClienteInfo);

router.delete('/:clienteId',isAuth, deleteCliente);

router.get('/:clienteId',isAuth, getCliente);

router.get('/',isAuth, getClientes);

router.post('/login', loginCliente);

router.get('/auth/is-auth', isAuth, (req, res) => {
    const {user} = req;
    res.json({user:{id: user.clave_cliente, nombre: user.nombre ,role: user.funcion.funcion, rfc: user.rfc}});
});


module.exports = router;