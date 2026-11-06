const form = document.getElementById('form');
const erro = document.getElementById('erro');
const lista = document.getElementById('lista');
const campoId = document.getElementById('id');
const btnCancelar = document.getElementById('cancelar');
const tituloForm = document.getElementById('tituloForm');

let movimentacoes = [];

const moeda = (valor) => Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const hoje = () => new Date().toLocaleDateString('en-CA');
const dataBR = (data) => data.split('-').reverse().join('/');
const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function limparForm() {
  form.reset();
  document.getElementById('data').value = hoje();
  erro.textContent = '';
  campoId.value = '';
  tituloForm.textContent = 'Nova movimentação';
  btnCancelar.hidden = true;
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
        <button type="button" class="editar" data-id="${m.id}">Editar</button>
        <button type="button" class="excluir" data-id="${m.id}">Excluir</button>
      </div>
    </li>`).join('');
}

async function atualizarTela() {
  await carregarLista();
}

function iniciarEdicao(id) {
  const m = movimentacoes.find((item) => item.id === id);
  if (!m) return;
  campoId.value = m.id;
  document.getElementById('descricao').value = m.descricao;
  document.getElementById('valor').value = m.valor;
  document.getElementById('data').value = m.data;
  document.getElementById('tipo').value = m.tipo;
  tituloForm.textContent = 'Editar movimentação';
  btnCancelar.hidden = false;
  erro.textContent = '';
  form.scrollIntoView({ behavior: 'smooth' });
}

async function excluir(id) {
  if (!confirm('Deseja realmente excluir esta movimentação?')) return;
  const resp = await fetch(`/api/movimentacoes/${id}`, { method: 'DELETE' });
  if (!resp.ok) alert('Movimentação não encontrada');
  if (campoId.value === String(id)) limparForm();
  await atualizarTela();
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

  const id = campoId.value;
  const resp = await fetch(id ? `/api/movimentacoes/${id}` : '/api/movimentacoes', {
    method: id ? 'PUT' : 'POST',
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

btnCancelar.addEventListener('click', limparForm);

lista.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('editar')) iniciarEdicao(Number(id));
  if (e.target.classList.contains('excluir')) excluir(id);
});

limparForm();
atualizarTela();
