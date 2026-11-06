const db = require('../database');

const TIPOS = ['receita'];

function validar(dados) {
  const { descricao, valor, tipo, data } = dados;
  if (!descricao || !String(descricao).trim() || valor === undefined || valor === '' || !tipo || !data) {
    return 'Preencha todos os campos obrigatórios';
  }
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero <= 0) {
    return 'Informe um valor maior que zero';
  }
  if (!TIPOS.includes(tipo)) {
    return 'Tipo inválido';
  }
  return null;
}

function criar(req, res) {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  const { descricao, valor, tipo, data } = req.body;
  const categoria = 'Outros';
  const resultado = db
    .prepare('INSERT INTO movimentacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)')
    .run(String(descricao).trim(), Number(valor), tipo, categoria, data);

  const movimentacao = db.prepare('SELECT * FROM movimentacoes WHERE id = ?').get(resultado.lastInsertRowid);
  res.status(201).json(movimentacao);
}
  const lista = db.prepare('SELECT * FROM movimentacoes ORDER BY data DESC, id DESC').all();
  const categoria = existente.categoria;

module.exports = {
  criar,
};
