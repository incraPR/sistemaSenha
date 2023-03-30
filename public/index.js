const socket = io();

const senhaAtual = document.querySelector("#senhaAtual");
const senhaAnteriorProtocolo = document.querySelector('#senhaAnteriorProtocolo');
const senhaAnteriorCidadania = document.querySelector('#senhaAnteriorCidadania');
const somChamada = document.querySelector("#audioChamada");

var valorSenhaAnteriorProtocolo = 0;
var valorSenhaAnteriorCidadania = 0;



document.addEventListener("keydown", (event) => {
  
  if (event.key === "p" || event.key === "P") {
    
    valorSenhaAnteriorProtocolo = parseInt(senhaAnteriorProtocolo.innerHTML.slice(1))
    
    
    trocarSenha(event.key.toUpperCase(), valorSenhaAnteriorProtocolo)
    
  } else if (event.key === "c" || event.key === "C"){
  
    valorSenhaAnteriorCidadania = parseInt(senhaAnteriorCidadania.innerHTML.slice(1))
    valorSenha = valorSenhaAnteriorCidadania + 1
    
    trocarSenha(event.key.toUpperCase(), valorSenha, valorSenhaAnteriorCidadania)
  }
});

  socket.on("alteraSenhaClienteProtocolo", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnterior.innerHTML = Anterior;
    somChamada.play();
})

function trocarSenha(tipoAtendimento, ultimaSenha){
    var senhaNova = ultimaSenha + 1;
    console.log(senhaNova)
    var nomeEmit = "";

    if (tipoAtendimento === "P"){
      nomeEmit = "alteraSenhaClienteProtocolo"
      
      
    } else if (tipoAtendimento === "C"){

      nomeEmit = "alteraSenhaClienteCidadania"
      
    }

    somChamada.play();

    if (senhaNova < 10) {

      senhaAtual.innerHTML = `${tipoAtendimento}00${senhaNova}`;
      if (tipoAtendimento === "P"){
        nomeEmit = "alteraSenhaClienteProtocolo"
        senhaAnteriorProtocolo.innerHTML = `${tipoAtendimento}00${ultimaSenha}`;
        
      } else if (tipoAtendimento === "C"){
        senhaAnteriorCidadania.innerHTML = `${tipoAtendimento}00${ultimaSenha}`;
        nomeEmit = "alteraSenhaClienteCidadania"
        
      }
    
      socket.emit(nomeEmit, senhaAtual.innerHTML, senhaAnteriorProtocolo.innerHTML);

    } else if (senhaNova < 100) {

      senhaAtual.innerHTML = `${tipoAtendimento}0${senhaNova}`;

      if (tipoAtendimento === "P"){
        nomeEmit = "alteraSenhaClienteProtocolo"
        senhaAnteriorProtocolo.innerHTML = `${tipoAtendimento}0${ultimaSenha}`;
        
        console.log(nomeEmit)
      } else if (tipoAtendimento === "C"){
        senhaAnteriorCidadania.innerHTML = `${tipoAtendimento}0${ultimaSenha}`;
        nomeEmit = "alteraSenhaClienteCidadania"
        
      }
    
      socket.emit(nomeEmit, senhaAtual.innerHTML, senhaAnteriorProtocolo.innerHTML);
    } else {
      senhaAtual.innerHTML = `${tipoAtendimento}${senhaNova}`;
      if (tipoAtendimento === "P"){
        nomeEmit = "alteraSenhaClienteProtocolo"
        senhaAnteriorProtocolo.innerHTML = `${tipoAtendimento}${ultimaSenha}`;
        
        console.log(nomeEmit)
      } else if (tipoAtendimento === "C"){
        senhaAnteriorCidadania.innerHTML = `${tipoAtendimento}${ultimaSenha}`;
        nomeEmit = "alteraSenhaClienteCidadania"
        
      }
    
      socket.emit(nomeEmit, senhaAtual.innerHTML, senhaAnteriorProtocolo.innerHTML);
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