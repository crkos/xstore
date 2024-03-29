const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Departamento = require('./departamento');
const Proveedor = require('./proveedor');
const Sucursal = require('./sucursal');


//Modelo de la tabla Producto en la base de datos
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
    },
    imagen_producto: {
        type: DataTypes.STRING
    },
    imagen_id: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Producto',
    timestamps: false
});

Producto.belongsTo(Departamento, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_departamento'});
Departamento.hasMany(Producto, {sourceKey: 'clave_departamento', foreignKey: 'clave_departamento', onDelete: 'CASCADE', onUpdate: 'CASCADE'});



Producto.belongsTo(Proveedor, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_proveedor'});
Proveedor.hasMany(Producto, {sourceKey: 'clave_proveedor', foreignKey: 'clave_proveedor', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

Producto.belongsTo(Sucursal, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_sucursal'});
Sucursal.hasMany(Producto, {sourceKey: 'clave_sucursal', foreignKey: 'clave_sucursal', onDelete: 'CASCADE', onUpdate: 'CASCADE'});


module.exports = Producto;


