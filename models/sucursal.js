const {DataTypes} = require('sequelize');
const sequelize = require('../db/db');

//Modelo de la tabla Sucursal en la base de datos
const Sucursal = sequelize.define('Sucursal', {
    clave_sucursal: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre_sucursal: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    tableName: 'Sucursal',
    timestamps: false
})

module.exports = Sucursal;