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
//Criação da tabela veículos no Banco de Dados
//=============================================

 const veiculos = () => {

    const Veiculo = sequelize.define('veiculos', {
        modelo: {
            type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING
        },
        placa: {
            type: Sequelize.STRING
        },
        valor: {
            type: Sequelize.FLOAT
        },
        link: {
            type: Sequelize.STRING
        }
    });
    Veiculo.sync({
        force: true
    }); //Forçando a execução do veiculos para criar a tabela no banco de dados
    return Veiculo;
}
module.exports = veiculos;