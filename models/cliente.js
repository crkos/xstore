const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const { hash } = require("bcrypt");

const Cliente = sequelize.define('Cliente', {
    clave_cliente: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    rfc: {
        type: DataTypes.STRING,
        unique: true,
        is: /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]{2}[0-9]?$/
    },
    direccion: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        async set(value) {
            this.setDataValue('contrasena', await hash(value, 10));
        }
    },
}, {
    tableName: 'Cliente',
    timestamps: false,
});

module.exports = Cliente;