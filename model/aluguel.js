//=============================================
//Conexão e teste de conexão com o BD
//=============================================
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('locadora', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// sequelize.authenticate().then(() => {
//     console.log('Conectado com sucesso.');
//   }).catch(err => {
//     console.error('Falha ao se conectar:', err);
//   });

const Sequelize = require('sequelize');
const sequelize = require('./conectDB');
//=============================================
// Criação da tabela aluguel no Banco de Dados
//=============================================
// 'use strict'

const aluguel = () => {

    const Aluguel = sequelize.define('aluguel', {
        id_cliente: {
            type: Sequelize.INTEGER
        },
        id_veiculo: {
            type: Sequelize.INTEGER
        },
        data_inicial: {
            type: Sequelize.DATE
        },
        data_final: {
            type: Sequelize.DATE
        },
        data_efetiva: {
            type: Sequelize.DATE
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes', // <<< Note, its table's name, not object name
                foreignKey: 'id' // <<< Note, its a column name
            }
        },
        id_veiculo: {
            type: Sequelize.INTEGER,
            references: {
                model: 'veiculos', // <<< Note, its table's name, not object name
                foreignKey: 'id' // <<< Note, its a column name
            }
        }
    });

    Aluguel.sync({
        force: true
    }); //Forçando a execução do Aluguel para criar a tabela no banco de dados
    return Aluguel;
}
module.exports = aluguel;