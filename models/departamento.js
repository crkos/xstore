const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Departamento = sequelize.define('Departamento', {
    clave_departamento: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre_departamento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Departamento',
    timestamps: false
});

module.exports = Departamento;