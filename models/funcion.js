const {DataTypes} = require('sequelize');
const sequelize = require('../db/db');

const Funcion = sequelize.define('funcion', {
    clave_funcion: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    funcion: {
        type: DataTypes.ENUM('Administrador', 'Gerente', 'Cajero', 'Vendedor', 'Usuario'),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Funcion',
    timestamps: false
});


module.exports = Funcion;