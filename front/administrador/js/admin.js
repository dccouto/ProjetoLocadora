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
                    <button type="button" class="btn btn-success">Disp</button>
                    <button type="button" class="btn btn-warning">Res</button>
                    <button type="button" class="btn btn-danger">Alu</button>
                    </td>

                
                  </tr>
                  
                `
    }
    })
    .catch(function (erro) {
        console.log(erro);        
    })
}