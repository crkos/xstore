const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const ventaProducto = sequelize.define('ventaProducto', {
    clave_venta: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Venta',
            key: 'clave_venta'
        }
    },
    clave_producto: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Producto',
            key: 'clave_producto'
        }
    }
}, {
    tableName: 'Venta_Producto',
    timestamps: false
});

module.exports = ventaProducto;