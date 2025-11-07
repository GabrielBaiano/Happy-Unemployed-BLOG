# Happy-Unemployed-BLOG

Site estático de blog e portfólio de design.

## Estrutura

```
frontend/
  pages/          # Páginas HTML
  components/     # Componentes reutilizáveis
  styles/         # CSS
  scripts/        # JavaScript
  assets/         # Assets (imagens, etc)
  posts/          # Posts do blog
    samples/      # Arquivos markdown dos posts
  designs/        # Projetos de design
    samples/      # Arquivos markdown dos projetos
docs/             # Documentação
src/              # Assets gerais (imagens, etc)
```

## Como Criar Postagens

Veja `frontend/COMO-CRIAR-POSTAGEM.md` para instruções detalhadas.

### Resumo Rápido:

1. Crie um arquivo markdown em `frontend/posts/samples/` ou `frontend/designs/samples/`
2. Adicione front matter (metadados YAML) no topo do arquivo
3. Adicione o nome do arquivo no índice correspondente (`posts-index.json` ou `designs-index.json`)
4. Pronto! O post aparecerá automaticamente no site

## Sistema de Postagens

O sistema usa front matter (YAML) nos arquivos markdown, tornando muito mais simples criar e gerenciar postagens. Não é mais necessário editar JSONs complexos - tudo fica no próprio arquivo markdown!