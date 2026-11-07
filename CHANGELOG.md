# Changelog

Todas as mudanças relevantes do projeto são registradas aqui.
Formato baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [1.1.0] - 2026-11-07

### Adicionado
- Testes automatizados para RF01–RF08 com `node:test` e banco em memória.
- Testes de validação (RNF03) e de desempenho com 5 000 movimentações (RNF04).
- Middleware de validação com formato de erro padronizado (`erro` + `campos`).
- Validação de data (formato AAAA-MM-DD e data existente) e limite de 100 caracteres na descrição.
- Pipeline de CI (GitHub Actions) com Node 22 e 24.
- Varredura de segredos (gitleaks) e auditoria de dependências (`npm audit`).
- Dependabot para npm e GitHub Actions.
- Modelos de issue e de Pull Request.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `.env.example`, `docs/arquitetura.md` e `docs/README.md`.

### Alterado
- Servidor separado em `src/app.js` (aplicação) e `src/server.js` (inicialização).
- Porta e caminho do banco configuráveis por `PORT` e `DB_PATH`.
- Matriz de rastreabilidade estendida a RNF01–RNF06 e aos testes.
- README com URL real do repositório, badge de CI e seção de testes.

## [1.0.1] - 2026-11-06
### Corrigido
- Erro de sintaxe no controller e código duplicado no front após merge (#16).
- Troca do `better-sqlite3` pelo SQLite nativo do Node (`node:sqlite`) (#16).

## [1.0.0] - 2026-11-06
### Adicionado
- README final com funcionalidades, instruções e fluxo de branches (#15).

## [0.3.0] - 2026-11-06
### Adicionado
- Edição (#10), exclusão (#11), categorias (#12), saldo (#13) e filtro por tipo (#14).

## [0.2.0] - 2026-11-06
### Adicionado
- Banco SQLite (#6), cadastro de receitas (#7) e despesas (#8), listagem (#9).

## [0.1.0] - 2026-11-06
### Adicionado
- Estrutura inicial (#1), Project Charter (#2), requisitos (#3), casos de uso (#4) e user stories (#5).

[Não lançado]: https://github.com/Rejane-prog/segura-a-grana/compare/v1.1.0...develop
[1.1.0]: https://github.com/Rejane-prog/segura-a-grana/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Rejane-prog/segura-a-grana/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Rejane-prog/segura-a-grana/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/Rejane-prog/segura-a-grana/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Rejane-prog/segura-a-grana/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Rejane-prog/segura-a-grana/releases/tag/v0.1.0
