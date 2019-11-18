function initPage() {
    axios.post('http://localhost:3000/session',{
        session: `${sessionStorage.getItem('sessao')}`
    })
    .then(res =>{
        if(res.data){            
            window.location.href = `../administrador/administrador.html`            
        }

    })
    
}

function logar() {
    axios.post('http://localhost:3000/login', {
            username: `${document.getElementById('login').value}`,
            pass: `${document.getElementById('inputPassword').value}`
        })
        .then(res => {
            if(res.data){
                axios.get(`http://localhost:3000/list/clientes/${res.data.id_cliente}`)
                .then(cliente => {
                    sessionStorage.setItem('user', cliente.data.nome)
                    sessionStorage.setItem('pass', res.data.password)
                    sessionStorage.setItem('sair', '(sair)')
                    
                    axios.post('http://localhost:3000/session/generate',{
                        id_cliente: res.data.id_cliente
                    })
                    .then(retorno =>{
                        sessionStorage.setItem('sessao',retorno.data)
                        window.location.href = `../administrador/administrador.html`            

                    })

                })
            }
            else
                console.log('erro')
        })
        .catch(erro => {
            console.log(erro);
        })

}

