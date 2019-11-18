
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
// Criação da tabela aluguel no Banco de Dados
//=============================================

const Login = sequelize.define('logins', {
    id_cliente: {
        type: Sequelize.INTEGER
    },    
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    sessao: {
        type: Sequelize.STRING
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes', // <<< Note, its table's name, not object name
            foreignKey: 'id' // <<< Note, its a column name
        }
    }
});

Login.sync({
    force: false
}); //Force : false, para não deletar a tabela existente

module.exports = Login;