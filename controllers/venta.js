const Venta = require('../models/venta');
const Producto = require('../models/producto');
const ventaProducto = require('../models/ventaproducto');
const Cliente = require('../models/cliente');

const {sendError} = require('../utils/helper');
const {Op} = require("sequelize");


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
    const ventas = await Venta.findAll( { include: [ Producto, Cliente,]},);

    const ventasTotales = {
        ventas
    };

    res.json({ventasTotales});
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
    });

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

exports.searchVenta = async (req, res) => {
    const {producto} = req.query;
    const {clave_cliente} = req.user;

    const ventas = await Venta.findAll({
        include: {
            model: Producto,
            where: {
                nombre_producto: {
                    [Op.like]: `%${producto}%`,
                },
            }
        },
        where: {
            clave_cliente: clave_cliente,
        }
    });

    const comprasTotales = await Venta.count({
        where: { clave_cliente: clave_cliente },
        include: {
            model: Producto,
            where: {
                nombre_producto: {
                    [Op.like]: `%${producto}%`,
                }
            }
        }
    });

    const ventasTotales = {
        ventas,
        comprasTotales,
    }

    res.json({ventasTotales});

}

exports.devolverVenta = async (req, res) => {
    const { ventaId } = req.params;
    const { clave_cliente } = req.user;

    const venta = await Venta.findByPk(ventaId, {
        where: {
            clave_cliente: clave_cliente,
        },
    });

    if (!venta) return sendError(res, 'No existe esta venta');

    const productos = await ventaProducto.findAll({
        where: {
            clave_venta: ventaId,
        },
    });


    for (const producto of productos) {
        const modProducto = await Producto.findByPk(producto.clave_producto);

        if (!modProducto) return sendError(res, 'No existe este producto');

        modProducto.existencia += producto.cantidad_comprada;

        await modProducto.save();
    }

    // Actualizar el estado de los productos a "Devuelto"
    await ventaProducto.update(
        { estado_venta: 'Devuelto' },
        { where: { clave_venta: ventaId } }
    );

    res.json({ message: 'Se ha devuelto la venta exitosamente' });
}

exports.cancelarVenta = async (req, res) => {
    const { ventaId } = req.params;
    const { clave_cliente } = req.user;

    const venta = await Venta.findByPk(ventaId, {
        where: {
            clave_cliente: clave_cliente,
        },
    });

    if (!venta) return sendError(res, 'No existe esta venta');

    const productos = await ventaProducto.findAll({
        where: {
            clave_venta: ventaId,
        },
    });


    for (const producto of productos) {
        const modProducto = await Producto.findByPk(producto.clave_producto);

        if (!modProducto) return sendError(res, 'No existe este producto');

        modProducto.existencia += producto.cantidad_comprada;

        await modProducto.save();
    }

    // Actualizar el estado de los productos a "Devuelto"
    await ventaProducto.update(
        { estado_venta: 'Cancelado' },
        { where: { clave_venta: ventaId } }
    );

    res.json({ message: 'Se ha cancelado la venta exitosamente' });
}