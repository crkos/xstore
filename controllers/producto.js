const Producto = require('../models/producto');
const Departamento = require('../models/departamento');

const {sendError, uploadImageToCloud} = require('../utils/helper');
const cloudinary = require("../cloud");
const {Op} = require("sequelize");

exports.createProducto = async (req, res) => {
    const { nombre_producto, descripcion, precio, existencia } = req.body;
    const { departamentoId, proveedorId } = req.query;
    const { file } = req;

    console.log(req.query);

    const oldProducto = await Producto.findOne({ where: {nombre_producto: nombre_producto} });

    if (oldProducto) return sendError(res, 'Ya hay un producto con este nombre');

    const nuevoProducto = Producto.build({
        nombre_producto: nombre_producto,
        precio: precio,
        descripcion: descripcion,
        existencia: existencia,
        clave_departamento: departamentoId,
        clave_proveedor: proveedorId,
    });

    if(file){
        const {url, public_id} = await uploadImageToCloud(file.path);
        nuevoProducto.imagen_producto = url;
        nuevoProducto.imagen_id = public_id;
    }

    await nuevoProducto.save();

    res.json({message: "Se ha creado el producto exitosamente"});
}

exports.updateProducto = async (req, res) => {
    const { nombre_producto, descripcion, precio } = req.body;
    const { productoId } = req.params;
    const { departamentoId, proveedorId } = req.query;
    const { file } = req;

    const modProducto = await Producto.findByPk(productoId);

    if (!modProducto) return sendError(res, 'No existe este producto');

    modProducto.nombre_producto = nombre_producto;
    modProducto.descripcion = descripcion;
    modProducto.precio = precio;
    modProducto.clave_departamento = departamentoId;
    modProducto.clave_proveedor = proveedorId;

    const public_id = modProducto.imagen_id;

    if(public_id && file){
        const { result } = await cloudinary.uploader.destroy(public_id);
        if(result !== 'ok'){
            return sendError(res, 'No se pudo eliminar la imagen');
        }
    }

    if(file){
        const { url, public_id} = await uploadImageToCloud(file.path);
        modProducto.imagen_producto = url;
        modProducto.imagen_id = public_id;
    }

    await modProducto.save();

    res.json({producto: modProducto, message: "Se ha actualizado el producto exitosamente"});

}

exports.deleteProducto = async (req, res) => {
    const { productoId } = req.params;

    const producto = await Producto.findByPk(productoId);

    if(!producto) return sendError(res, 'No existe este producto')

    const public_id = producto.imagen_id;

    if(public_id){
        const { result } = await cloudinary.uploader.destroy(public_id);
        if(result !== 'ok'){
            return sendError(res, 'No se pudo eliminar la imagen');
        }
    }

    await producto.destroy();

    res.json({message: "Se ha eliminado el producto exitosamente"});
}

exports.getProductos = async (req, res) => {
    const productos = await Producto.findAll({include: Departamento});

    res.json({productos: productos});
}

exports.getProducto = async (req, res) => {
    const { productoId } = req.params;

    const producto = await Producto.findByPk(productoId);

    if(!producto) return sendError(res, 'No existe este producto');

    res.json({producto: producto});
}

exports.searchProducto = async (req, res) => {
    const { producto } = req.query;

    const productos = await Producto.findAll({
        where: {
            nombre_producto: {
                [Op.like]: `%${producto}%`
            }
        }
    });

    res.json({productos: productos});
}

exports.editCantidadProducto = async (req, res) => {
    const {productoId, existencia} = req.query;

    const producto = await Producto.findByPk(productoId);

    if(!producto) return sendError(res, 'No existe este producto');

    producto.existencia = existencia;

    await producto.save();

    res.json({message: "Se ha actualizado la cantidad del producto exitosamente"});
}