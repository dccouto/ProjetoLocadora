//=============================================
//Conexão e teste de conexão com o BD
//=============================================
const Sequelize = require('sequelize');

const sequelize = new Sequelize('locadora', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conectado com sucesso.');
}).catch(err => {
    console.error('Falha ao se conectar:', err);
});

//=============================================
// Criação da tabela Cliente no Banco de Dados
//=============================================


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
    force: false
}); //Force : false, para não deletar a tabela existente


module.exports = Cliente;