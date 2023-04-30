const multer = require("multer");
const storage = multer.diskStorage({});

/***
 * @description: Middleware que válida que el archivo sea una imagen
 * @param req Objeto de petición de express
 * @param file Objeto de archivo de express
 * @param cb Función callback, se ejecuta cuando termina la validación
 */
const imageFileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image")) {
        cb("Supported only image files", false);
    }
    cb(null, true);
}


exports.uploadImage = multer({storage, fileFilter: imageFileFilter});