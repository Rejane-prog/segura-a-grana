const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { iniciarServidor, limparBanco, requisicao, despesa } = require('./helpers');

let api;
before(async () => { api = await iniciarServidor(); });
after(async () => { await api.fechar(); });
beforeEach(() => limparBanco());

describe('RNF03 - Validação dos dados', () => {
  const casos = [
    ['valor zero', { valor: 0 }, 'valor', 'Informe um valor maior que zero'],
    ['valor negativo', { valor: -5 }, 'valor', 'Informe um valor maior que zero'],
    ['valor que não é número', { valor: 'abc' }, 'valor', 'Informe um valor maior que zero'],
    ['descrição vazia', { descricao: '' }, 'descricao', 'Preencha todos os campos obrigatórios'],
    ['descrição só com espaços', { descricao: '   ' }, 'descricao', 'Preencha todos os campos obrigatórios'],
    ['tipo inválido', { tipo: 'investimento' }, 'tipo', 'Tipo inválido. Use receita ou despesa'],
    ['data em formato errado', { data: '07/11/2026' }, 'data', 'Informe uma data válida no formato AAAA-MM-DD'],
    ['data que não existe', { data: '2026-02-30' }, 'data', 'Informe uma data válida no formato AAAA-MM-DD'],
    ['descrição com mais de 100 caracteres', { descricao: 'a'.repeat(101) }, 'descricao', 'A descrição deve ter no máximo 100 caracteres'],
  ];

  for (const [nome, extra, campo, mensagem] of casos) {
    test(`rejeita ${nome} com 400 e mensagem clara`, async () => {
      const r = await requisicao(api.url, 'POST', despesa(extra));
      assert.equal(r.status, 400);
      assert.equal(r.body.erro, mensagem);
      assert.ok(r.body.campos.includes(campo));
    });
  }

  test('lista todos os campos obrigatórios ausentes', async () => {
    const r = await requisicao(api.url, 'POST', {});
    assert.equal(r.status, 400);
    assert.deepEqual(r.body.campos, ['descricao', 'valor', 'tipo', 'data']);
  });

  test('nada é salvo quando a validação falha', async () => {
    await requisicao(api.url, 'POST', despesa({ valor: 0 }));
    const r = await requisicao(api.url);
    assert.equal(r.body.length, 0);
  });
});
