const socket = io();

const senhaAtual = document.querySelector("#senhaAtual");
const senhaAnterior = document.querySelector("#senhaAnterior");
const somChamada = document.querySelector("#audioChamada");



var valorSenhaProtocolo = 0;
var valorNovaSenhaProtocolo = 0;
var valorAnteriorProtocolo = "";
var novaSenhaStringProtocolo = "";
var senhaAnteriorStringProtocolo = "";

var valorSenhaCidadania = 0;
var valorNovaSenhaCidadania = 0;

var valorAnteriorCidadania = "";
var novaSenhaStringCidadania = "";
var senhaAnteriorStringCidadania = "";

localStorage.setItem("senhaProtocolo", valorSenhaProtocolo)
localStorage.setItem("senhaCidadania", valorSenhaCidadania)

document.addEventListener("keydown", (event) => {
  
  if (event.key === "p" || event.key === "P") {

    valorAnteriorProtocolo = localStorage.getItem("senhaProtocolo");
    valorNovaSenhaProtocolo = parseInt(valorAnteriorProtocolo) + 1;
    localStorage.setItem("senhaProtocolo", valorNovaSenhaProtocolo)
    trocarSenha(event.key.toUpperCase(), valorNovaSenhaProtocolo, valorAnteriorProtocolo)
    
  } else if (event.key === "c" || event.key === "C"){
    valorAnteriorCidadania = localStorage.getItem("senhaCidadania");
    valorNovaSenhaCidadania = parseInt(valorAnteriorCidadania) + 1;
    localStorage.setItem("senhaCidadania", valorNovaSenhaCidadania);
    trocarSenha(event.key.toUpperCase(), valorNovaSenhaCidadania, valorAnteriorCidadania);
  }
});

  socket.on("alteraSenhaCliente", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnterior.innerHTML = Anterior;
})

function trocarSenha(tipoAtendimento, senhaNova, ultimaSenha){
    var novaSenhaString = " ";
    var senhaAnteriorString = "";
    var novaSenha = 0;
    var novaSenha = senhaNova;
    var anteriorSenha = ultimaSenha;
    

    somChamada.play();

    if (novaSenha < 10) {
      novaSenhaString = `${tipoAtendimento}00${novaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `${tipoAtendimento}00${anteriorSenha}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", novaSenhaString, senhaAnteriorString);
    } else if (novaSenha < 100) {
      novaSenhaString = `${tipoAtendimento}0${valorNovaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `${tipoAtendimento}0${anteriorSenha}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", novaSenhaString, senhaAnteriorString);
    } else {
      novaSenhaString = `${tipoAtendimento}${valorNovaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `${tipoAtendimento}${novaSenha}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", senhaAtual.innerHTML);
    }
  }


  const btnProtocolo = document.querySelector("#botao-protocolo")
  btnProtocolo.addEventListener("click", ()=> {
    alterarSenhaBotao('Protocolo')
  })

  const btnCidadania = document.querySelector("#botao-cidadania")
  btnCidadania.addEventListener("click", ()=> {
    alterarSenhaBotao('Cidadania')
  })

  function alterarSenhaBotao(tipoAtendimento){
    
    if (tipoAtendimento === "Protocolo"){
    valorAnteriorProtocolo = localStorage.getItem("senhaProtocolo");
    valorNovaSenhaProtocolo = parseInt(valorAnteriorProtocolo) + 1;
    localStorage.setItem("senhaProtocolo", valorNovaSenhaProtocolo)
    trocarSenha("P", valorNovaSenhaProtocolo, valorAnteriorProtocolo)
  } else if (tipoAtendimento === "Cidadania"){
    valorAnteriorCidadania = localStorage.getItem("senhaCidadania");
    valorNovaSenhaCidadania = parseInt(valorAnteriorCidadania) + 1;
    localStorage.setItem("senhaCidadania", valorNovaSenhaCidadania);
    trocarSenha("C", valorNovaSenhaCidadania, valorAnteriorCidadania);
  }
    socket.on("alteraSenhaCliente", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnterior.innerHTML = Anterior;
})
  }