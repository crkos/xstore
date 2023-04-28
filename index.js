const express = require('express');
require('express-async-errors');
require('dotenv').config();
const personalRouter = require('./routes/personal');

const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utils/helper');
const app = express();

//////////////////////////// Modelos de la base de datos
const personal = require('./models/personal');
const funcion = require('./models/funcion');
const sucursal = require('./models/sucursal');
const producto = require('./models/producto');
const departamento = require('./models/departamento');
const proveedor = require('./models/proveedor');
const cliente = require('./models/cliente');
const venta = require('./models/venta');
////////////////////////////

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.use('/api/v1/personal', personalRouter);
app.use('/*', handleNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
})

