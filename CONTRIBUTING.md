# Como contribuir com o Segura a Grana

## 1. Antes de começar
- Toda mudança nasce de uma **issue**. Use os modelos (bug, funcionalidade ou documentação).
- Cada issue deve ter **labels** (`type:*`, `priority:*`, `status:*`) e **critérios de aceite**.

## 2. Fluxo de branches (Git Flow)
| Branch | Uso |
|---|---|
| `main` | Somente versões estáveis, sempre com tag |
| `develop` | Integração do desenvolvimento |
| `feature/issue-N-descricao` | Nova funcionalidade, criada a partir da `develop` |
| `fix/issue-N-descricao` | Correção de bug, criada a partir da `develop` |
| `release/vX.Y.Z` | Preparação de versão |

```bash
git checkout develop
git pull
git checkout -b feature/issue-N-descricao
```

- **Nunca** faça commit direto na `main`.
- **Todo merge acontece por Pull Request** no GitHub (nada de `git merge` local), para manter o histórico rastreável.
- Nunca edite arquivos direto pelo site do GitHub: isso gera commits genéricos como "Update README.md".

## 3. Padrão de commits (Conventional Commits)
```
tipo(escopo): descrição curta no imperativo (#N)
```
| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `test` | Testes |
| `refactor` | Mudança de código sem alterar comportamento |
| `ci` | Pipelines e automação |
| `chore` | Configuração e dependências |

Exemplo: `feat(balance): exibir saldo negativo em vermelho (#13)`

Faça commits **pequenos e atômicos**: uma mudança lógica por commit.

## 4. Testes
```bash
npm test
```
- Toda funcionalidade nova precisa de teste em `test/`.
- Os testes usam banco em memória (`DB_PATH=:memory:`), então não mexem no seu banco.
- O PR só pode ser integrado com o **CI verde**.

## 5. Pull Request
- Abra o PR para a **`develop`** e preencha o modelo.
- Coloque `Closes #N` na descrição para fechar a issue automaticamente.
- Se o PR mudar o escopo, atualize `docs/` e o README no mesmo PR.

## 6. Versões (SemVer)
- `MAJOR`: mudança incompatível · `MINOR`: nova funcionalidade · `PATCH`: correção.
- Release: branch `release/vX.Y.Z` → PR `develop` → `main`, tag anotada `vX.Y.Z`, versão no `package.json` e registro no `CHANGELOG.md`.
