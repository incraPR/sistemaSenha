const socket = io();

const senhaAtual = document.querySelector("#senhaAtual");
const senhaAnterior = document.querySelector("#senhaAnterior");
const somChamada = document.querySelector("#audioChamada");

var valorSenha = 0;
var valorNovaSenha = 0;
var setorSenha = "";
var valorAnterior = "";
var novaSenhaString = "";
var senhaAnteriorString = "";

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    setorSenha = senhaAtual.innerHTML.substring(0, 1);
    valorSenha = parseInt(senhaAtual.innerHTML.substring(1));
    valorAnterior = valorSenha;
    valorNovaSenha = valorSenha + 1;
    

    somChamada.play();

    if (valorNovaSenha < 10) {
      novaSenhaString = `P00${valorNovaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `P00${valorAnterior}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", novaSenhaString, senhaAnteriorString);
    } else if (valorNovaSenha < 100) {
      novaSenhaString = `P0${valorNovaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `P0${valorAnterior}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", novaSenhaString, senhaAnteriorString);
    } else {
      novaSenhaString = `P${valorNovaSenha}`;
      senhaAtual.innerHTML = novaSenhaString;
      senhaAnteriorString = `P${valorAnterior}`
      senhaAnterior.innerHTML = senhaAnteriorString ;
      socket.emit("alterarSenha", senhaAtual.innerHTML);
    }
  }
});

  socket.on("alteraSenhaCliente", (novaSenha, Anterior) => {
    senhaAtual.innerHTML = novaSenha;
    senhaAnterior.innerHTML = Anterior;
})