# Publicar retro-ui como pacote

## Objetivo

Transformar a biblioteca `retro-ui` de um projeto consumido por path mapping local em um pacote publicável no npm ou GitHub Packages.

## Escopo

- Revisar configuração do `ng-packagr` e `package.json` da biblioteca.
- Definir escopo do pacote (ex: `@devboard/retro-ui`).
- Configurar publicação automatizada via CI/CD.
- Atualizar aplicações consumidoras para usar o pacote publicado.
- Remover path mappings locais dos `tsconfig.json`.

## Critérios de Aceite

- [ ] Pacote publicado no registry escolhido.
- [ ] Aplicações consomem `retro-ui` via `dependencies`, não path mapping.
- [ ] Path mappings removidos dos tsconfig das apps.
- [ ] Pipeline de publicação automatizado com versionamento semântico.
- [ ] README da biblioteca atualizado com instruções de instalação.
