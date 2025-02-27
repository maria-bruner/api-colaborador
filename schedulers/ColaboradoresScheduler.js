require('dotenv').config();
const apiService = require('../services/apiService');
const LoggerService = require('../services/loggerService');
const Colaborador = require('../models/Colaborador');
const Empresa = require('../models/Empresa');
const CentroCusto = require('../models/CentroCusto');
const sequelize = require('../config/database');
const cron = require('node-cron');

const cronSchedule = process.env.CRON_SCHEDULE

class ColaboradoresScheduler {
    constructor() {
        this.isRunning = false;
        this.loggerService = null
    }

    async process() {
        let allRegisters = 0;
        let added = 0;
        let updates = 0;
        let ignores = 0;
        let errors = [];

        try {
            this.loggerService.log('Iniciando processamento');
            const data = await apiService.fetchColaboradores();
            allRegisters = data.length;
            this.loggerService.log(`Total de registros recebidos: ${allRegisters}`);

            for (const register of data) {
                try {
                    this.loggerService.log(`Processando colaborador: ${register.nome}`);

                    const [empresa] = await Empresa.findOrCreate({
                        where: {
                            cnpj: register.empresa_cnpj
                        },
                        defaults: {
                            nome: register.empresa_nome
                        }
                    });

                    let centroCusto = null;
                    if (register.centro_custo_identificador) {
                        [centroCusto] = await CentroCusto.findOrCreate({
                            where: {
                                id: register.centro_custo_identificador
                            },
                            defaults: {
                                nome: register.centro_custo_nome
                            }
                        });
                    }

                    if (!centroCusto) {
                        this.loggerService.log(`Colaborador ${register.nome} ignorado: sem centro de custo.`);
                        ignores++;
                        continue;
                    }

                    const {colaborador, created} = await Colaborador.upsert({
                        cpf: register.cpf,
                        usuario: register.usuario,
                        nome: register.nome,
                        sobrenome: register.sobrenome,
                        cargo: register.cargo,
                        matricula: register.matricula,
                        empresaCnpj: empresa.cnpj,
                        centroCustoId: centroCusto.id
                    }, {
                        returning: true
                    });

                    if (created) {
                        added++;
                        this.loggerService.log(`Novo colaborador adicionado: ${register.nome}`);
                    } else {
                        updates++;
                        this.loggerService.log(`Colaborador atualizado: ${register.nome}`);
                    }
                } catch (exception) {
                    const errorProcessMessage = `Erro ao processar ${register.nome}: ${exception.message}`;
                    errors.push(errorProcessMessage);
                    this.loggerService.log(errorProcessMessage);
                }
            }

        } catch (exception) {
            this.loggerService.log(`Erro ao buscar e salvar dados: ${exception.message}`);
            throw exception;
        }

        this.loggerService.log('Resumo do processamento');
        this.loggerService.log(`Total de registros recebidos: ${allRegisters}`);
        this.loggerService.log(`Adicionados: ${added}`);
        this.loggerService.log(`Atualizados: ${updates}`);
        this.loggerService.log(`Ignorados (sem centro de custo): ${ignores}`);
        this.loggerService.log(`Erros: ${errors.length}`);

        if (errors.length > 0) {
            this.loggerService.log('Detalhes dos erros: ');
            errors.forEach(error => this.loggerService.log(error));
        }
    }

    async run() {
        try {
            this.loggerService = new LoggerService();
            await sequelize.sync();
            await this.process();
        } catch (exception) {
            console.error('Erro no processamento:', exception.message);
        }
    }

    start() {
        this.run()
        cron.schedule(cronSchedule, async () => {
            if (this.isRunning) {
                return;
            }
            this.isRunning = true;
            await this.run();
            this.isRunning = false;
        });
    }
}

module.exports = new ColaboradoresScheduler();