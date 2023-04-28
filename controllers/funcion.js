const Funcion = require('../models/funcion');
const {sendError} = require("../utils/helper");

exports.createFuncion = async (req, res) => {
    const {funcion} = req.body;

    const oldFuncion = await Funcion.findOne({ where: {funcion: funcion} });

    if(oldFuncion) return sendError(res, 'Ya hay una función con este nombre');

    const nuevaFuncion = await Funcion.create({
        funcion: funcion,
    });

    res.json({message: "Se ha creado la función exitosamente"});

}

exports.updateFuncion = async (req, res) => {
    const { funcion } = req.body;

    const {funcionId} = req.params;

    const modfuncion = await Funcion.findByPk(funcionId);

    if(!modfuncion) return sendError(res, 'No existe esta función');

    modfuncion.funcion = funcion;

    await modfuncion.save();

    res.json({message: "Se ha actualizado la función exitosamente"});

}

exports.deleteFuncion = async (req, res) => {
const {funcionId} = req.params;

    const funcion = await Funcion.findByPk(funcionId);

    if(!funcion) return sendError(res, 'No existe esta función');

    await funcion.destroy();

    res.json({message: "Se ha eliminado la función exitosamente"});
}

exports.getFunciones = async (req, res) => {
    const funciones = await Funcion.findAll();

    res.json(funciones);
}

exports.getFuncion = async (req, res) => {
    const {funcionId} = req.params;

    const funcion = await Funcion.findByPk(funcionId);

    if(!funcion) return sendError(res, 'No existe esta función');

    res.json(funcion);
}