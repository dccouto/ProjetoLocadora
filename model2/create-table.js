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

const Cliente = require('./cliente');
sequelize.sync().then(()=>{
    Cliente.create({
        nome: "ciclano",
        cnh: "456",
        endereco: "Rua outro",
        telefone: "9999999"
      })
})
// const Veiculo = require('./veiculo');
// sequelize.sync().then(()=>{
//     Veiculo.create({
//     modelo: "FACTOR 150 UBS",
//     marca: "Yamaha",
//     placa: "lty1298",
//     valor: 33.50,
//     potencia: "12,2cv (7.500 rpm) | Álcool: 12,4cv (7.500 rpm)",
//   combustivel: "Gasolina/Etanol",
//     link: "./img/2019_FACTOR_150_PRETO-ECLIPSE.jpg"
//     });
// });
// sequelize.sync().then(()=>{
//   Veiculo.create({
  // modelo: "CROSSER 150 S ABS",
  // marca: "Yamaha",
  // placa: "jtp1658",
  // valor: 45.90,
  // potencia: "12,2cv/7.500 rpm (Gasolina) – 12,4cv/7.500 rpm (Etanol)",
  // combustivel: "Gasolina/Etanol",
  // link: "./img/Moto_Crosser_S_2018_Lateral_Preto_Eclipse-Preto-Solido.jpg"
//   });
// });
// sequelize.sync().then(()=>{
  // Veiculo.create({
  // modelo: "R3 ABS",
  // marca: "Yamaha",
  // placa: "ppy8778",
  // valor: 80.90,
  // potencia: "42,01 cv / 10.750 rpm",
  // combustivel: "Gasolina",
  // link: "./img/2020_R3_lateral_direita_racing_blue.jpg"
//   });
// });
// sequelize.sync().then(()=>{
  // Veiculo.create({
  // modelo: "MT-07",
  // marca: "Yamaha",
  // placa: "lty1548",
  // valor: 109.90,
  // potencia: "74,8 cv (9.000 rpm)",
  // combustivel: "Gasolina",
  // link: "./img/Moto_MT-07_ABS_2020_lateral_direita_ice_fluo.jpg"
//   });
// });
// sequelize.sync().then(()=>{
//   Veiculo.create({
  // modelo: "NMAX 160 ABS",
  // marca: "Yamaha",
  // placa: "kdl3170",
  // valor: 41.50,
  // potencia: "15,1 cv (8.000rpm)",
  // combustivel: "Gasolina",
  // link: "./img/Moto_Scooter_NMAX_ABS_2018_Lateral_S-White-Branco-Metalico.jpg"
//   });
// });


// const Aluguel = require('./aluguel');
// sequelize.sync().then(()=>{
//     Aluguel.create({
//     id_cliente: 1,
//     id_veiculo: 1,
//     data_inicial: Date.now(),
//     data_final: Date.now(),
//     data_efetiva: Date.now(),
//     });
// });



// ==============================Acima sequelize=======================================================

// // =========================
// // CRIANDO A CONEXÃO COM BD
// // =========================
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'locadora'
// });
// // ===================================
// // CONECTA BANCO DE DADOS
// // ===================================
// // function connect() {
//   connection.connect(function (err) {
//     if (err) return console.log(err);
//     console.log('conectou!');
//     createTable(connection);
//   })
// // }
// // ===================================
// // DESCONECTA BANCO DE DADOS
// // ===================================
// function disconect() {
//   connection.end();
// }

// // ===================================
// // CRIAÇÃO DE DADOS
// // ===================================

// function createTable(conn) {
//   const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n" +
//     "id int NOT NULL AUTO_INCREMENT,\n" +
//     "nome varchar(100) NOT NULL,\n" +
//     "cnh varchar(11) NOT NULL,\n" +
//     "endereco varchar(150) NOT NULL,\n" +
//     "telefone varchar(11) NOT NULL,\n" +
//     "PRIMARY KEY (ID)\n" +
//     ");";

//   conn.query(sql, function (error, results, fields) {
//     if (error) return console.log(error);
//     console.log('criou a tabela!');
//   });
//   // disconect();

// }

// // ===================================
// // INSERÇÃO DE DADOS
// // ===================================
// function addRows(conn) {
//   // connect();
//   const sql = "INSERT INTO Clientes(nome,cnh,endereco,telefone) VALUES ?";
//   const values = [
//     ['teste1', '12345678901', 'Rua alguma coisa','9921899384'],
//     ['teste1', '09876543210', 'Avenida alguma coisa','9921899384'],
//     ['teste3', '12312312399', 'Alameda alguma coisa','9921899384']
//   ];
//   conn.query(sql, [values], function (error, results, fields) {
//     if (error) 
//       return console.log(error);
//     console.log('adicionou registros!');
//   });
//   // disconect();
// }

