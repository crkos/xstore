const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Proveedor = sequelize.define('Proveedor', {
    clave_proveedor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        unique: true,
        is: /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]{2}[0-9]?$/
    }
}, {
    tableName: 'Proveedor',
    timestamps: false
});

module.exports = Proveedor;