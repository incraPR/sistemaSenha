import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import os from "os";

const networkingInfo = os.networkInterfaces();
const hostname = networkingInfo.en0[3].address

console.log(hostname)

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);

const diretorioPublico = path.join(caminhoAtual, "../..", "public")

app.use(express.static(diretorioPublico));

app.get("/", (req, res) => {
  console.log(req.ip)
  res.sendFile(`${diretorioPublico}/index.html`)
})

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, hostname, () => 
  console.log(`Servidor escutando na porta ${porta}`))

const io = new Server(servidorHttp);


export default io;