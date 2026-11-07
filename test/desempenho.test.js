const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciarServidor, limparBanco, requisicao, db } = require('./helpers');

const TOTAL = 5000;
const LIMITE_MS = 1000;
let api;

before(async () => {
  api = await iniciarServidor();
  limparBanco();
  const inserir = db.prepare('INSERT INTO movimentacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)');
  db.exec('BEGIN');
  for (let i = 0; i < TOTAL; i++) {
    const tipo = i % 2 === 0 ? 'receita' : 'despesa';
    inserir.run(`Movimentação ${i}`, (i % 300) + 1, tipo, 'Outros', `2026-${String((i % 12) + 1).padStart(2, '0')}-10`);
  }
  db.exec('COMMIT');
});
after(async () => { await api.fechar(); });

async function medir(url) {
  const inicio = performance.now();
  const r = await requisicao(url);
  return { r, ms: performance.now() - inicio };
}

describe(`RNF04 - Desempenho com ${TOTAL} movimentações`, () => {
  test(`lista em menos de ${LIMITE_MS} ms`, async () => {
    const { r, ms } = await medir(api.url);
    assert.equal(r.body.length, TOTAL);
    assert.ok(ms < LIMITE_MS, `listagem levou ${ms.toFixed(0)} ms`);
  });

  test(`calcula o saldo em menos de ${LIMITE_MS} ms`, async () => {
    const { r, ms } = await medir(`${api.url}/saldo`);
    assert.equal(typeof r.body.saldo, 'number');
    assert.ok(ms < LIMITE_MS, `saldo levou ${ms.toFixed(0)} ms`);
  });
});
