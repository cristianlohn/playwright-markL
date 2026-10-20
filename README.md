# Playwright MarkL

**[English](#english) · [Português](#português)**

## English

End-to-end test automation for a task management application, built with **Playwright and TypeScript**.

[Back to portfolio](https://github.com/cristianlohn) · [Browse tests](tests/tasks.spec.ts)

### Test scenarios

- Create tasks using the add button or the Enter key.
- Reject duplicate tasks and validate required fields.
- Complete and delete tasks.

### Project structure

| Path | Purpose |
| --- | --- |
| `tests/tasks.spec.ts` | Task management scenarios |
| `tests/home.spec.ts` | Home page checks |
| `tests/support/pages/tasks/` | Page Object with actions and assertions |
| `tests/support/helpers.ts` | API-based test data setup and cleanup |
| `tests/fixtures/` | Test data and task model |
| `playwright.config.ts` | Browsers, reports and evidence settings |

### Run locally

You need Node.js and a compatible MarkL application and API running in your test environment. The application and API are not included in this repository.

```sh
git clone https://github.com/cristianlohn/playwright-markL.git
cd playwright-markL
npm install
npx playwright install
```

Create a `.env` file in the project root:

```dotenv
BASE_URL=http://localhost:3000
BASE_API=http://localhost:3333
```

These URLs are examples; adjust them to match your environment. The API helpers use `/tasks` and `/helper/tasks/:taskName`. Use a dedicated test instance because the scenarios create, modify and delete tasks.

```sh
# Run Chromium only
npx playwright test --project=chromium

# Run all configured projects
npx playwright test

# Open the HTML report after execution
npx playwright show-report
```

### Browsers and evidence

The configuration includes Chromium, Firefox, WebKit and device emulation for Pixel 5 and iPhone 12. It enables HTML reporting, screenshots on failure and traces on the first retry. CI uses two retries and one worker.

### Context

This is a test automation practice project. Execution results depend on a compatible, available MarkL environment. The `up.sh` script references `apps/api` and `apps/web` directories that are not included in this repository.

---

## Português

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
