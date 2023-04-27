const {DataTypes} = require('sequelize');
const sequelize = require('../db/db');

const Sucursal = sequelize.define('Sucursal', {
    clave_sucursal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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