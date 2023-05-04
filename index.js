const express = require('express');
require('express-async-errors');
require('dotenv').config();
const personalRouter = require('./routes/personal');
const funcionRouter = require('./routes/funcion');
const SucursalRouter = require('./routes/sucursal');
const proveedorRouter = require('./routes/proveedor');
const departamentoRouter = require('./routes/departamento');
const productoRouter = require('./routes/producto');
const clienteRouter = require('./routes/cliente');

const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utils/helper');
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//////////////////////////// Modelos de la base de datos
const personal = require('./models/personal');
const funcion = require('./models/funcion');
const sucursal = require('./models/sucursal');
const producto = require('./models/producto');
const departamento = require('./models/departamento');
const proveedor = require('./models/proveedor');
const cliente = require('./models/cliente');
const venta = require('./models/venta');
const ventaProducto = require('./models/ventaproducto');
////////////////////////////



app.use('/api/v1/personal', personalRouter);
app.use('/api/v1/funcion', funcionRouter);
app.use('/api/v1/sucursal', SucursalRouter);
app.use('/api/v1/proveedor', proveedorRouter);
app.use('/api/v1/departamento', departamentoRouter);
app.use('/api/v1/producto', productoRouter);
app.use('/api/v1/cliente', clienteRouter);

app.use('/*', handleNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
})

