const Personal = require('../models/personal');
const Sucursal = require('../models/sucursal');
const Funcion = require('../models/funcion');
const {sendError} = require("../utils/helper");
const {Op} = require("sequelize");

exports.createPersonal = async (req, res) => {
    const {nombre, apellidoPaterno, apellidoMaterno, curp, rfc, direccion, telefono, correo_electronico, turno, contrasena} = req.body;
    const { sucursal, funcion } = req.query;

    const oldPersonal = await Personal.findOne({ where: {
        [Op.or]: [{curp: curp}, {rfc: rfc}, {correo_electronico: correo_electronico}]
        } });

    if(oldPersonal) return sendError(res, 'Ya hay un personal con este CURP, RFC o correo electrónico');

    const nuevoPersonal = await Personal.create({
        nombre: nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        curp: curp,
        rfc: rfc,
        direccion: direccion,
        telefono: telefono,
        correo_electronico: correo_electronico,
        turno: turno,
        contrasena: contrasena,
        clave_sucursal: sucursal,
        clave_funcion: funcion,
    });

    res.json({message: "Se ha creado el personal exitosamente"});

}

exports.updatePersonal = async (req, res) => {
    const {nombre, apellidoPaterno, apellidoMaterno, curp, rfc, direccion, telefono, correo_electronico, turno, contrasena} = req.body;
    const { sucursal, funcion } = req.query;

    const {personalId} = req.params;

    const personal = await Personal.findByPk(personalId);

    if(!personal) return sendError(res, 'No existe este personal');

    personal.nombre = nombre;
    personal.apellido_paterno = apellidoPaterno;
    personal.apellido_materno = apellidoMaterno;
    personal.curp = curp;
    personal.rfc = rfc;
    personal.direccion = direccion;
    personal.telefono = telefono;
    personal.correo_electronico = correo_electronico;
    personal.turno = turno;
    personal.contrasena = contrasena;
    personal.clave_sucursal = sucursal;
    personal.clave_funcion = funcion;

    await personal.save();

    res.json({message: "Se ha actualizado el personal exitosamente"});

}

exports.deletePersonal = async (req, res) => {
    const {personalId} = req.params;

    const personal = await Personal.findByPk(personalId);

    if(!personal) return sendError(res, 'No existe este personal');

    await personal.destroy();

    res.json({message: "Se ha eliminado el personal exitosamente"});
}

exports.getPersonal = async (req, res) => {
    const { personalId } = req.params;

    const user = await Personal.findByPk(personalId, {
        include: [Sucursal, Funcion]
    });

    if(!user) return sendError(res, 'No existe este personal');

    const personal =  {
        id: user.clave_personal,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        curp: user.curp,
        rfc: user.rfc,
        direccion: user.direccion,
        telefono: user.telefono,
        correo_electronico: user.correo_electronico,
        turno: user.turno,
        sucursal: {
            id: user.Sucursal.clave_sucursal,
            nombre: user.Sucursal.nombre_sucursal,
        },
        funcion: {
            id: user.funcion.clave_funcion,
            nombre: user.funcion.funcion,
        }
    };

    res.json({personal});

}

exports.getAllPersonal = async (req, res) => {
    const users = await Personal.findAll({
        include: [Sucursal, Funcion]
    });

    const personal = users.map(personal => {
        return {
            id: personal.clave_personal,
            nombre: personal.nombre,
            apellido_paterno: personal.apellido_paterno,
            apellido_materno: personal.apellido_materno,
            curp: personal.curp,
            rfc: personal.rfc,
            direccion: personal.direccion,
            telefono: personal.telefono,
            correo_electronico: personal.correo_electronico,
            turno: personal.turno,
            ano_ingreso: personal.ano_ingreso,
            sucursal: {
                id: personal.Sucursal.clave_sucursal,
                nombre: personal.Sucursal.nombre_sucursal,
            },
            funcion: {
                id: personal.funcion.clave_funcion,
                nombre: personal.funcion.funcion,
            }
        }
    });

    res.json({personal});
}