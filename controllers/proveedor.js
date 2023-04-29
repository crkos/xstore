const Proveedor = require('../models/proveedor');
const {sendError} = require('../utils/helper');

exports.createProveedor = async (req, res) => {
    const {nombre_proveedor, direccion, rfc, telefono, correo, } = req.body;

    const oldProveedor = await Proveedor.findOne({ where: {rfc: rfc} });

    if(oldProveedor) return sendError(res, 'Ya hay un proveedor con este rfc');

    const nuevoProveedor = await Proveedor.create({
        nombre_proveedor: nombre_proveedor,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        rfc: rfc,
    });

    res.json({message: "Se ha creado el proveedor exitosamente"});
}

exports.updateProveedor = async (req, res) => {
    const { nombre_proveedor, direccion, telefono, correo, rfc, } = req.body;

    const {proveedorId} = req.params;

    const modProveedor = await Proveedor.findByPk(proveedorId);

    if (!modProveedor) return sendError(res, 'No existe este proveedor');

    modProveedor.nombre_proveedor = nombre_proveedor;
    modProveedor.direccion = direccion;
    modProveedor.telefono = telefono;
    modProveedor.correo = correo;
    modProveedor.rfc = rfc;

    await modProveedor.save();

    res.json({message: "Se ha actualizado el proveedor exitosamente"});

}

exports.deleteProveedor = async (req, res) => {
const {proveedorId} = req.params;

    const proveedor = await Proveedor.findByPk(proveedorId);

    if(!proveedor) return sendError(res, 'No existe este proveedor')

    await proveedor.destroy();

    res.json({message: "Se ha eliminado el proveedor exitosamente"});
}

exports.getProveedores = async (req, res) => {
    const proveedores = await Proveedor.findAll();

    res.json(proveedores);
}

exports.getProveedor = async (req, res) => {
    const {proveedorId} = req.params;

    const proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) return sendError(res, 'No existe este proveedor');

    res.json(proveedor);

}
