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




const Cliente = require('../models/cliente');
const Veiculo = require('../models/veiculo');
const Aluguel = require('../models/aluguel');


//===============================
//definindo as rotas
//===============================

module.exports = {
    // Mostra todos os Cliente ou Cliente por ID
    async showCliente(req, res) {
        let cliente
        if (req.params.id)
            cliente = await Cliente.findByPk(req.params.id);
        else
            cliente = await Cliente.findAll();

        return res.json(cliente);
    },

    

    //Lista todos veiculos ou veiculos por id
    async showVeiculo(req, res) {
        let veiculo = [];
        if (req.params.id)
            veiculo.push(await Veiculo.findByPk(req.params.id));
        else {
            veiculo.push(await Veiculo.findAll());
        }
        return res.json(veiculo)
    },
    //Lista todos veiculos Disponiveis
    async showVeiculoDisponivel(req, res){
            await sequelize.query(' SELECT * FROM veiculos WHERE status = ?;', {
            replacements: [req.params.id],
            type: sequelize.QueryTypes.SELECT
        }).then(veiculoOk => {
            return res.json(veiculoOk);
        })
    },
//lista todos veiculos Alugados e Reservados
    async showVeiculoReserva(req, res){
        await sequelize.query(
            `SELECT v.id, v.modelo, v.placa, v.status, a.data_inicial, a.data_final, a.id as aluguelId, a.id_cliente 
            FROM veiculos AS v, aluguels AS a 
            WHERE ((v.status = 'a') OR (v.status = 'r')) 
            AND 
            ((v.id = a.id_veiculo) AND (a.status <> 'd'));`, {
            type: sequelize.QueryTypes.SELECT
        }).then(veiculoOk => {
            return res.json(veiculoOk);
        })
    },

    //Lista todos os alugueis ou alugueis por id
    async showAluguel(req, res) {
        let aluguel;
        if (req.params.id)
            aluguel = await Aluguel.findByPk(req.params.id);
        else {
            aluguel = await Aluguel.findAll();
        }
        return res.json(aluguel);
    },

    

    //Insert um cliente
    async insertCliente(req, res) {
        var cliente = [];
        cliente.push(await Cliente.create(req.body));
        return res.json(cliente);
    },

    //Insert um Veiculo
    async insertVeiculo(req, res) {
        const veiculo = await Veiculo.create(req.body);
        return res.json(veiculo);
    },

    //Cria um Aluguel
    async insertAluguel(req, res) {
        const aluguel = await Aluguel.create(req.body);
        return res.json(aluguel);
    },
    // Update Cliente
    async updateClienteId(req, res) {
        const cliente = await Cliente.findByPk(req.params.id);
        await cliente.update(req.body);
        res.json(cliente);
    },
    //Update Veiculo
    async updateVeiculoId(req, res) {
        const veiculo = await Veiculo.findByPk(req.params.id);
        await veiculo.update(req.body);
        res.json(veiculo);
    },
    //Update status Aluguel
    async updateStatusAluguel(req, res){
        const aluguel = await Aluguel.findByPk(req.params.id);
        await aluguel.update(req.body);
        res.json(aluguel);
    },

    //delete Cliente
    async destroyCliente(req, res) {
        const cliente = await Cliente.findByPk(req.params.id);
        await cliente.destroy();
        return res.send();
    },
    //delete Veiculo
    async destroyVeiculo(req, res) {
        const veiculo = await Veiculo.findByPk(req.params.id);
        await veiculo.destroy();
        return res.send();
    },
    // delete Aluguel
    async destroyAluguel(req, res) {
        const aluguel = await Aluguel.findByPk(req.params.id);
        await aluguel.destroy();
        return res.send();
    },
}