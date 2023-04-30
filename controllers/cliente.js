const Cliente = require('../models/cliente');

const {sendError} = require('../utils/helper');
const {Op} = require("sequelize");
const {generateToken} = require("../utils/jwt");

exports.createCliente = async (req, res) => {
    const { correo, contrasena } = req.body;

    const oldCliente = await Cliente.findOne({ where: {correo: correo} });

    if (oldCliente) return sendError(res, 'Este usuario ya esta registrado');

    const nuevoCliente = await Cliente.create({
        correo: correo,
        contrasena: contrasena,
    });

    const {clave_cliente, nombre} = nuevoCliente;

    const jwtToken = await generateToken(nuevoCliente.clave_cliente);

    res.json({user: {clave_cliente, nombre}, token: jwtToken ,message: "Se ha registrado exitosamente"});
}

exports.updateClienteInfo = async (req, res) => {
    const { nombre, rfc, direccion, telefono, correo, contrasena } = req.body;

    const {clienteId} = req.params;

    const modCliente = await Cliente.findByPk(clienteId);

    if (!modCliente) return sendError(res, 'No existe este cliente');

    const oldCliente = await Cliente.findOne({ where: {
        [Op.or] : [{rfc: rfc}, {correo: correo}, {telefono: telefono}],
        [Op.ne] : {clave_cliente: clienteId}
        } });

    if (oldCliente) return sendError(res, 'Ya hay un cliente con este RFC, correo o teléfono');

    modCliente.nombre = nombre;
    modCliente.rfc = rfc;
    modCliente.direccion = direccion;
    modCliente.telefono = telefono;
    modCliente.correo = correo;
    modCliente.contrasena = contrasena;

    await modCliente.save();

    res.json({message: "Se ha actualizado el cliente exitosamente"});

}

exports.deleteCliente = async (req, res) => {
    const {clienteId} = req.params;

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) return sendError(res, 'No existe este cliente');

    await cliente.destroy();

    res.json({message: "Se ha eliminado el cliente exitosamente"});
}

exports.getCliente = async (req, res) => {
    const {clienteId} = req.params;

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) return sendError(res, 'No existe este cliente');

    res.json(cliente);
}

exports.getClientes = async (req, res) => {
    const clientes = await Cliente.findAll();

    res.json(clientes);
}

exports.loginCliente = async (req, res) => {
    const { correo, contrasena } = req.body;

    const cliente = await Cliente.findOne({ where: {correo: correo} });

    const matched = await cliente.comparePassword(contrasena);

    if (!matched) return sendError(res, 'Correo o contraseña incorrectos');

    const jwtToken = await generateToken(cliente.clave_cliente);

    const {clave_cliente, nombre} = cliente;

    res.json({user: {clave_cliente, nombre}, token: jwtToken});

}