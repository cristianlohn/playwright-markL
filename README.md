# Playwright MarkL

Automação de testes ponta a ponta para uma aplicação de gerenciamento de tarefas, utilizando **Playwright e TypeScript**.

[Voltar ao portfólio](https://github.com/cristianlohn) · [Ver os testes](tests/tasks.spec.ts)

## Cenários cobertos

- Cadastro de tarefas pelo botão de adicionar e pela tecla Enter.
- Rejeição de tarefas duplicadas e validação de campo obrigatório.
- Conclusão e exclusão de tarefas.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `tests/tasks.spec.ts` | Cenários de gerenciamento de tarefas |
| `tests/home.spec.ts` | Verificações da página inicial |
| `tests/support/pages/tasks/` | Page Object com ações e validações |
| `tests/support/helpers.ts` | Preparação e limpeza de dados por API |
| `tests/fixtures/` | Dados e modelo de tarefas |
| `playwright.config.ts` | Navegadores, relatório e evidências |

## Executar localmente

É necessário ter Node.js e uma instância compatível da aplicação MarkL e de sua API em execução. A aplicação e a API não estão incluídas neste repositório.

```sh
git clone https://github.com/cristianlohn/playwright-markL.git
cd playwright-markL
npm install
npx playwright install
```

Crie um arquivo `.env` na raiz com os endereços do seu ambiente de testes:

```dotenv
BASE_URL=http://localhost:3000
BASE_API=http://localhost:3333
```

Os endereços acima são exemplos; ajuste as portas conforme a aplicação. Os helpers utilizam os endpoints `/tasks` e `/helper/tasks/:taskName`. Use uma instância dedicada a testes, pois os cenários criam, alteram e excluem tarefas.

```sh
# Executar apenas no Chromium
npx playwright test --project=chromium

# Executar todos os projetos configurados
npx playwright test

# Abrir o relatório HTML após a execução
npx playwright show-report
```

## Navegadores e evidências

A configuração contempla Chromium, Firefox, WebKit e emulação de dispositivos Pixel 5 e iPhone 12. Também define relatório HTML, screenshots em falhas e trace na primeira repetição. Em CI, são configuradas duas repetições e um worker.

## Contexto

Projeto de prática em automação. A presença dos cenários e configurações documenta a implementação; o resultado da execução depende da disponibilidade e compatibilidade do ambiente MarkL. O script `up.sh` faz referência a pastas `apps/api` e `apps/web` que não estão incluídas no repositório.
