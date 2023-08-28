//Importa as dependências que acabamos de instalar
const express = require("express");
const path = require("path");

const app = express();

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static("./dist/pgw-linhas-frontend"));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/pgw-linhas-frontend/'}),
);

// Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 3000);
