# Configurar CI/CD com GitHub Actions

## Objetivo

Configurar o pipeline de CI/CD para validar automaticamente builds e testes do ecossistema DevBoard em pushes e pull requests para a branch `main`.

## Escopo

- Workflow `.github/workflows/ci.yml` já criado como base inicial.
- Validar instalação, build e testes dos 4 projetos na ordem correta.
- Futuramente: adicionar cache de dependências, notificações e status badges.

## Critérios de Aceite

- [ ] CI roda automaticamente em push/PR para `main`.
- [ ] Todos os 4 projetos são validados em ordem de dependência.
- [ ] Pipeline falha se qualquer build ou teste falhar.
- [ ] Badge de status adicionado ao README.
