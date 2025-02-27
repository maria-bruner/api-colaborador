const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empresa = require('./Empresa');
const CentroCusto = require('./CentroCusto');

const Colaborador = sequelize.define('Colaborador', {
    cpf: { type: DataTypes.STRING, primaryKey: true },
    usuario: DataTypes.STRING,
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    cargo: DataTypes.STRING,
    matricula: DataTypes.STRING
});

Colaborador.belongsTo(Empresa, { foreignKey: 'empresaCnpj' });
Colaborador.belongsTo(CentroCusto, { foreignKey: 'centroCustoId' });

module.exports = Colaborador;