# Requisitos – Segura a Grana

## Requisitos Funcionais (RF)
| ID | Descrição | Prioridade |
|---|---|---|
| [RF01] | O sistema deve permitir cadastrar receitas informando descrição, valor, data e categoria. | Alta |
| [RF02] | O sistema deve permitir cadastrar despesas informando descrição, valor, data e categoria. | Alta |
| [RF03] | O sistema deve permitir visualizar todas as movimentações cadastradas. | Alta |
| [RF04] | O sistema deve permitir editar uma movimentação cadastrada. | Média |
| [RF05] | O sistema deve permitir excluir uma movimentação cadastrada. | Média |
| [RF06] | O sistema deve permitir classificar as movimentações por categoria. | Média |
| [RF07] | O sistema deve calcular e exibir o saldo atual (receitas − despesas). | Alta |
| [RF08] | O sistema deve permitir filtrar as movimentações por tipo (receita ou despesa). | Baixa |

## Requisitos Não Funcionais (RNF)
| ID | Categoria | Descrição |
|---|---|---|
| [RNF01] | Usabilidade | A interface deve ser simples, permitindo cadastrar uma movimentação em poucos cliques. |
| [RNF02] | Persistência | Os dados devem continuar salvos após fechar a aplicação (SQLite). |
| [RNF03] | Segurança/Validação | O sistema deve validar campos obrigatórios, rejeitar valores menores ou iguais a zero e datas inválidas, respondendo com mensagem clara. |
| [RNF04] | Desempenho | A listagem e o saldo devem responder em menos de 1 segundo, mesmo com 5 000 movimentações. |
| [RNF05] | Portabilidade | A aplicação deve rodar localmente em Windows, Linux ou macOS com Node.js 22.13+. |
| [RNF06] | Manutenibilidade | O código deve ser versionado no GitHub com Git Flow, Conventional Commits, testes automatizados e CI. |

## Matriz de rastreabilidade – Requisitos funcionais
| Requisito | Caso de uso | User Story | Issue | Código | Teste automatizado |
|---|---|---|---|---|---|
| RF01 | UC01 | US01 | #7 | `controller.criar` | `test/movimentacoes.test.js` › RF01 |
| RF02 | UC02 | US02 | #8 | `controller.criar` | `test/movimentacoes.test.js` › RF02 |
| RF03 | UC03 | US03 | #9 | `controller.listar` | `test/movimentacoes.test.js` › RF03 |
| RF04 | UC04 | US04 | #10 | `controller.atualizar` | `test/movimentacoes.test.js` › RF04 |
| RF05 | UC05 | US05 | #11 | `controller.excluir` | `test/movimentacoes.test.js` › RF05 |
| RF06 | UC01, UC02 | US06 | #12 | `definirCategoria` | `test/movimentacoes.test.js` › RF06 |
| RF07 | UC06 | US07 | #13 | `controller.saldo` | `test/movimentacoes.test.js` › RF07 |
| RF08 | UC07 | US08 | #14 | `controller.listar` (`?tipo=`) | `test/movimentacoes.test.js` › RF08 |

## Matriz de rastreabilidade – Requisitos não funcionais
| Requisito | Como é atendido | Issue | Evidência / Teste |
|---|---|---|---|
| RNF01 | Formulário único, resumo de saldo no topo, filtro em um clique | #14, #15 | Revisão manual da interface |
| RNF02 | Banco SQLite em arquivo (`DB_PATH`) | #6, #16 | Dados permanecem após reiniciar o servidor |
| RNF03 | Middleware `validarMovimentacao` com erro padronizado | #41 | `test/validacao.test.js` |
| RNF04 | Consultas SQL simples e ordenadas | #42 | `test/desempenho.test.js` (5 000 registros < 1 s) |
| RNF05 | Sem dependências nativas (`node:sqlite`), CI em Node 22 e 24 | #16, #43 | `.github/workflows/ci.yml` |
| RNF06 | Git Flow, Conventional Commits, testes e CI | #43, #48 | `CONTRIBUTING.md`, Actions verde |

