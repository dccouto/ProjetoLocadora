function logoff(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('pass');
    sessionStorage.removeItem('sair');
    sessionStorage.removeItem('sessao');
    window.location.href = `../sobre/sobre.html`            


}

function initPage() {
    document.getElementById('usuarioAtivo').innerHTML = sessionStorage.getItem('user');
    document.getElementById('logoff').innerHTML = sessionStorage.getItem('sair');

}