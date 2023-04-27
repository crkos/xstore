/***
 * @description: Maneja cuando no se encuentra una ruta
 * @param req Objeto de petición de express
 * @param res Objeto de respuesta de express
 */
exports.handleNotFound = (req, res) => {
    this.sendError(res, 'Not Found', 404);
}

/***
 * @description: Enviá error cuando se indica
 * @param res  Objeto de respuesta de express
 * @param error {string} Mensaje de error
 * @param statusCode {number} Codigo de estado HTTP (default 401)
 */
exports.sendError = (res, error, statusCode = 401) => {
    res.status(statusCode).json({error});
}