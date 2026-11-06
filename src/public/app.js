const form = document.getElementById('form');
const erro = document.getElementById('erro');
const lista = document.getElementById('lista');

let movimentacoes = [];

const moeda = (valor) => Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const hoje = () => new Date().toLocaleDateString('en-CA');
const dataBR = (data) => data.split('-').reverse().join('/');
const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function limparForm() {
  form.reset();
  document.getElementById('data').value = hoje();
  erro.textContent = '';
}

async function carregarLista() {
  const resp = await fetch('/api/movimentacoes');
  if (!resp.ok) {
    lista.innerHTML = '<li class="vazio">Erro ao carregar movimentações</li>';
    return;
  }
  movimentacoes = await resp.json();

  if (movimentacoes.length === 0) {
    const mensagem = 'Nenhuma movimentação cadastrada';
    lista.innerHTML = `<li class="vazio">${mensagem}</li>`;
    return;
  }

  lista.innerHTML = movimentacoes.map((m) => `
    <li class="item ${m.tipo}">
      <div>
        <strong>${esc(m.descricao)}</strong>
        <small>${dataBR(m.data)} · ${esc(m.categoria)}</small>
      </div>
      <div class="acoes">
        <span class="valor">${m.tipo === 'despesa' ? '-' : '+'} ${moeda(m.valor)}</span>
      </div>
    </li>`).join('');
}

async function atualizarTela() {
  await carregarLista();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  erro.textContent = '';

  const dados = {
    descricao: document.getElementById('descricao').value,
    valor: document.getElementById('valor').value,
    data: document.getElementById('data').value,
    tipo: document.getElementById('tipo').value,
  };

  const resp = await fetch('/api/movimentacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const resposta = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    erro.textContent = resposta.erro || 'Erro ao salvar movimentação';
    return;
  }

  limparForm();
  await atualizarTela();
});

limparForm();
atualizarTela();
