/***
 * @description: Maneja los errores de la aplicación
 * @param err Objeto de error
 * @param req Objeto de petición de express
 * @param res Objeto de respuesta de express
 * @param next Función que se ejecuta cuando el middleware termina
 */
exports.errorHandler = (err, req, res, next) => {
    res.status(500).json({error: err.message || err});
};