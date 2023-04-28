const Sucursal = require('../models/sucursal');
const {sendError} = require("../utils/helper");

exports.createSucursal = async (req, res) => {
    const {nombre_sucursal} = req.body;

    const oldSucursal = await Sucursal.findOne({ where: {nombre_sucursal: nombre_sucursal} });

    if(oldSucursal) return sendError(res, 'Ya hay una sucursal con este nombre');

    const nuevaSucursal = await Sucursal.create({
        nombre_sucursal: nombre_sucursal,
    });

    res.json({message: "Se ha creado la sucursal exitosamente"});

}

exports.updateSucursal = async (req, res) => {
    const { nombre_sucursal } = req.body;

    const {sucursalId} = req.params;

    const modSucursal = await Sucursal.findByPk(sucursalId);

    if(!modSucursal) return sendError(res, 'No existe esta sucursal');

    modSucursal.nombre_sucursal = nombre_sucursal;

    await modSucursal.save();

    res.json({message: "Se ha actualizado la sucursal exitosamente"});

}

exports.deleteSucursal = async (req, res) => {
const {sucursalId} = req.params;

    const sucursal = await Sucursal.findByPk(sucursalId);

    if(!sucursal) return sendError(res, 'No existe esta sucursal');

    await sucursal.destroy();

    res.json({message: "Se ha eliminado la sucursal exitosamente"});
}

exports.getSucursales = async (req, res) => {
    const sucursales = await Sucursal.findAll();

    res.json(sucursales);
}

exports.getSucursal = async (req, res) => {
    const {sucursalId} = req.params;

    const sucursal = await Sucursal.findByPk(sucursalId);

    if(!sucursal) return sendError(res, 'No existe esta sucursal');

    res.json(sucursal);
}
