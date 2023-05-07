const cloudinary = require('../cloud');

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

/***
 * @description: Sube una imagen a cloudinary
 * @param file {string} Archivo a subir
 * @returns {Promise<{url: string, public_id: string}>} Objeto con la url y él, id público de la imagen
 */
exports.uploadImageToCloud = async (file) => {
    const {secure_url: url, public_id} = await cloudinary.uploader.upload(file, {});

    return { url , public_id };
};