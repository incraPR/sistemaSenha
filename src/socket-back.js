import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou! ID:", socket.id)
  socket.on("alterarSenha", (novaSenha, senhaAnterior) => {
    socket.broadcast.emit("alteraSenhaCliente", novaSenha, senhaAnterior)
})
});

