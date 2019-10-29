//=============================================
//Conexão e teste de conexão com o BD
//=============================================
const Sequelize = require('sequelize');
const sequelize = require('./conectDB');
//=============================================
// Criação da tabela clientes no Banco de Dados
//=============================================

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
        // force:true
    });//Forçando a execução do clientes para criar a tabela no banco de dados

//=============================================
// Populando dados na tabela clientes
//=============================================
    

}
module.exports = clientes;