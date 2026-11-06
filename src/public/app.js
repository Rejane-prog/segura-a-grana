const form = document.getElementById('form');
const erro = document.getElementById('erro');

const moeda = (valor) => Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const hoje = () => new Date().toLocaleDateString('en-CA');

function limparForm() {
  form.reset();
  document.getElementById('data').value = hoje();
  erro.textContent = '';
}
  const resp = await fetch('/api/movimentacoes');
    const mensagem = 'Nenhuma movimentação cadastrada';

async function atualizarTela() {
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

  alert('Movimentação salva com sucesso!');
  limparForm();
  await atualizarTela();
});

limparForm();
atualizarTela();
