// RNF03: valida os dados antes de salvar e responde sempre no mesmo formato:
// { erro: 'mensagem', campos: ['campo1', ...] }
const TIPOS = ['receita', 'despesa'];

function dataValida(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const [ano, mes, dia] = texto.split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return data.getUTCFullYear() === ano && data.getUTCMonth() === mes - 1 && data.getUTCDate() === dia;
}

function validarMovimentacao(req, res, next) {
  const { descricao, valor, tipo, data } = req.body || {};

  const vazios = [];
  if (descricao === undefined || descricao === null || !String(descricao).trim()) vazios.push('descricao');
  if (valor === undefined || valor === null || valor === '') vazios.push('valor');
  if (!tipo) vazios.push('tipo');
  if (!data) vazios.push('data');
  if (vazios.length) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios', campos: vazios });
  }

  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero <= 0) {
    return res.status(400).json({ erro: 'Informe um valor maior que zero', campos: ['valor'] });
  }
  if (!TIPOS.includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo inválido. Use receita ou despesa', campos: ['tipo'] });
  }
  if (!dataValida(String(data))) {
    return res.status(400).json({ erro: 'Informe uma data válida no formato AAAA-MM-DD', campos: ['data'] });
  }
  if (String(descricao).trim().length > 100) {
    return res.status(400).json({ erro: 'A descrição deve ter no máximo 100 caracteres', campos: ['descricao'] });
  }

  next();
}

module.exports = validarMovimentacao;
