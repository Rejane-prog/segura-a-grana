const db = require('../database');

const TIPOS = ['receita', 'despesa'];
const CATEGORIAS = ['Salário', 'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];

function definirCategoria(categoria) {
  return CATEGORIAS.includes(categoria) ? categoria : 'Outros';
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM movimentacoes WHERE id = ?').get(id);
}

function criar(req, res) {
  const { descricao, valor, tipo, data } = req.body;
  const categoria = definirCategoria(req.body.categoria);
  const resultado = db
    .prepare('INSERT INTO movimentacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)')
    .run(String(descricao).trim(), Number(valor), tipo, categoria, data);

  res.status(201).json(buscarPorId(resultado.lastInsertRowid));
}

function listar(req, res) {
  const { tipo } = req.query;
  const lista = TIPOS.includes(tipo)
    ? db.prepare('SELECT * FROM movimentacoes WHERE tipo = ? ORDER BY data DESC, id DESC').all(tipo)
    : db.prepare('SELECT * FROM movimentacoes ORDER BY data DESC, id DESC').all();
  res.json(lista);
}

function atualizar(req, res) {
  if (!buscarPorId(req.params.id)) {
    return res.status(404).json({ erro: 'Movimentação não encontrada' });
  }

  const { descricao, valor, tipo, data } = req.body;
  const categoria = definirCategoria(req.body.categoria);
  db.prepare('UPDATE movimentacoes SET descricao = ?, valor = ?, tipo = ?, categoria = ?, data = ? WHERE id = ?')
    .run(String(descricao).trim(), Number(valor), tipo, categoria, data, req.params.id);

  res.json(buscarPorId(req.params.id));
}

function excluir(req, res) {
  const resultado = db.prepare('DELETE FROM movimentacoes WHERE id = ?').run(req.params.id);
  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Movimentação não encontrada' });
  }
  res.status(204).end();
}

function saldo(req, res) {
  const totais = db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END), 0) AS receitas,
      COALESCE(SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END), 0) AS despesas
    FROM movimentacoes
  `).get();
  res.json({ receitas: totais.receitas, despesas: totais.despesas, saldo: totais.receitas - totais.despesas });
}

module.exports = { criar, listar, atualizar, excluir, saldo };
