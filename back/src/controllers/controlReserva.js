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

//===============================================

const {format, differenceInMinutes} = require('date-fns');

module.exports = {

    //lista cliente por cnh
    async showCnh(req, res) {
        await sequelize.query('SELECT * FROM clientes WHERE cnh = ?', {
            replacements: [req.params.id],
            type: sequelize.QueryTypes.SELECT
        }).then(userXpost => {
            return res.json(userXpost);
        })
    },

    //Calcula valor do Aluguel
    calculaValor(req, res) {
        
        sequelize.query('SELECT valor FROM veiculos WHERE id = ?', {
            replacements: [req.params.id],
            type: sequelize.QueryTypes.SELECT
            
        }).then(dados => {
            const dataIni = new Date(req.params.dataIni);
            const dataFin = new Date(req.params.dataFin);
            const quantMin = differenceInMinutes(dataFin, dataIni);
            const total = quantMin * (parseFloat(dados[0].valor) / 1440);
            return res.json(total.toFixed(2).toString().replace('.', ','));
        })
    },
}