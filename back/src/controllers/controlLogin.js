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
//-----------------------------------------------

const Login = require('../models/login');
const bcrypt = require('bcrypt')

module.exports = {


    // Verifica login e senha
    async login(req, res) {
        // const salt = bcrypt.genSaltSync(10);
            const login = await Login.findAll({
            where: {
                username: req.body.username
            }
        })
        if(login[0]){
            if(await bcrypt.compareSync(req.body.pass,login[0].password)){

                

                return res.json(login[0]);
            }
            else
                return res.json(false);             
        }
        else
            return res.json(false);
    },


    // Verifica sessão
    async session(req,res){
        const session = await Login.findAll({
            where: {
                sessao: req.body.session
            }
        })
        if(session[0])          
            return res.json(true);
        else
            return res.json(false);
    },
    
//gera sessão
    async gerarSession(req,res){
        
        let numSessao = Math.random();
        await sequelize.query(`UPDATE logins set sessao = '${numSessao}' where id_cliente = ?;`, {
            replacements: [req.body.id_cliente],
            type: sequelize.QueryTypes.SELECT
        }).then(
            res.json(numSessao)
        )

    }
}