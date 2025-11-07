# 🚀 Sistema Simplificado de Postagens

## O que mudou?

Antes, você precisava:
1. Criar um arquivo markdown
2. Editar um JSON complexo com todos os metadados
3. Manter tudo sincronizado manualmente

Agora, você só precisa:
1. Criar um arquivo markdown com front matter
2. Adicionar o nome do arquivo em um índice simples

## Estrutura

### Posts de Blog
- **Arquivos**: `frontend/posts/samples/*.md`
- **Índice**: `frontend/posts/posts-index.json`
- **Template**: `frontend/posts/TEMPLATE.md`

### Projetos de Design
- **Arquivos**: `frontend/designs/samples/*.md`
- **Índice**: `frontend/designs/designs-index.json`
- **Template**: `frontend/designs/TEMPLATE.md`

## Como Funciona

1. O sistema lê o arquivo de índice (lista de nomes de arquivos)
2. Para cada arquivo, carrega o markdown
3. Extrai os metadados do front matter (YAML no topo)
4. Exibe automaticamente nas páginas

## Exemplo Rápido

```markdown
---
date: 2025-01-20
title: Meu Post
coverImage: ../../src/testdemo/imagem.jpg
excerpt: Descrição curta
tags: [Design, Process]
---

# Meu Post

Conteúdo aqui...
```

Depois, adicione `"meu-post.md"` no índice JSON correspondente.

## Vantagens

✅ **Mais simples**: Tudo em um único arquivo  
✅ **Menos erros**: Metadados junto com o conteúdo  
✅ **Mais organizado**: Fácil de encontrar e editar  
✅ **Menos manutenção**: Não precisa manter JSONs complexos  

Veja `COMO-CRIAR-POSTAGEM.md` para instruções detalhadas!

