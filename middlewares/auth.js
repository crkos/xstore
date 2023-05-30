const Funcion = require('../models/funcion');
const Cliente = require("../models/cliente");
const Personal = require("../models/personal");
const Sucursal = require("../models/sucursal");
const { sendError } = require("../utils/helper");
const { verifyToken } = require("../utils/jwt");

/***
 * @description: Middleware que válida que el usuario esté autenticado
 * @param req Objeto de petición de express
 * @param res Objeto de respuesta de express
 * @param next Función que se ejecuta cuando el middleware termina
 * @returns {Promise<void>} No retorna nada
 */
exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;
    if(!token) return sendError(res, 'Sesión invalida, Token no encontrado');
    const jwtToken = token.split('Bearer ')[1];
    if(!jwtToken) return sendError(res, 'Sesión invalida, Token no encontrado');
    const decode = await verifyToken(jwtToken).catch(_ => sendError(res, 'Sesión Expirada, Vuelva a iniciar sesión'));
    if(!decode) return;
    const {clave_cliente} = decode;
    const clave_personal = clave_cliente;

    const user = await Cliente.findByPk(clave_cliente, {include: Funcion});
    const personal = await Personal.findByPk(clave_personal, {
        include: [Sucursal, Funcion]
    });
    if(!user && !personal) return sendError(res, 'Usuario no encontrado', 401);


    if(user) req.user = user;
    if(personal) req.user = personal;


    next();
}


/***
 * @description: Middleware que válida que el usuario esté autorizado para realizar la acción
 * @param req  Objeto de petición de express
 * @param res Objeto de respuesta de express
 * @param next  Función que se ejecuta cuando el middleware termina
 */
exports.isAuthorized = (req, res, next) => {
    const { user } = req;

    const { funcion } = user;

    if(funcion.funcion !== 'Administrador' && funcion.funcion !== "Gerente") return sendError(res, "Acceso no autorizado");

    next();
}