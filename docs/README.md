# Documentação – Segura a Grana

**Versão da documentação:** 1.1.0 · **Última revisão:** novembro de 2026

## Índice
| Documento | Conteúdo |
|---|---|
| [project-charter.md](project-charter.md) | Justificativa, objetivos SMART, escopo e stakeholders |
| [requisitos.md](requisitos.md) | RF, RNF e matrizes de rastreabilidade (até os testes) |
| [casos-de-uso.md](casos-de-uso.md) | Atores e fluxos principal, alternativo e de exceção |
| [user-stories.md](user-stories.md) | Histórias de usuário com critérios em Gherkin |
| [arquitetura.md](arquitetura.md) | Camadas, diagramas C4, fluxo de requisição e decisões |
| [modelo-dados.md](modelo-dados.md) | Diagrama ER e dicionário de dados |
| [issues.md](issues.md) | Backlog inicial das 15 issues |

Fora desta pasta: [README](../README.md) · [CHANGELOG](../CHANGELOG.md) · [CONTRIBUTING](../CONTRIBUTING.md)

## Regra de sincronização documentação ↔ código
1. **Todo PR que muda o escopo atualiza a documentação no mesmo PR.** Se mudou um RF, atualize `requisitos.md`, a user story, o caso de uso e a matriz.
2. **Requisito novo só entra com issue, user story e teste.** A matriz de rastreabilidade precisa ter as colunas preenchidas.
3. **Toda release atualiza o `CHANGELOG.md`**, a versão do `package.json` e o badge do README.
4. **O checklist do modelo de PR** lembra essas regras antes do merge.
5. Ao revisar um documento, atualize a **versão e a data** no topo deste índice.
