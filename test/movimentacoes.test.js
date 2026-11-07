const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { iniciarServidor, limparBanco, requisicao, receita, despesa } = require('./helpers');

let api;
before(async () => { api = await iniciarServidor(); });
after(async () => { await api.fechar(); });
beforeEach(() => limparBanco());

describe('RF01 - Cadastrar receita (US01 / UC01)', () => {
  test('cadastra uma receita válida e retorna 201', async () => {
    const r = await requisicao(api.url, 'POST', receita());
    assert.equal(r.status, 201);
    assert.equal(r.body.tipo, 'receita');
    assert.equal(r.body.valor, 2000);
    assert.ok(r.body.id);
  });

  test('remove espaços extras da descrição', async () => {
    const r = await requisicao(api.url, 'POST', receita({ descricao: '  Freela  ' }));
    assert.equal(r.body.descricao, 'Freela');
  });
});

describe('RF02 - Cadastrar despesa (US02 / UC02)', () => {
  test('cadastra uma despesa válida e retorna 201', async () => {
    const r = await requisicao(api.url, 'POST', despesa());
    assert.equal(r.status, 201);
    assert.equal(r.body.tipo, 'despesa');
  });

  test('aceita valor enviado como texto numérico', async () => {
    const r = await requisicao(api.url, 'POST', despesa({ valor: '45.90' }));
    assert.equal(r.status, 201);
    assert.equal(r.body.valor, 45.9);
  });
});

describe('RF03 - Consultar movimentações (US03 / UC03)', () => {
  test('retorna lista vazia quando não há movimentações', async () => {
    const r = await requisicao(api.url);
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, []);
  });

  test('lista da mais recente para a mais antiga', async () => {
    await requisicao(api.url, 'POST', receita({ data: '2026-10-01' }));
    await requisicao(api.url, 'POST', despesa({ data: '2026-11-05' }));
    const r = await requisicao(api.url);
    assert.equal(r.body.length, 2);
    assert.equal(r.body[0].data, '2026-11-05');
  });
});

describe('RF04 - Editar movimentação (US04 / UC04)', () => {
  test('edita uma movimentação existente', async () => {
    const criada = await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}/${criada.body.id}`, 'PUT', despesa({ valor: 150 }));
    assert.equal(r.status, 200);
    assert.equal(r.body.valor, 150);
  });

  test('retorna 404 ao editar movimentação inexistente', async () => {
    const r = await requisicao(`${api.url}/9999`, 'PUT', despesa());
    assert.equal(r.status, 404);
    assert.equal(r.body.erro, 'Movimentação não encontrada');
  });

  test('não edita com dados inválidos', async () => {
    const criada = await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}/${criada.body.id}`, 'PUT', despesa({ valor: -10 }));
    assert.equal(r.status, 400);
    const lista = await requisicao(api.url);
    assert.equal(lista.body[0].valor, 500);
  });
});

describe('RF05 - Excluir movimentação (US05 / UC05)', () => {
  test('exclui uma movimentação e retorna 204', async () => {
    const criada = await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}/${criada.body.id}`, 'DELETE');
    assert.equal(r.status, 204);
    const lista = await requisicao(api.url);
    assert.equal(lista.body.length, 0);
  });

  test('retorna 404 ao excluir movimentação inexistente', async () => {
    const r = await requisicao(`${api.url}/9999`, 'DELETE');
    assert.equal(r.status, 404);
  });
});

describe('RF06 - Categorias (US06)', () => {
  test('salva a categoria escolhida', async () => {
    const r = await requisicao(api.url, 'POST', despesa({ categoria: 'Transporte' }));
    assert.equal(r.body.categoria, 'Transporte');
  });

  test('usa "Outros" quando a categoria não é informada', async () => {
    const r = await requisicao(api.url, 'POST', despesa({ categoria: undefined }));
    assert.equal(r.body.categoria, 'Outros');
  });

  test('usa "Outros" quando a categoria não existe', async () => {
    const r = await requisicao(api.url, 'POST', despesa({ categoria: 'Inventada' }));
    assert.equal(r.body.categoria, 'Outros');
  });
});

describe('RF07 - Saldo (US07 / UC06)', () => {
  test('saldo é zero sem movimentações', async () => {
    const r = await requisicao(`${api.url}/saldo`);
    assert.deepEqual(r.body, { receitas: 0, despesas: 0, saldo: 0 });
  });

  test('calcula receitas - despesas', async () => {
    await requisicao(api.url, 'POST', receita({ valor: 2000 }));
    await requisicao(api.url, 'POST', despesa({ valor: 500 }));
    const r = await requisicao(`${api.url}/saldo`);
    assert.equal(r.body.saldo, 1500);
  });

  test('saldo pode ficar negativo', async () => {
    await requisicao(api.url, 'POST', receita({ valor: 100 }));
    await requisicao(api.url, 'POST', despesa({ valor: 300 }));
    const r = await requisicao(`${api.url}/saldo`);
    assert.equal(r.body.saldo, -200);
  });

  test('saldo é recalculado após excluir', async () => {
    await requisicao(api.url, 'POST', receita({ valor: 1000 }));
    const d = await requisicao(api.url, 'POST', despesa({ valor: 400 }));
    await requisicao(`${api.url}/${d.body.id}`, 'DELETE');
    const r = await requisicao(`${api.url}/saldo`);
    assert.equal(r.body.saldo, 1000);
  });
});

describe('RF08 - Filtro por tipo (US08 / UC07)', () => {
  test('filtra apenas despesas', async () => {
    await requisicao(api.url, 'POST', receita());
    await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}?tipo=despesa`);
    assert.equal(r.body.length, 1);
    assert.equal(r.body[0].tipo, 'despesa');
  });

  test('filtra apenas receitas', async () => {
    await requisicao(api.url, 'POST', receita());
    await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}?tipo=receita`);
    assert.equal(r.body.length, 1);
    assert.equal(r.body[0].tipo, 'receita');
  });

  test('tipo desconhecido retorna todas', async () => {
    await requisicao(api.url, 'POST', receita());
    await requisicao(api.url, 'POST', despesa());
    const r = await requisicao(`${api.url}?tipo=qualquer`);
    assert.equal(r.body.length, 2);
  });
});
