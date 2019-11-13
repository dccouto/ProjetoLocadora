document.getElementById('btnConfirm').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e){
	
	var dataInicial = document.getElementById('dataInicial').value;
	var dataFinal = document.getElementById('dataFinal').value;
	var horaEntrada = new Date();

	if(!dataInicial && !dataFinal){
		
		alert("Preencha todos os campos!");
		return false;
	} 

	var prazo = {
		dateInit: dataInicial,
		dateEnd: dataFinal,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes()
	};

	if(localStorage.getItem('reserva') === null){
		var prazos = [];
		prazos.push(prazo);
		localStorage.setItem('reserva', JSON.stringify(prazos));
	} else {
		var prazos = JSON.parse(localStorage.getItem('reserva'));
		prazos.push(prazo);
		localStorage.setItem('reserva', JSON.stringify(prazos));
	}

	document.getElementById('btnConfirm').reset();

	dadosRes();

	e.preventDefault();
}

function removeVeiculo(dateEnd){
	var reserva = JSON.parse(localStorage.getItem('reserva'));
	console.log(reserva);

	 for(var i = 0 ; i < reserva.length; i++){
		if(reserva[i].dateEnd == dateEnd){
			reserva.splice(i, 1);
		}
	}

	localStorage.setItem('reserva', JSON.stringify(reserva));

	dadosRes();
}

function dadosRes(){ //dadosReserva
	var prazos = JSON.parse(localStorage.getItem('reserva'));
	var dadosResult = document.getElementById('resultados');

	dadosResult.innerHTML = '';

	for(var i = 0; i < prazos.length; i++){
		var dateInit = prazos[i].dateInit;
		var dateEnd = prazos[i].dateEnd;
		var hora = prazos[i].hora;
		var minutos = prazos[i].minutos;
		 dadosResult.innerHTML += '<tr><td>'+ dateInit + '</td>'+
		 							 	  '<td>'+ dateEnd + '</td>' +
		 							 	  '<td>'+ hora + ':' + minutos + '</td>' +
		 							 	  '<td><button onclick="removeVeiculo(\''+ dateEnd +'\')" class="btn btn-danger">Remover</button></td>'+
		 							 '</tr>';
	}
}