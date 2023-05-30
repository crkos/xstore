const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const { hashSync, compare} = require("bcrypt");
const Funcion = require('./funcion');

//Modelo de la tabla Cliente en la base de datos
const Cliente = sequelize.define('Cliente', {
    clave_cliente: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    rfc: {
        type: DataTypes.STRING,
        is: /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]{2}[0-9]?$/,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('contrasena', hashSync(value, 10));
        }
    },
}, {
    tableName: 'Cliente',
    timestamps: false,
});

//Compara la contraseña ingresada con la contraseña encriptada
Cliente.prototype.comparePassword = async function(password) {
    return await compare(password, this.contrasena);
}

//Relaciones de la tabla Cliente y función
Cliente.belongsTo(Funcion, { foreignKey: 'clave_funcion', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Funcion.hasMany(Cliente, { sourceKey: 'clave_funcion', foreignKey: 'clave_funcion', onUpdate: 'CASCADE', onDelete: 'CASCADE' });


module.exports = Cliente;