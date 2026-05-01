# DevBoard Ecosystem

Repositório monorepo contendo o ecossistema **DevBoard** — uma suite de aplicações Angular 21 construídas sobre um design system compartilhado chamado `retro-ui`.

---

## Visão Geral

Este ecossistema foi projetado para ser modular e evolutivo. Atualmente, todos os projetos residem neste único repositório para facilitar o desenvolvimento local, especialmente porque a biblioteca `retro-ui` ainda é consumida via **path mapping local** (não publicada no npm).

> **Plano futuro:** Publicar `retro-ui` como pacote npm (ou GitHub Packages) e, se desejado, separar cada projeto em seu próprio repositório.

---

## Projetos

| Projeto | Descrição | Tipo |
|---|---|---|
| [`retro-ui`](./retro-ui) | Biblioteca de componentes reutilizáveis com estilo retrô/neon. Inclui tokens SCSS, ThemeService e mais de 30 componentes. | Angular Library |
| [`retro-ui-showcase`](./retro-ui-showcase) | Aplicação interativa de documentação e showcase dos componentes da `retro-ui`. | Angular App |
| [`devboard`](./devboard) | Dashboard de gerenciamento de projetos e tarefas. Consome `retro-ui`. | Angular App |
| [`resume`](./resume) | Portfólio interativo e currículo online. Consome `retro-ui`. | Angular App |

---

## Estrutura de Pastas

```
devboard-ecosystem/
├── retro-ui/                  # Biblioteca de componentes (Angular Library)
│   ├── projects/retro-ui/
│   └── dist/retro-ui/         # Build output consumido pelos apps
├── retro-ui-showcase/         # Showcase e documentação
├── devboard/                  # Dashboard de projetos
├── resume/                    # Currículo / Portfólio
├── README.md                  # Este arquivo
└── .gitignore                 # Regras globais de ignorados
```

---

## Pré-requisitos

- **Node.js** >= 20
- **npm** >= 10
- **Angular CLI** >= 19 (`npm install -g @angular/cli`)

---

## Instalação

Cada projeto é independente. Instale as dependências individualmente:

```bash
# 1. Biblioteca (sempre primeiro)
cd retro-ui && npm install

# 2. Aplicações consumidoras
cd ../retro-ui-showcase && npm install
cd ../devboard && npm install
cd ../resume && npm install
```

---

## Como Buildar

### Ordem recomendada

> **Importante:** sempre buildar `retro-ui` **antes** das aplicações, pois elas dependem do artefato local em `../retro-ui/dist/retro-ui`.

```bash
# 1. Build da biblioteca
cd retro-ui
ng build retro-ui

# 2. Build das aplicações (em terminais separados)
cd ../retro-ui-showcase && ng build
cd ../devboard && ng build
cd ../resume && ng build
```

### Servir localmente

```bash
# Biblioteca (não serve diretamente; use build)
cd retro-ui && ng build retro-ui --watch

# Showcase
cd retro-ui-showcase && ng serve

# DevBoard
cd devboard && ng serve

# Resume
cd resume && ng serve
```

---

## Como Rodar Testes

```bash
cd retro-ui          && ng test retro-ui
cd retro-ui-showcase && ng test
cd devboard          && ng test
cd resume            && ng test
```

---

## Consumo Local de `@retro-ui`

As aplicações `retro-ui-showcase`, `devboard` e `resume` consomem a biblioteca via **TypeScript path mapping** local, não pelo npm registry:

```json
// tsconfig.json (em cada app consumidora)
"paths": {
  "@retro-ui": ["../retro-ui/dist/retro-ui"]
}
```

Isso significa que:
- Você **deve** rodar `ng build retro-ui` na biblioteca antes de buildar qualquer app.
- Se estiver em modo `--watch`, as apps detectarão as alterações automaticamente.

### Tokens SCSS

Os apps também referenciam os tokens de design diretamente da fonte da biblioteca:

```json
// angular.json (stylePreprocessorOptions)
"includePaths": [
  "../retro-ui/projects/retro-ui/src/styles"
]
```

Isso permite `@use 'tokens'` nos arquivos `.scss` de cada app.

---

## Roadmap

- [ ] Publicar `retro-ui` no npm / GitHub Packages
- [ ] Remover path mappings locais e usar `dependencies` normais
- [ ] Configurar CI/CD (GitHub Actions) para build e test em PRs
- [ ] Deploy automático do showcase (GitHub Pages / Vercel)
- [ ] Separar repositórios (opcional, após publicação do pacote)

---

## Licença

MIT
