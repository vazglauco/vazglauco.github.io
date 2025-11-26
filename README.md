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
- **`out/`** - Build estático de produção (usado para deploy no GitHub Pages)
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

## 📦 Deploy

O projeto usa static export (`output: 'export'`) e está configurado para GitHub Pages.

O diretório `out/` contém os arquivos estáticos prontos para deploy.
