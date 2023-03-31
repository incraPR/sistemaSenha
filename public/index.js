const socket = io();

const senhaAtual = document.querySelector("#senhaAtual");
const senhaAnteriorProtocolo = document.querySelector('#senhaAnteriorProtocolo');
const senhaAnteriorCidadania = document.querySelector('#senhaAnteriorCidadania');
const somChamada = document.querySelector("#audioChamada");

var valorSenhaAnteriorProtocolo = 0;
var valorSenhaAnteriorCidadania = 0;



document.addEventListener("keydown", (event) => {
  
  if (event.key === "p" || event.key === "P") {
    var verificadorSenha = senhaAtual.innerHTML.slice(0,1)
    if (verificadorSenha === "P")
      valorSenhaAnteriorProtocolo = parseInt(senhaAtual.innerHTML.slice(1))
    else {
      valorSenhaAnteriorProtocolo = parseInt(senhaAnteriorProtocolo.innerHTML.slice(1))
}
    
    trocarSenha(event.key.toUpperCase(), valorSenhaAnteriorProtocolo)
    
  } else if (event.key === "c" || event.key === "C"){
    var verificadorSenha = senhaAtual.innerHTML.slice(0,1)
    if (verificadorSenha === "C")
      valorSenhaAnteriorCidadania = parseInt(senhaAtual.innerHTML.slice(1))
      
    else {
      valorSenhaAnteriorCidadania = parseInt(senhaAnteriorCidadania.innerHTML.slice(1))
}
    console.log(valorSenhaAnteriorCidadania)
    
    trocarSenha(event.key.toUpperCase(), valorSenhaAnteriorCidadania)
  }
});

  socket.on("alteraSenhaClienteProtocolo", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnteriorProtocolo.innerHTML = Anterior;
    somChamada.play();
})
  socket.on("alteraSenhaClienteCidadania", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnteriorCidadania.innerHTML = Anterior;
    somChamada.play();
})

function trocarSenha(tipoAtendimento, ultimaSenha){
    var senhaNova = ultimaSenha + 1;
    console.log(senhaNova)
    var nomeEmit = "";


    somChamada.play();

    if (senhaNova < 10) {

      senhaAtual.innerHTML = `${tipoAtendimento}00${senhaNova}`;
      if (tipoAtendimento === "P"){
        nomeEmit = "alterarSenhaProtocolo"
        senhaAnteriorProtocolo.innerHTML = `${tipoAtendimento}00${ultimaSenha}`;
        socket.emit(nomeEmit, senhaAtual.innerHTML, senhaAnteriorProtocolo.innerHTML);
        
      } else if (tipoAtendimento === "C"){
        senhaAnteriorCidadania.innerHTML = `${tipoAtendimento}00${ultimaSenha}`;

        nomeEmit = "alterarSenhaCidadania"
        socket.emit(nomeEmit, senhaAtual.innerHTML, senhaAnteriorCidadania.innerHTML);
        
      }
    

    } else if (senhaNova < 100) {

      senhaAtual.innerHTML = `${tipoAtendimento}0${senhaNova}`;

      if (tipoAtendimento === "P"){
        nomeEmit = "alterarSenhaProtocolo"
        senhaAnteriorProtocolo.innerHTML = `${tipoAtendimento}0${ultimaSenha}`;
        
        console.log(nomeEmit)
      } else if (tipoAtendimento === "C"){
        senhaAnteriorCidadania.innerHTML = `${tipoAtendimento}0${ultimaSenha}`;
        nomeEmit = "alterarSenhaCidadania"
        
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