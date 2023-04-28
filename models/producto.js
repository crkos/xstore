const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Departamento = require('./departamento');
const Proveedor = require('./proveedor');

const Producto = sequelize.define('Producto', {
   clave_producto: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
   },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Producto',
    timestamps: false
});

Producto.belongsTo(Departamento, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_departamento'});
Departamento.hasMany(Producto, {sourceKey: 'clave_departamento', foreignKey: 'clave_departamento', onDelete: 'CASCADE', onUpdate: 'CASCADE'});



Producto.belongsTo(Proveedor, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_proveedor'});
Proveedor.hasMany(Producto, {sourceKey: 'clave_proveedor', foreignKey: 'clave_proveedor', onDelete: 'CASCADE', onUpdate: 'CASCADE'});


module.exports = Producto;


