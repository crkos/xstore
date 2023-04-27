const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const jwtPrivateKey = path.resolve('') + '/keys-jwt/private-key.pem';
const jwtPublicKey = path.resolve('') + '/keys-jwt/public-key.pem';

/***
 * @description: Genera un token JWT
 * @param id {string} ID del usuario
 * @returns {Promise<string>} Token generado
 */
exports.generateToken = async (id) => {
    const payload = {
        userId: id,
    };
    return await jwtSign(payload);
};

/***
 * @description: Verifica si el token es válido
 * @param token {string} Token a verificar
 * @returns {Promise<Object>} Objeto con el payload del token
 */
exports.verifyToken = async (token) => {
    return await jwtVerify(token);
};

const jwtSign = (payload) => {
    const options = {
        algorithm: 'RS256',
        expiresIn: '24h'
    }
    return new Promise((resolve, reject) => {
        try {
            const cert = fs.readFileSync(jwtPrivateKey);
            const token = jwt.sign(payload, cert, options);
            resolve(token);
        } catch (err) {
            reject(err);
        }
    })
}

const jwtVerify = (token) => {
    const options = {
        algorithms: ['RS256']
    }
    return new Promise((resolve, reject) => {
        try {
            const cert = fs.readFileSync(jwtPublicKey);
            const result = jwt.verify(token, cert, options);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}