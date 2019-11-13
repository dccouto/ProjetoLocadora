//=============================================
//Conexão e teste de conexão com o BD
//=============================================
const Sequelize = require('sequelize');

const sequelize = new Sequelize('locadora', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conectado com sucesso.');
}).catch(err => {
    console.error('Falha ao se conectar:', err);
});

//=============================================
// Criação da tabela veiculo no Banco de Dados
//=============================================

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
    potencia: {
        type: Sequelize.STRING
    },
    combustivel: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    }
});
Veiculo.sync({
    force: false
}); //Force : false, para não deletar a tabela existente

module.exports = Veiculo;