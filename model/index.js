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
// const Veiculo = require('./veiculo');
// Veiculo();

// const Cliente = require('./cliente');
// Cliente();

 const Aluguel = require('./aluguel');
 Aluguel();

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

// //=============================================
// // Criação da tabela veículos no Banco de Dados
// //=============================================
//   const Veiculo = sequelize.define('veiculos',{
//     modelo:{
//           type: Sequelize.STRING
//     },
//     marca:{
//         type: Sequelize.STRING
//     },
//     placa:{
//         type: Sequelize.STRING
//     },
//     valor:{
//         type: Sequelize.FLOAT
//     },
//     link:{
//         type: Sequelize.STRING
//     }
// });
// Veiculo.sync({force:true});//Forçando a execução do veiculos para criar a tabela no banco de dados

// //=============================================
// // Criação da tabela aluguel no Banco de Dados
// //=============================================
// const Aluguel = sequelize.define('aluguel',{
//     id_cliente:{
//           type: Sequelize.INTEGER
//     },
//     id_veiculo:{
//         type: Sequelize.INTEGER
//     },
//     data_inicial:{
//         type: Sequelize.DATE
//     },
//     data_final:{
//         type: Sequelize.DATE
//     },
//     data_efetiva:{
//         type: Sequelize.DATE
//     },
//     id_cliente: {
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'clientes', // <<< Note, its table's name, not object name
//             foreignKey: 'id' // <<< Note, its a column name
//         }
//     },
//     id_veiculo: {
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'veiculos', // <<< Note, its table's name, not object name
//             foreignKey: 'id' // <<< Note, its a column name
//         }
//     }
// });

// Aluguel.sync({force:true});//Forçando a execução do Aluguel para criar a tabela no banco de dados

//=============================================
// Populando dados na tabela clientes
//=============================================
// Cliente.create({
//     nome: 'Fulano',
//     cnh: '12343245454',
//     endereco: 'Rua viscond de taunay',
//     telefone: '992186360'
// })