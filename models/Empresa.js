const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
    cnpj: { type: DataTypes.STRING, primaryKey: true },
    nome: DataTypes.STRING
});

module.exports = Empresa;