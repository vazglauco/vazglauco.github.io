# Portfolio - Glauco Vaz

Portfolio pessoal desenvolvido com Next.js 16, React 19 e Tailwind CSS.

## 🚀 Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint
```

## 📁 Estrutura de Diretórios

- **`.next/`** - Cache do Next.js durante desenvolvimento
- **`app/`** - Páginas e rotas (App Router)
- **`components/`** - Componentes React reutilizáveis
- **`hooks/`** - Custom React hooks
- **`lib/`** - Utilitários e configurações

## 🔧 Configuração

O projeto está configurado para permitir que `npm run dev` e `npm run build` rodem simultaneamente:

- **Dev mode** → usa `.next` para cache
- **Production build** → usa `out` para static export

Isso é útil quando agentes de IA executam builds para validação enquanto você desenvolve.

## 🎨 Stack

- **Next.js 16** (Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3**
- **GSAP** (animações)
- **Radix UI** (componentes acessíveis)

## 📦 Deploy na Vercel

O projeto usa o runtime padrão do Next.js na Vercel, com páginas estáticas e APIs serverless no mesmo deploy.

Para habilitar comentários e avaliações compartilhados:

1. Crie um projeto no Supabase.
2. Execute `database/001_blog_interactions.sql` no SQL Editor do Supabase.
3. Configure `SUPABASE_URL`, `SUPABASE_SECRET_KEY` e `INTERACTIONS_HASH_SALT` nos ambientes Production, Preview e Development da Vercel.
4. Gere `INTERACTIONS_HASH_SALT` como uma string aleatória longa e privada.

Para desenvolvimento local, copie essas três variáveis para `.env.local`. Elas nunca devem usar o prefixo `NEXT_PUBLIC_`. A chave `SUPABASE_SECRET_KEY` só pode existir no servidor.

## 🏥 Demo do template de clínicas

A seção de templates em `/sites` usa uma captura da versão editorial em `public/templates/clinica-editorial.webp`. A imagem e o botão **Ver demo** abrem a [demonstração externa](https://demo-clinica-five.vercel.app/), onde há quatro direções visuais.

## ✍️ Publicando no blog

Crie um arquivo `.mdx` em `content/blog`. O nome do arquivo vira a URL do artigo; por exemplo, `meu-artigo.mdx` será publicado em `/blog/meu-artigo/`.

```mdx
---
title: "Título do artigo"
date: "2026-09-22"
tags: ["typescript", "arquitetura"]
excerpt: "Uma descrição curta para a listagem do blog."
coverImage: "/blog/minha-foto.webp"
coverAlt: "Descrição acessível da foto"
coverCaption: "Legenda opcional."
---

## Primeiro tópico

Escreva o conteúdo aqui usando Markdown.
```

Coloque as imagens em `public/blog/` e use no artigo um caminho iniciado por `/blog/`. `coverImage`, `coverAlt` e `coverCaption` são opcionais.

Avaliações e comentários são persistidos no PostgreSQL e compartilhados entre visitantes. Os identificadores do visitante e do endereço de rede são armazenados apenas como hashes com salt. A API também inclui rate limiting, honeypot antispam e suporte a ocultar comentários pelo campo `status` no banco.
