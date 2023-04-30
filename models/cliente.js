const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const { hashSync, compareSync} = require("bcrypt");

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
        set(value) {
            this.setDataValue('contrasena', hashSync(value, 10));
        }
    },
}, {
    tableName: 'Cliente',
    timestamps: false,
});

Cliente.prototype.comparePassword = (password) => {
    return compareSync(password, this.contrasena);
}

module.exports = Cliente;