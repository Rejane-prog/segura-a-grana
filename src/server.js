const express = require('express');
const path = require('path');
require('./database');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORTA, () => {
  console.log(`Segura a Grana rodando em http://localhost:${PORTA}`);
});
