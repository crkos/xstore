const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Cliente = sequelize.define('Cliente', {
    clave_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    rfc: {
        type: DataTypes.STRING,
        unique: true
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
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Cliente',
    timestamps: false
});

module.exports = Cliente;