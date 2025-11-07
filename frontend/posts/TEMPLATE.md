---
id: meu-novo-post
date: 2025-01-20
title: Meu Novo Post
coverImage: ../../src/testdemo/sua-imagem.jpg
imageFilter: 0.0
excerpt: Uma breve descrição do seu post que aparecerá na lista.
tags: [Design, Process, Guide]
---

# Meu Novo Post

Aqui começa o conteúdo do seu post em Markdown.

## Como usar este template

1. Copie este arquivo para `frontend/posts/samples/seu-arquivo.md`
2. Preencha os metadados no front matter (a parte entre `---`)
3. Escreva o conteúdo do post abaixo do front matter
4. Adicione o nome do arquivo em `frontend/posts/posts-index.json`

## Front Matter

O front matter é a seção no topo do arquivo entre `---`. Ele contém:

- **id**: Identificador único (opcional, será gerado do nome do arquivo se não fornecido)
- **date**: Data no formato YYYY-MM-DD
- **title**: Título do post
- **coverImage**: Caminho relativo para a imagem de capa
- **imageFilter**: Opacidade do filtro escuro (0.0 a 1.0)
- **excerpt**: Resumo curto do post
- **tags**: Lista de tags entre colchetes

## Escrevendo o conteúdo

Abaixo do front matter, você pode escrever em Markdown normalmente:

- **Negrito**: `**texto**`
- **Itálico**: `*texto*`
- **Listas**: Use `-` ou `*`
- **Cabeçalhos**: Use `#`, `##`, `###`
- **Links**: `[texto](url)`
- **Imagens**: `![alt](url)`

