// =========================================
// API responsável por ouvir as solicitações 
// =========================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

//Configurar o body parser para pegar POSTS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//===============================
//definindo as rotas
//===============================
const router = express.Router();
router.get('/',(req, res) => res.json({message: 'Funcionando!'}));
app.use('/', router);//requisições que chegarem na raiz irão ser enviada para o router

router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id)
        filter = `WHERE ID = ${parseInt(req.params.id)}`;
    execSqlQuery(`SELECT * FROM clientes ${filter};`, res);
});
//query de delete
router.delete('/clientes/:id', (req, res) =>{
    execSqlQuery(`DELETE FROM clientes WHERE id= ${parseInt(req.params.id)};`,res);
})
//Insert um cliente
router.post('/clientes',(req, res)=>{
    const nome = req.body.nome.substring(0,100);
    const cnh = req.body.cnh.substring(0,11);
    const endereco = req.body.endereco.substring(0,150);
    const telefone = req.body.telefone.substring(0,11);
    execSqlQuery(`INSERT INTO clientes (nome, cnh, endereco, telefone) VALUES('${nome}','${cnh}','${endereco}','${telefone}');`,res);
})
// Update Cliente
router.patch('/cliente/:id',(req,res)=>{
    const id=  parseInt(req.params.id);
    const nome = req.body.nome.substring(0,100);
    const cnh = req.body.cnh.substring(0,11);
    const endereco = req.body.endereco.substring(0,150);
    const telefone = req.body.telefone.substring(0,11);
    execSqlQuery(`UPDATE cliente SET nome='${nome}', cnh='${cnh}',endereco='${endereco}',telefone='${telefone}' WHERE id = ${id};`,res);
})

//============================
//inicia o servidor
//============================
app.listen(port);
console.log('API funcionando!');



// ======================================
// EXECUTA A QUERY
// ======================================
function execSqlQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'locadora'
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error)
            res.json(error);
        else
            res.json(results);
        connection.end()
        console.log('Executado!');
    });
}