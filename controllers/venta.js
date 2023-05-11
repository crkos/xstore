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

        if(modProducto.existencia === 0) return sendError(res, 'No hay existencia de este producto');

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
            cantidad_comprada: producto.cantidad,
        });
    }

    res.json({message: "Se ha creado la venta exitosamente"});
}

exports.deleteVenta = async (req, res) => {
    const {ventaId} = req.params;

    const venta = await Venta.findByPk(ventaId);

    if(!venta) return sendError(res, 'No existe esta venta');

    await venta.destroy();

    res.json({message: "Se ha eliminado la venta exitosamente"});
}

exports.getVentas = async (req, res) => {
    const ventas = await Venta.findAll();

    res.json({ventas});
}

exports.getVentaFromUser = async (req, res) => {
    const { clave_cliente } = req.user;

    const ventas = await Venta.findAll({
        where: {
            clave_cliente: clave_cliente,
        },
        include: {
            model: Producto,
        }
    });

    const comprasTotales = await Venta.count({
        where: { clave_cliente: clave_cliente }
    })

    const ventasTotales = {
        ventas,
        comprasTotales,
    }

    res.json({ventasTotales});
}

exports.getVenta = async (req, res) => {
    const {ventaId} = req.params;

    const venta = await Venta.findByPk(ventaId);

    if(!venta) return sendError(res, 'No existe esta venta');

    res.json({venta});
}
