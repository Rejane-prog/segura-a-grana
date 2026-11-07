// Usa banco em memória: os testes nunca mexem no banco real
process.env.DB_PATH = ':memory:';

const app = require('../src/app');
const db = require('../src/database');

function iniciarServidor() {
  return new Promise((resolve) => {
    const servidor = app.listen(0, () => {
      const url = `http://127.0.0.1:${servidor.address().port}/api/movimentacoes`;
      resolve({ url, fechar: () => new Promise((r) => servidor.close(r)) });
    });
  });
}

function limparBanco() {
  db.exec('DELETE FROM movimentacoes');
}

async function requisicao(url, metodo = 'GET', corpo) {
  const resp = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const texto = await resp.text();
  return { status: resp.status, body: texto ? JSON.parse(texto) : null };
}

const receita = (extra = {}) => ({ descricao: 'Salário', valor: 2000, tipo: 'receita', data: '2026-11-01', categoria: 'Salário', ...extra });
const despesa = (extra = {}) => ({ descricao: 'Mercado', valor: 500, tipo: 'despesa', data: '2026-11-02', categoria: 'Alimentação', ...extra });

module.exports = { iniciarServidor, limparBanco, requisicao, receita, despesa, db };
