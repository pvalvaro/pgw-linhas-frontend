//Importa as dependências que acabamos de instalar
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4200;

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/pgw-linhas-frontend'));

app.get("/*", (req, res) =>
  res.sendFile(__dirname + 'dist/pgw-linhas-frontend/index.html')
);

// Inicia a aplicação pela porta configurada
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta: " + PORT);
});
