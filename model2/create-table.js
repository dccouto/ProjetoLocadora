// =========================
// CRIANDO A CONEXÃO COM BD
// =========================
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'locadora'
});
// ===================================
// CONECTA BANCO DE DADOS
// ===================================
// function connect() {
  connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
  })
// }
// ===================================
// DESCONECTA BANCO DE DADOS
// ===================================
function disconect() {
  connection.end();
}

// ===================================
// CRIAÇÃO DE DADOS
// ===================================

function createTable(conn) {
  const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n" +
    "id int NOT NULL AUTO_INCREMENT,\n" +
    "nome varchar(100) NOT NULL,\n" +
    "cnh varchar(11) NOT NULL,\n" +
    "endereco varchar(150) NOT NULL,\n" +
    "telefone varchar(11) NOT NULL,\n" +
    "PRIMARY KEY (ID)\n" +
    ");";

  conn.query(sql, function (error, results, fields) {
    if (error) return console.log(error);
    console.log('criou a tabela!');
  });
  // disconect();

}

// ===================================
// INSERÇÃO DE DADOS
// ===================================
function addRows(conn) {
  // connect();
  const sql = "INSERT INTO Clientes(nome,cnh,endereco,telefone) VALUES ?";
  const values = [
    ['teste1', '12345678901', 'Rua alguma coisa','9921899384'],
    ['teste1', '09876543210', 'Avenida alguma coisa','9921899384'],
    ['teste3', '12312312399', 'Alameda alguma coisa','9921899384']
  ];
  conn.query(sql, [values], function (error, results, fields) {
    if (error) 
      return console.log(error);
    console.log('adicionou registros!');
  });
  // disconect();
}



// ===================================
// CHAMANDO AS FUNÇÕES
// ===================================
// connect();

createTable(connection);
addRows(connection);
