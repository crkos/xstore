const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const Producto = require('./producto');
const Cliente = require('./cliente');
const VentaProducto = require('./ventaproducto');

//Modelo de la tabla Venta en la base de datos
const Venta = sequelize.define('Venta', {
    clave_venta: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Venta',
    timestamps: false
});

Venta.belongsTo(Cliente, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'clave_cliente'});
Cliente.hasMany(Venta, { sourceKey: 'clave_cliente', foreignKey: 'clave_cliente', onDelete: 'CASCADE', onUpdate: 'CASCADE'});


Venta.belongsToMany(Producto, {through: VentaProducto, foreignKey: 'clave_venta', sourceKey: 'clave_venta', onDelete: 'CASCADE', onUpdate: 'CASCADE', timestamps: false});
Producto.belongsToMany(Venta, {through: VentaProducto, foreignKey: 'clave_producto', sourceKey: 'clave_producto', onDelete: 'CASCADE', onUpdate: 'CASCADE', timestamps: false});

module.exports = Venta;