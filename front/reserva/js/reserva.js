var confirmation;
var usuarioExiste = false;
var veiculoId;
var clienteId
//===========================================
// Inicia a pagina incluindo os cards
//===========================================
function initPage() {
    // sessionStorage.setItem('dados', 'Diego Couto')
    // var myObject = new Vue({
    //     el: '#login',
    //     data: {message: sessionStorage.getItem('dados')}
    //   })
    var xhttp = new XMLHttpRequest();
    veiculoId = location.search.split('id=')[1];
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            veiculos = JSON.parse(this.responseText);
            // ===========Monta o card============== 
            for (let i = 0; i < veiculos.length; i++) {
                document.getElementById('cardM').innerHTML +=
                    `<div id="card${veiculos[i].id}" class="col-sm">
                        <div  class="card" style="width: 18rem;">
                            <div>
                                <header class = "card-header">
                                    <h3 class="modal-title">${veiculos[i].modelo}</h3>
                                </header>
                            </div>
                            <img class="img" src="${veiculos[i].link}">                            
                            <div class="card-footer">
                                <button type="button" id="${veiculos[i].id}" class="btn btn-secondary" data-toggle="modal" data-target="#myModal" onclick="openModal(id)" >
                                    Mais detalhes
                                </button>
                            </div>
                        </div>
                    </div>`
            }
        }
    };

    xhttp.open("GET", `http://localhost:3000/list/veiculo/${veiculoId}`, true);
    // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhttp.send();
    desabilitaForm();
    desabilitaData();
}


//Habilita Form Data
function habilitaData() {
    document.getElementById('dataFinal').disabled = false;

}

//Desabilita Form Data
function desabilitaData() {
    document.getElementById('dataFinal').disabled = true;
}

//Desabilita Form
function desabilitaForm(){
    document.getElementById('formNome').disabled = true;
    document.getElementById('formEndereco').disabled = true;
    document.getElementById('formTelefone').disabled = true;
}
//Habilita Form
function habilitaForm(){
    document.getElementById('formNome').disabled = false;
    document.getElementById('formEndereco').disabled = false;
    document.getElementById('formTelefone').disabled = false;
}

//===========================================
//============== Monta o MODAL ==============
//===========================================
function openModal(id) {
    for (let i = 0; i < veiculos.length; i++) {
        if (id == veiculos[i].id) {
            document.getElementById("modal").innerHTML =
            `<div class="modal-header">
                <h4 class="modal-title">${veiculos[i].modelo}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class= "box_img">
                    <img class= "imgmodal" src="${veiculos[i].link}">
                </div>
                <div class = textmodal>
                    <table class = "table table-striped">
                    <tr>
                        <th>Preço</th>
                        <td>R$ ${veiculos[i].valor.toFixed(2).toString().replace(".", ",")}</th>
                    </tr>
                    <tr>
                        <th>Potência máxima</td>
                        <td>${veiculos[i].potencia}</td>
                    </tr>
                    <tr>
                        <th>Combustível</td>
                        <td>${veiculos[i].combustivel}</td>
                    </tr>
                </table>
                </div>
            </div>`
        }
    }


}
//Verifica o preenchimento da data
function verificaData(){
    if(document.getElementById('dataInicial').value != '')
        habilitaData();
    else{
        desabilitaData();
    }
    if(document.getElementById('dataFinal').value != '' && document.getElementById('dataInicial').value != ''){
        // ==================
        // Calcula Valor
        //===================
        const dtInicial = document.getElementById('dataInicial').value;
        const dtFinal = document.getElementById('dataFinal').value;
        var confirmation;


        var xhttp = new XMLHttpRequest();        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                confirmation = JSON.parse(this.responseText);
                document.getElementById('valorTotal').innerHTML = 
                `<p>O valor da sua reserva é:</p>
                <p>R$ ${confirmation}<p>
                <p>Confirmar sua reserva?</p>`;
               
            }
        };    
        xhttp.open("GET", `http://localhost:3000/calcular/${dtInicial}/${dtFinal}/${veiculoId}`, true);    
        xhttp.send();
    }
}
//==========================================================
//Função para verificar se todos os campos estão preenchidos
//==========================================================
function verificaFormularios() {
    const cnh = document.getElementById('formCnh').value;
    const nome = document.getElementById('formNome').value;
    const endereco = document.getElementById('formEndereco').value;
    const telefone = document.getElementById('formTelefone').value;
    const dtInicial = document.getElementById('dataInicial').value;
    const dtFinal = document.getElementById('dataFinal').value;

    let controle = false;
    if(cnh == ''){
        document.getElementById('formCnh').style.borderColor = '#ff5555';
        controle = true;
    }
    else
        document.getElementById('formCnh').style.borderColor = '#ced4da';
    if(nome == ''){
        document.getElementById('formNome').style.borderColor = '#ff5555';
        controle = true;
    }
    else{
        document.getElementById('formNome').style.borderColor = '#ced4da';
    }
    if(endereco == ''){
        document.getElementById('formEndereco').style.borderColor = '#ff5555';
        controle = true;

    }
    else{
        document.getElementById('formEndereco').style.borderColor = '#ced4da';
    }
    if(telefone == ''){
        document.getElementById('formTelefone').style.borderColor = '#ff5555';
        controle = true;

    }
    else{
        document.getElementById('formTelefone').style.borderColor = '#ced4da';
    }
    if(dtInicial == ''){
        document.getElementById('dataInicial').style.borderColor = '#ff5555';
        controle = true;

    }
    else
        document.getElementById('dataInicial').style.borderColor = '#ced4da';
    if(dtFinal == ''){
        document.getElementById('dataFinal').style.borderColor = '#ff5555';
        controle = true;

    }
    else
        document.getElementById('dataFinal').style.borderColor = '#ced4da';

    return controle;
    
}

