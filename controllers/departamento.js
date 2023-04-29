const Departamento = require('../models/departamento');
const {sendError} = require('../utils/helper');

exports.createDepartamento = async (req, res) => {
    const {nombre_departamento} = req.body;

    const oldDepartamento = await Departamento.findOne({ where: {nombre_departamento: nombre_departamento} });

    if (oldDepartamento) return sendError(res, 'Ya hay un departamento con este nombre');

    const nuevoDepartamento = await Departamento.create({
        nombre_departamento: nombre_departamento,
    });

    res.json({message: "Se ha creado el departamento exitosamente"});
}

exports.updateDepartamento = async (req, res) => {
    const { nombre_departamento } = req.body;

    const {departamentoId} = req.params;

    const modDepartamento = await Departamento.findByPk(departamentoId);

    if (!modDepartamento) return sendError(res, 'No existe este departamento');

    modDepartamento.nombre_departamento = nombre_departamento;

    await modDepartamento.save();

    res.json({message: "Se ha actualizado el departamento exitosamente"});

}

exports.deleteDepartamento = async (req, res) => {
const {departamentoId} = req.params;

    const departamento = await Departamento.findByPk(departamentoId);

    if(!departamento) return sendError(res, 'No existe este departamento')

    await departamento.destroy();

    res.json({message: "Se ha eliminado el departamento exitosamente"});
}

exports.getDepartamentos = async (req, res) => {
    const departamentos = await Departamento.findAll();

    res.json(departamentos);
}

exports.getDepartamento = async (req, res) => {
    const {departamentoId} = req.params;

    const departamento = await Departamento.findByPk(departamentoId);

    if(!departamento) return sendError(res, 'No existe este departamento');

    res.json(departamento);
}