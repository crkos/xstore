const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mssql'
});

// Sincronizar el modelo y crear la tabla en la base de datos
sequelize.sync({ force: true })
    .then(() => {
        console.log('Tablas creadas exitosamente');
    })
    .catch((error) => {
        console.log('Error al crear las tablas', error);
    });

module.exports = sequelize;


