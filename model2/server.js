const express = require('express');
const app = express();
const cors = require('cors');//adicionar pacote para permissão do CORS
const requireDir = require('require-dir');

app.use(cors()); // Utilizando o CORS para evitar bloqueio de segurança


//============================
//Configurar o para pegar POSTS via Json
//============================
app.use(express.json());
//============================
//Definindo o caminho das requisições a partir da rota raiz
//============================
requireDir('./src/models');
app.use('/', require('./src/routes')); //envia todas as rotas /api para o arquivo  ./src/routes
//============================
//inicia o servidor 
//============================
app.listen(3000);




