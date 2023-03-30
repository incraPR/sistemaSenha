import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id)
  socket.on("alterarSenhaProtocolo", (novaSenha, senhaAnterior) => {
    socket.broadcast.emit("alteraSenhaClienteProtocolo", novaSenha, senhaAnterior)
})
});

