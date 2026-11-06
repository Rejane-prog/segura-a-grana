const db = require('../database');

const TIPOS = ['receita', 'despesa'];
const CATEGORIAS = ['Salário', 'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'];

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

function definirCategoria(categoria) {
  return CATEGORIAS.includes(categoria) ? categoria : 'Outros';
}

function criar(req, res) {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  const { descricao, valor, tipo, data } = req.body;
  const categoria = definirCategoria(req.body.categoria);
  const resultado = db
    .prepare('INSERT INTO movimentacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)')
    .run(String(descricao).trim(), Number(valor), tipo, categoria, data);

  const movimentacao = db.prepare('SELECT * FROM movimentacoes WHERE id = ?').get(resultado.lastInsertRowid);
  res.status(201).json(movimentacao);
}

function listar(req, res) {
  const { tipo } = req.query;
  const lista = TIPOS.includes(tipo)
    ? db.prepare('SELECT * FROM movimentacoes WHERE tipo = ? ORDER BY data DESC, id DESC').all(tipo)
    : db.prepare('SELECT * FROM movimentacoes ORDER BY data DESC, id DESC').all();
  res.json(lista);
}

function atualizar(req, res) {
  const existente = db.prepare('SELECT * FROM movimentacoes WHERE id = ?').get(req.params.id);
  if (!existente) return res.status(404).json({ erro: 'Movimentação não encontrada' });

  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  const { descricao, valor, tipo, data } = req.body;
  const categoria = definirCategoria(req.body.categoria);
  db.prepare('UPDATE movimentacoes SET descricao = ?, valor = ?, tipo = ?, categoria = ?, data = ? WHERE id = ?')
    .run(String(descricao).trim(), Number(valor), tipo, categoria, data, req.params.id);

  res.json(db.prepare('SELECT * FROM movimentacoes WHERE id = ?').get(req.params.id));
}

function excluir(req, res) {
  const resultado = db.prepare('DELETE FROM movimentacoes WHERE id = ?').run(req.params.id);
  if (resultado.changes === 0) return res.status(404).json({ erro: 'Movimentação não encontrada' });
  res.status(204).end();
}

function saldo(req, res) {
  const totais = db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END), 0) AS receitas,
      COALESCE(SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END), 0) AS despesas
    FROM movimentacoes
  `).get();
  res.json({ ...totais, saldo: totais.receitas - totais.despesas });
}

module.exports = {
  criar,
  listar,
  atualizar,
  excluir,
  saldo,
module.exports = {
  criar,
  listar,
};
