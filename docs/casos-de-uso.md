# Casos de Uso – Segura a Grana

## Atores
| Ator | Descrição |
|---|---|
| Usuário | Pessoa que usa o sistema para registrar e acompanhar suas finanças. |
| Sistema (banco SQLite) | Ator secundário responsável por armazenar as movimentações. |

---

## UC01 – Cadastrar receita
**Ator:** Usuário | **Requisito:** RF01, RF06
**Pré-condição:** aplicação em execução.

**Fluxo principal**
1. O usuário escolhe a opção "Nova movimentação".
2. Seleciona o tipo "Receita".
3. Informa descrição, valor, data e categoria.
4. Clica em "Salvar".
5. O sistema valida os dados e salva a receita.
6. O sistema atualiza a lista e o saldo.

**Fluxo alternativo**
- A1: O usuário não escolhe categoria → o sistema salva como "Outros".

**Fluxo de exceção**
- E1: Campo obrigatório vazio → o sistema mostra "Preencha todos os campos obrigatórios".
- E2: Valor zero ou negativo → o sistema mostra "Informe um valor maior que zero".

**Pós-condição:** receita salva e saldo atualizado.

---

## UC02 – Cadastrar despesa
**Ator:** Usuário | **Requisito:** RF02, RF06
**Pré-condição:** aplicação em execução.

**Fluxo principal**
1. O usuário escolhe "Nova movimentação".
2. Seleciona o tipo "Despesa".
3. Informa descrição, valor, data e categoria.
4. Clica em "Salvar".
5. O sistema valida e salva a despesa.
6. O sistema atualiza a lista e o saldo.

**Fluxo alternativo**
- A1: Sem categoria → salva como "Outros".

**Fluxo de exceção**
- E1: Campo obrigatório vazio → mensagem de erro.
- E2: Valor inválido → mensagem de erro.

**Pós-condição:** despesa salva e saldo atualizado.

---

## UC03 – Consultar movimentações
**Ator:** Usuário | **Requisito:** RF03

**Fluxo principal**
1. O usuário abre a aplicação.
2. O sistema lista as movimentações da mais recente para a mais antiga.

**Fluxo alternativo**
- A1: Não há movimentações → o sistema mostra "Nenhuma movimentação cadastrada".

**Fluxo de exceção**
- E1: Falha ao acessar o banco → o sistema mostra "Erro ao carregar movimentações".

---

## UC04 – Editar movimentação
**Ator:** Usuário | **Requisito:** RF04
**Pré-condição:** existir ao menos uma movimentação.

**Fluxo principal**
1. O usuário clica em "Editar" na movimentação.
2. O sistema carrega os dados no formulário.
3. O usuário altera os campos e clica em "Salvar".
4. O sistema valida, atualiza e recalcula o saldo.

**Fluxo alternativo**
- A1: O usuário clica em "Cancelar" → nada é alterado.

**Fluxo de exceção**
- E1: Dados inválidos → mensagem de erro.
- E2: Movimentação não encontrada → "Movimentação não encontrada".

---

## UC05 – Excluir movimentação
**Ator:** Usuário | **Requisito:** RF05

**Fluxo principal**
1. O usuário clica em "Excluir".
2. O sistema pede confirmação.
3. O usuário confirma.
4. O sistema remove o registro e recalcula o saldo.

**Fluxo alternativo**
- A1: O usuário cancela → o registro é mantido.

**Fluxo de exceção**
- E1: Movimentação não encontrada → mensagem de erro.

---

## UC06 – Consultar saldo
**Ator:** Usuário | **Requisito:** RF07

**Fluxo principal**
1. O usuário abre a aplicação.
2. O sistema soma as receitas, soma as despesas e mostra o saldo.

**Fluxo alternativo**
- A1: Saldo negativo → o valor aparece em vermelho.

**Fluxo de exceção**
- E1: Erro no banco → "Não foi possível calcular o saldo".

---

## UC07 – Filtrar movimentações
**Ator:** Usuário | **Requisito:** RF08

**Fluxo principal**
1. O usuário escolhe o filtro "Receitas" ou "Despesas".
2. O sistema mostra só as movimentações do tipo escolhido.

**Fluxo alternativo**
- A1: O usuário escolhe "Todas" → o sistema mostra tudo.
- A2: Não há registros do tipo → "Nenhuma movimentação encontrada".
