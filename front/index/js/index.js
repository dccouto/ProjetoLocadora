var veiculos;




//===========================================
// Inicia a pagina incluindo os cards
//===========================================
function initPage() {
    sessionStorage.setItem('dados', 'Diego Couto')
    var myObject = new Vue({
        el: '#login',
        data: {message: sessionStorage.getItem('dados')}
      })
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            veiculos = JSON.parse(this.responseText);
            // ===========Monta o card============== 
            for (let i = 0; i < veiculos.length; i++) {
                document.getElementById('card').innerHTML +=
                    `<div id="card${veiculos[i].id}" class="col-sm">
                        <div  class="card-moto" style="width: 18rem;">
                            <div>
                                <header class = "card-header">
                                    <p class="card-text">${veiculos[i].modelo}</p>
                                </header>
                            </div>
                            <img class="img" src="${veiculos[i].link}">                            
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary" onclick= abrirReserva(${veiculos[i].id})>
                                    Reserve já!
                                </button>
                                <button type="button" id="${veiculos[i].id}" class="btn btn-secondary" data-toggle="modal" data-target="#myModal" onclick="openModal(id)" >
                                    Mais detalhes
                                </button>
                            </div>
                        </div>
                    </div>`
            }
        }
    };

    xhttp.open("GET", "http://localhost:3000/list/veiculo/disponivel/d", true);

    xhttp.send();
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

function abrirReserva(IdVehicle){
    window.location.href = `../reserva/reserva.html?id=${IdVehicle}`
}

// module.exports = veiculos;