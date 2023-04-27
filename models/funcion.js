const {DataTypes} = require('sequelize');
const sequelize = require('../db/db');

const Funcion = sequelize.define('funcion', {
    clave_funcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    funcion: {
        type: DataTypes.ENUM('Administrador', 'Gerente', 'Cajero', 'Vendedor'),
        allowNull: false
    }
}, {
    tableName: 'Funcion',
    timestamps: false
});


module.exports = Funcion;