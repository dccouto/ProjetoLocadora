//=============================================
//Conexão e teste de conexão com o BD
//=============================================
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('locadora', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// sequelize.authenticate().then(() => {
//     console.log('Conectado com sucesso.');
//   }).catch(err => {
//     console.error('Falha ao se conectar:', err);
//   });
  //============area de teste==============
//const Veiculo = require('./veiculo');
// Veiculo();

//const Cliente = require('./cliente');
//Cliente();

 //const Aluguel = require('./aluguel');
//  Aluguel();


const Imprime = require('./inserir');
Imprime();
// const Imprime = require('./teste');
// Imprime();

  //============fim da area de teste==============

//=============================================
// Criação da tabela clientes no Banco de Dados
//=============================================
//   const Cliente = sequelize.define('clientes',{
//       nome:{
//             type: Sequelize.STRING
//       },
//       cnh:{
//           type: Sequelize.STRING
//       },
//       endereco:{
//           type: Sequelize.STRING
//       },
//       telefone:{
//           type: Sequelize.STRING
//       }
//   });
//   Cliente.sync({force:true});//Forçando a execução do clientes para criar a tabela no banco de dados



