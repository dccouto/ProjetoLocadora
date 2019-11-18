const express = require('express');
const routes = express.Router();
const control = require('./controllers/control');
const controlReserva = require('./controllers/controlReserva');
const controlLogin = require('./controllers/controlLogin');



routes.get('/list/clientes/:id?', control.showCliente);
routes.get('/clientes/cnh/:id', controlReserva.showCnh);
routes.get('/list/veiculo/:id?', control.showVeiculo);

routes.get('/list/veiculo/disponivel/:id', control.showVeiculoDisponivel);
routes.get('/list/veiculo/reservasealugadas/:id/:q', control.showVeiculoReserva);


routes.get('/aluguel/:id?', control.showAluguel);
routes.get('/calcular/:dataIni/:dataFin/:id', controlReserva.calculaValor);


routes.post('/register/clientes', control.insertCliente);
routes.post('/register/veiculo', control.insertVeiculo);
routes.post('/register/aluguel', control.insertAluguel);

routes.put('/update/cliente/:id', control.updateClienteId);
routes.post('/update/veiculo/:id', control.updateVeiculoId);
routes.post('/update/statusaluguel/:id', control.updateStatusAluguel);
routes.put('/update/veiculo/:id', control.updateVeiculoId);


routes.delete('/delete/cliente/:id', control.destroyCliente);
routes.delete('/delete/veiculo/:id', control.destroyVeiculo);
routes.delete('/delete/aluguel/:id', control.destroyAluguel);



//login
routes.post('/login',controlLogin.login);
routes.post('/session',controlLogin.session);//consulta sessão
routes.post('/session/generate',controlLogin.gerarSession); //gerar sessão
//


module.exports = routes;