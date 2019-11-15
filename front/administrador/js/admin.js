function initPage() {

    axios.get("http://localhost:3000/list/veiculo/reservasealugadas/r/a")
    .then(function (veiculos) {
        for (let i = 0; i < veiculos.data.length; i++) {
            console.log(veiculos.data[i])
            document.getElementById('tabela').innerHTML +=
                `
                  <tr>
                    <th scope="row">${veiculos.data[i].id}</th>
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
  .then(res =>{
    axios.post(`http://localhost:3000/update/statusaluguel/${aluguelId}`,{
      status: "d"
    })
    .then(res =>{
      window.location.href = `../administrador/administrador.html`
    })
  })
}

function alugada(id, aluguelId) {
  axios.post(`http://localhost:3000/update/veiculo/${id}`, {
    status: "a"
  })
  .then(res =>{
    axios.post(`http://localhost:3000/update/statusaluguel/${aluguelId}`,{
      status: "a"
    })
    .then(res =>{
      window.location.href = `../administrador/administrador.html`
    })
  })
}