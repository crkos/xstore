const Venta = require('../models/venta');
const Producto = require('../models/producto');
const ventaProducto = require('../models/ventaproducto');

const {sendError} = require('../utils/helper');


exports.createVenta = async (req, res) => {
    const { productos } = req.body;
    const { clave_cliente } = req.user;

    let totalVenta = 0;

    for (const producto of productos) {
        const { clave_producto, cantidad } = producto;

        const modProducto = await Producto.findByPk(clave_producto);

        if (!modProducto) return sendError(res, 'No existe este producto');

        if(modProducto.existencia < cantidad) return sendError(res, 'No hay suficiente existencia de este producto');

        modProducto.existencia -= cantidad;

        await modProducto.save();

        totalVenta += modProducto.precio * cantidad;

    }

    const nuevaVenta = await Venta.create({
        fecha: new Date(),
        total: totalVenta,
        clave_cliente: clave_cliente,
    });

    for (const producto of productos) {
        await ventaProducto.create({
            clave_venta: nuevaVenta.clave_venta,
            clave_producto: producto.clave_producto,
        });
    }

    res.json({message: "Se ha creado la venta exitosamente"});
}