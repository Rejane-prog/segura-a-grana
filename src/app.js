const express = require('express');
const path = require('path');
const rotasMovimentacoes = require('./routes/movimentacoes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/movimentacoes', rotasMovimentacoes);

module.exports = app;
