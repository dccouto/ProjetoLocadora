function initPage() {
    if (sessionStorage.getItem('user'))
        mountPage();
    else
        window.location.href = `../login/login.html`

}

function logoff() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('pass');
    sessionStorage.removeItem('sair');
    sessionStorage.removeItem('sessao');
    window.location.href = `../login/login.html`

}

function mountPage() {
    document.getElementById('usuarioAtivo').innerHTML = sessionStorage.getItem('user');
    document.getElementById('logoff').innerHTML = sessionStorage.getItem('sair');


    axios.get("http://localhost:3000/list/veiculo/reservasealugadas/r/a")
        .then(function (veiculos) {
            for (let i = 0; i < veiculos.data.length; i++) {
                console.log(veiculos.data[i])
                document.getElementById('tabela').innerHTML +=
                    `
                <tr>
                    <th scope="row" type="button" data-toggle="modal" data-target="#myModal"  id="${veiculos.data[i].id_cliente}" onclick="openModal(id)">${veiculos.data[i].id}</th>
                    <td>${veiculos.data[i].modelo}</td>
                    <td>${veiculos.data[i].placa}</td>
                    <td>${veiculos.data[i].data_inicial}</td>
                    <td>${veiculos.data[i].data_final}</td>
                    <td>${veiculos.data[i].status}</td>
                    <td>
                        <button type="button" class="btn btn-success" onclick = disponivel(${veiculos.data[i].id},${veiculos.data[i].aluguelId})>Disponivel</button>
                        <button type="button" class="btn btn-danger" onclick = alugada(${veiculos.data[i].id},${veiculos.data[i].aluguelId})>Alugada</button>
                    </td>                
                </tr>                  
                `
            }
        })
        .catch(function (erro) {
            console.log(erro);
        })
}

function disponivel(id, aluguelId) {
    axios.post(`http://localhost:3000/update/veiculo/${id}`, {
            status: "d"
        })
        .then(res => {
            axios.post(`http://localhost:3000/update/statusaluguel/${aluguelId}`, {
                    status: "d"
                })
                .then(res => {
                    window.location.href = `../administrador/administrador.html`
                })
        })
}

function alugada(id, aluguelId) {
    axios.post(`http://localhost:3000/update/veiculo/${id}`, {
            status: "a"
        })
        .then(res => {
            axios.post(`http://localhost:3000/update/statusaluguel/${aluguelId}`, {
                    status: "a"
                })
                .then(res => {
                    window.location.href = `../administrador/administrador.html`
                })
        })
}

//===========================================
//============== Monta o MODAL ==============
//===========================================
function openModal(id) {
    axios.get(`http://localhost:3000/list/clientes/${id}`)
        .then(cliente => {
            document.getElementById("modal").innerHTML =
                `<div class="modal-header">
                <h4 class="modal-title">${cliente.data.nome}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">                
                <div class = textmodal>
                    <table class = "table table-striped">
                    <tr>
                        <th>CNH</th>
                        <td>${cliente.data.cnh}</th>
                    </tr>
                    <tr>
                        <th>Endereço</td>
                        <td>${cliente.data.endereco}</td>
                    </tr>
                    <tr>
                        <th>Telefone</td>
                        <td>${cliente.data.telefone}</td>
                    </tr>
                </table>
                </div>
            </div>`
        })
}