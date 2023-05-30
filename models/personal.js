const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Funcion = require('./funcion');
const Sucursal = require('./sucursal');
const {hashSync, compare} = require("bcrypt");

//Modelo de la tabla Personal en la base de datos
const Personal = sequelize.define('Personal', {
    clave_personal: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_materno: {
        type: DataTypes.STRING,
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        is: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        is: /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]{2}[0-9]?$/
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false

    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    turno: {
        type: DataTypes.ENUM('Matutino', 'Vespertino'),
        allowNull: false
    },
    ano_ingreso: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('contrasena', hashSync(value, 10));
        }
    }
}, {
    tableName: 'Personal',
    timestamps: false,
});

//Compara la contraseña ingresada con la contraseña encriptada
Personal.prototype.comparePassword = async function(password) {
    return await compare(password, this.contrasena);
}

// Relaciones de la tabla Personal y sucursal
Personal.belongsTo(Sucursal, { foreignKey: 'clave_sucursal', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Sucursal.hasMany(Personal, { sourceKey: 'clave_sucursal', foreignKey: 'clave_sucursal', onDelete: 'CASCADE', onUpdate: 'CASCADE'  });



//Relaciones de la tabla Personal y funcion
Personal.belongsTo(Funcion, { foreignKey: 'clave_funcion', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Funcion.hasMany(Personal, { sourceKey: 'clave_funcion', foreignKey: 'clave_funcion', onUpdate: 'CASCADE', onDelete: 'CASCADE' });



module.exports = Personal;