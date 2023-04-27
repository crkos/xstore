const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Funcion = require('./funcion');
const Sucursal = require('./sucursal');

const Personal = sequelize.define('Personal', {
    clave_personal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rfc: {
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
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    turno: {
        type: DataTypes.ENUM('Matutino', 'Vespertino'),
        allowNull: false
    }
}, {
    tableName: 'Personal',
    timestamps: false
});

// Relaciones de la tabla Personal y sucursal
Personal.belongsTo(Sucursal, { foreignKey: 'clave_sucursal', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sucursal.hasMany(Personal, { sourceKey: 'clave_sucursal', foreignKey: 'clave_sucursal', onDelete: 'CASCADE', onUpdate: 'CASCADE'  });



//Relaciones de la tabla Personal y funcion
Personal.belongsTo(Funcion, { foreignKey: 'clave_funcion', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Funcion.hasMany(Personal, { sourceKey: 'clave_funcion', foreignKey: 'clave_funcion', onUpdate: 'CASCADE', onDelete: 'CASCADE' });



module.exports = Personal;