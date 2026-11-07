const { DatabaseSync } = require('node:sqlite');
const path = require('path');

// DB_PATH permite usar outro arquivo (ou ':memory:' nos testes)
const caminho = process.env.DB_PATH || path.join(__dirname, '..', 'segura-a-grana.db');
const db = new DatabaseSync(caminho);

db.exec(`
  CREATE TABLE IF NOT EXISTS movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    valor REAL NOT NULL CHECK (valor > 0),
    tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    categoria TEXT NOT NULL DEFAULT 'Outros',
    data TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  )
`);

module.exports = db;