//=========================================
//Cria um aluguel
//=========================================
function alertConfirm(){
             
        const verifica = verificaFormularios();

        if(!verifica){
            if(usuarioExiste){
                cadastraAluguel();
            }
            else{
                cadastraUsuario();
            }
            alteraStatus();
        }

    }
//======================================
//Cadastra usuário no banco de dados
//======================================
function cadastraUsuario() {

    const nome = document.getElementById('formNome').value;
    const cnh = document.getElementById('formCnh').value;
    const endereco = document.getElementById('formEndereco').value;
    const telefone = document.getElementById('formTelefone').value;

    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://localhost:3000/register/clientes`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            clienteId = json[0].id;
            cadastraAluguel();
            
        }
    };
    xhttp.send(JSON.stringify({nome: nome, cnh: cnh,endereco : endereco,telefone : telefone}));
} 
//=================
//Cadastra Aluguel
//=================
function cadastraAluguel() {

    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
        
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://localhost:3000/register/aluguel`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
            console.log(json);
            alert("Reserva Efetuada Com Sucesso!");
            window.location.href = `../index/index.html`;
        }
    };
    xhttp.send(JSON.stringify({id_cliente: clienteId, id_veiculo: veiculoId,data_inicial : dataInicial,data_final : dataFinal,status:"d"}));       



}



function alteraStatus() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/update/veiculo/${veiculoId}`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var json = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.send(JSON.stringify({status: "r"}));
}


    //Função para verificar se o Usuário já existe no Banco de dados

function verificaUser() {
    const cnh = document.getElementById('formCnh').value;
    var xhttp = new XMLHttpRequest();        
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            confirmation = JSON.parse(this.responseText);
            if(confirmation != ''){
                document.getElementById('formNome').value = confirmation[0].nome;
                document.getElementById('formEndereco').value = confirmation[0].endereco;
                document.getElementById('formTelefone').value = confirmation[0].telefone;
                usuarioExiste = true;
                clienteId = confirmation[0].id;
                desabilitaForm();
            }
            else{
                habilitaForm();
                document.getElementById('formNome').value = '';
                document.getElementById('formEndereco').value = '';
                document.getElementById('formTelefone').value = '';
                usuarioExiste = false;
            }            
        }
    };    
    xhttp.open("GET", `http://localhost:3000/clientes/cnh/${cnh}`, true);    
    xhttp.send();
}