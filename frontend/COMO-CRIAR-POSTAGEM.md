# 📝 Como Criar uma Nova Postagem

Agora criar postagens ficou muito mais fácil! Você só precisa:

## Para Posts de Blog

1. **Crie um arquivo markdown** em `frontend/posts/samples/` com o nome que quiser (ex: `meu-post.md`)

2. **Adicione o front matter** no topo do arquivo:
```markdown
---
id: meu-post
date: 2025-01-20
title: Meu Post Incrível
coverImage: ../../src/testdemo/sua-imagem.jpg
imageFilter: 0.0
excerpt: Uma breve descrição do post
tags: [Design, Process, Guide]
---

# Meu Post Incrível

Aqui vai o conteúdo do seu post em Markdown...
```

3. **Adicione o nome do arquivo** em `frontend/posts/posts-index.json`:
```json
[
  "design-systems-study.md",
  "typography-sketch-to-system.md",
  "meu-post.md"
]
```

Pronto! O post aparecerá automaticamente na página de blog.

## Para Projetos de Design

1. **Crie um arquivo markdown** em `frontend/designs/samples/` (ex: `meu-projeto.md`)

2. **Adicione o front matter** igual aos posts:
```markdown
---
id: meu-projeto
date: 2025-01-20
title: Meu Projeto
coverImage: ../../src/testdemo/sua-imagem.jpg
imageFilter: 0.0
excerpt: Descrição do projeto
tags: [Design, UI/UX]
---

# Meu Projeto

Conteúdo do projeto...
```

3. **Adicione o nome do arquivo** em `frontend/designs/designs-index.json`

## Campos do Front Matter

- **id** (opcional): Se não fornecer, será gerado automaticamente do nome do arquivo
- **date**: Data no formato `YYYY-MM-DD`
- **title**: Título da postagem
- **coverImage**: Caminho relativo para a imagem de capa
- **imageFilter**: Valor de 0.0 a 1.0 para filtro escuro na imagem (0 = sem filtro)
- **excerpt**: Resumo curto que aparece na lista
- **tags**: Lista de tags entre colchetes, separadas por vírgula

## Exemplo Completo

```markdown
---
id: tutorial-design-systems
date: 2025-01-20
title: Criando Design Systems do Zero
coverImage: ../../src/testdemo/design-system.jpg
imageFilter: 0.0
excerpt: Um guia completo sobre como criar design systems escaláveis.
tags: [Design, Tutorial, UI/UX]
---

# Criando Design Systems do Zero

Este é um guia completo...

## Introdução

Conteúdo aqui...

## Tokens

- Cores
- Espaçamento
- Tipografia
```

## Dicas

- Use os templates em `frontend/posts/TEMPLATE.md` e `frontend/designs/TEMPLATE.md`
- Os posts são ordenados automaticamente por data (mais recentes primeiro)
- Você pode usar toda sintaxe Markdown normal no conteúdo
- Não precisa mais editar arquivos JSON complexos!

