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
// Criação da tabela clientes no Banco de Dados
//=============================================
// 'use strict'

const clientes = () => {

    const Cliente = sequelize.define('clientes', {
        nome: {
            type: Sequelize.STRING
        },
        cnh: {
            type: Sequelize.STRING
        },
        endereco: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        }
    });
    Cliente.sync({
        force:true
    });//Forçando a execução do clientes para criar a tabela no banco de dados

    return Cliente;
}
module.exports = clientes;