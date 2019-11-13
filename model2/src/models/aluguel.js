

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
    status:{
        type: Sequelize.CHAR
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: 'clientes', // <<< Note, its table's name, not object name
            foreignKey: 'id' // <<< Note, its a column name
        }

    },
    id_veiculo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'veiculos', // <<< Note, its table's name, not object name
            foreignKey: 'id' // <<< Note, its a column name
        }
    },


});

Aluguel.sync({
    force: false
}); //Force : false, para não deletar a tabela existente

module.exports = Aluguel;