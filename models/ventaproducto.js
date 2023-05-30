const sequelize = require('../db/db');
const Venta = require('./venta');
const Producto = require('./producto');
const { DataTypes } = require('sequelize');

//Modelo de la tabla Venta_Producto en la base de datos
const ventaProducto = sequelize.define('ventaProducto', {
    clave_venta: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Venta,
            key: 'clave_venta'
        }
    },
    clave_producto: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Producto,
            key: 'clave_producto'
        }
    },
    cantidad_comprada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_venta: {
        type: DataTypes.ENUM('Entregado', 'Envío', 'Cancelado', 'Devuelto'),
        allowNull: false,
        defaultValue: 'Envío'
    }
}, {
    tableName: 'Venta_Producto',
    timestamps: false
});

module.exports = ventaProducto;