# Project Charter – Segura a Grana 💰

## 1. Justificativa
Muitas pessoas chegam ao fim do mês sem saber para onde foi o dinheiro. Anotar gastos em papel ou em planilhas soltas costuma ser cansativo e acaba sendo abandonado. O **Segura a Grana** surge para facilitar esse controle com uma aplicação simples, onde o usuário registra receitas e despesas e acompanha o saldo de forma rápida.

## 2. Visão geral do produto
Aplicação web local para controle de finanças pessoais. O usuário poderá cadastrar receitas e despesas, classificar por categoria, editar, excluir, filtrar movimentações e visualizar o saldo atual.

## 3. Objetivos SMART
| # | Objetivo |
|---|---|
| OBJ01 | Permitir o cadastro de receitas e despesas com valor, data, descrição e categoria até o fim da semana do projeto. |
| OBJ02 | Exibir o saldo atualizado automaticamente a cada nova movimentação, em menos de 1 segundo. |
| OBJ03 | Disponibilizar edição, exclusão e filtro por tipo das movimentações até a versão v1.0.0. |
| OBJ04 | Manter 100% das funcionalidades rastreáveis entre requisitos, user stories, issues e commits. |

## 4. Escopo preliminar

### Dentro do escopo
- Cadastro de receitas
- Cadastro de despesas
- Listagem de movimentações
- Edição e exclusão de movimentações
- Classificação por categoria
- Cálculo e exibição do saldo
- Filtro por tipo (receita ou despesa)
- Persistência em banco SQLite

### Fora do escopo (nesta semana)
- Login e cadastro de usuários
- Integração com bancos ou cartões
- Controle de parcelas e contas recorrentes
- Gráficos e relatórios avançados
- Versão mobile
- Deploy em servidor na nuvem

## 5. Stakeholders
| Stakeholder | Papel |
|---|---|
| Rejane Ferreira de Mendonça | Desenvolvedora e responsável pelo projeto |
| Professor da disciplina | Avaliador do projeto |
| Usuário final | Pessoa que vai usar o sistema para controlar suas finanças |

## 6. Público-alvo
Pessoas que querem organizar seus gastos do dia a dia de forma simples, como estudantes, jovens trabalhadores e qualquer pessoa que queira saber quanto entra e quanto sai do seu bolso.

## 7. Stack tecnológica
Node.js, Express, SQLite, HTML, CSS e JavaScript.
