# User Stories – Segura a Grana

## US01 – Registrar receita (RF01)
**Como** usuário, **quero** registrar minhas receitas **para que** eu saiba quanto dinheiro entrou no mês.

**Critérios de aceite**
```gherkin
Cenário: Cadastro de receita válida
  Dado que estou no formulário de nova movimentação
  Quando seleciono o tipo "Receita"
  E informo descrição, valor 1500, data e categoria "Salário"
  E clico em "Salvar"
  Então a receita deve aparecer na lista
  E o saldo deve aumentar em 1500

Cenário: Valor inválido
  Dado que estou no formulário de nova movimentação
  Quando informo o valor 0
  Então o sistema deve exibir "Informe um valor maior que zero"
```

## US02 – Registrar despesa (RF02)
**Como** usuário, **quero** registrar minhas despesas **para que** eu controle meus gastos.

```gherkin
Cenário: Cadastro de despesa válida
  Dado que estou no formulário de nova movimentação
  Quando seleciono o tipo "Despesa"
  E informo descrição "Mercado", valor 200 e categoria "Alimentação"
  E clico em "Salvar"
  Então a despesa deve aparecer na lista
  E o saldo deve diminuir em 200

Cenário: Campo obrigatório vazio
  Dado que deixei a descrição vazia
  Quando clico em "Salvar"
  Então o sistema deve exibir "Preencha todos os campos obrigatórios"
```

## US03 – Consultar movimentações (RF03)
**Como** usuário, **quero** ver todas as minhas movimentações **para que** eu acompanhe entradas e saídas.

```gherkin
Cenário: Listagem com registros
  Dado que existem movimentações cadastradas
  Quando abro a aplicação
  Então devo ver a lista ordenada da mais recente para a mais antiga

Cenário: Lista vazia
  Dado que não existem movimentações
  Quando abro a aplicação
  Então devo ver "Nenhuma movimentação cadastrada"
```

## US04 – Editar movimentação (RF04)
**Como** usuário, **quero** editar uma movimentação **para que** eu corrija informações erradas.

```gherkin
Cenário: Edição válida
  Dado que existe uma despesa de 100
  Quando altero o valor para 150 e salvo
  Então a lista deve mostrar 150
  E o saldo deve ser recalculado
```

## US05 – Excluir movimentação (RF05)
**Como** usuário, **quero** excluir uma movimentação **para que** eu remova registros que não quero mais.

```gherkin
Cenário: Exclusão confirmada
  Dado que existe uma movimentação na lista
  Quando clico em "Excluir" e confirmo
  Então ela deve sumir da lista
  E o saldo deve ser recalculado

Cenário: Exclusão cancelada
  Dado que cliquei em "Excluir"
  Quando cancelo a confirmação
  Então a movimentação deve continuar na lista
```

## US06 – Categorizar movimentação (RF06)
**Como** usuário, **quero** escolher uma categoria **para que** eu saiba com o que estou gastando.

```gherkin
Cenário: Categoria escolhida
  Dado que estou cadastrando uma despesa
  Quando escolho a categoria "Transporte"
  Então a movimentação deve aparecer com a categoria "Transporte"

Cenário: Sem categoria
  Dado que não escolhi categoria
  Quando salvo a movimentação
  Então ela deve ser salva com a categoria "Outros"
```

## US07 – Ver saldo (RF07)
**Como** usuário, **quero** ver meu saldo **para que** eu saiba quanto dinheiro ainda tenho.

```gherkin
Cenário: Cálculo do saldo
  Dado que tenho receitas de 2000 e despesas de 500
  Quando abro a aplicação
  Então o saldo exibido deve ser R$ 1.500,00

Cenário: Saldo negativo
  Dado que minhas despesas são maiores que as receitas
  Quando abro a aplicação
  Então o saldo deve aparecer em vermelho
```

## US08 – Filtrar por tipo (RF08)
**Como** usuário, **quero** filtrar receitas ou despesas **para que** eu analise cada uma separadamente.

```gherkin
Cenário: Filtrar despesas
  Dado que tenho receitas e despesas cadastradas
  Quando seleciono o filtro "Despesas"
  Então devo ver apenas despesas

Cenário: Mostrar todas
  Dado que um filtro está ativo
  Quando seleciono "Todas"
  Então devo ver todas as movimentações
```
