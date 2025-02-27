const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CentroCusto = sequelize.define('CentroCusto', {
    id: { type: DataTypes.STRING, primaryKey: true},
    nome: DataTypes.STRING
});

module.exports = CentroCusto;