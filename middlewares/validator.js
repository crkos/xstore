//TODO Validar las rutas que faltan que son practica mente todas menos personal

const { check, validationResult } = require("express-validator");


exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        return res.json({ error: error[0].msg });
    }

    next();
};

exports.validatePersonal = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().isString(),
    check('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty().isString(),
    check('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty().isString(),
    check('curp', 'El CURP es obligatorio').not().isEmpty().isString().custom((value) => {
        const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
        if (!value.match(curpRegex)) {
            throw new Error('El CURP no tiene un formato válido');
        }
        return true;
    }),
    check('rfc', 'El RFC es obligatorio').not().isEmpty().isString().custom((value) => {
        const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]{2}[0-9]?$/;
        if (!value.match(rfcRegex)) {
            throw new Error('El RFC no tiene un formato válido');
        }
        return true;
    }),
    check('direccion', 'La dirección es obligatorio').not().isEmpty().isString(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty().isMobilePhone('es-MX'),
    check('correo_electronico', 'El correo electrónico es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    check('turno', 'El turno es obligatorio').not().isEmpty().isString().isIn(['Matutino', 'Vespertino']),
    check("contrasena", "La contraseña es obligatoria").not().isEmpty().isString().isLength({ min: 8, max: 16 }),
]