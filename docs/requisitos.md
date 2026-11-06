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
| [RNF03] | Segurança/Validação | O sistema deve validar campos obrigatórios e não aceitar valores negativos ou zerados. |
| [RNF04] | Desempenho | A listagem e o saldo devem ser carregados em até 1 segundo. |
| [RNF05] | Portabilidade | A aplicação deve rodar localmente em Windows, Linux ou macOS com Node.js instalado. |
| [RNF06] | Manutenibilidade | O código deve ser versionado no GitHub seguindo Git Flow e Conventional Commits. |

## Matriz de rastreabilidade
| Requisito | Caso de uso | User Story | Issue |
|---|---|---|---|
| RF01 | UC01 | US01 | #7 |
| RF02 | UC02 | US02 | #8 |
| RF03 | UC03 | US03 | #9 |
| RF04 | UC04 | US04 | #10 |
| RF05 | UC05 | US05 | #11 |
| RF06 | UC01, UC02 | US06 | #12 |
| RF07 | UC06 | US07 | #13 |
| RF08 | UC07 | US08 | #14 |
