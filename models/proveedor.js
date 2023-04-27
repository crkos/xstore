const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Proveedor = sequelize.define('Proveedor', {
    clave_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Proveedor',
    timestamps: false
});

module.exports = Proveedor;