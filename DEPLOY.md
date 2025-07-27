# 🚀 Deploy para GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages.

## 📋 Pré-requisitos

1. **Repositório no GitHub**: Certifique-se de que o código está em um repositório GitHub
2. **Branch main**: O deploy é acionado automaticamente quando há push na branch `main`

## ⚙️ Configuração do GitHub Pages

### 1. Ativar GitHub Pages
1. Vá para **Settings** do seu repositório
2. Role até a seção **Pages**
3. Em **Source**, selecione **GitHub Actions**

### 2. Configuração Automática
- O workflow `.github/workflows/deploy.yml` já está configurado
- O deploy acontece automaticamente a cada push na branch `main`
- O site será construído e publicado na branch `gh-pages`

## 🌐 URL do Site

Após o primeiro deploy, seu site estará disponível em:
\`\`\`
https://[seu-usuario].github.io/[nome-do-repositorio]/
\`\`\`

## 🔧 Comandos Locais

\`\`\`bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Build com arquivo .nojekyll
npm run deploy
\`\`\`

## 📁 Estrutura de Deploy

- **Pasta de build**: `dist/`
- **Arquivo .nojekyll**: Previne processamento Jekyll
- **Exportação estática**: Configurada no `next.config.mjs`

## ✅ Verificações

Após o deploy, verifique:
- [ ] Site carregando corretamente
- [ ] Tema dark como padrão
- [ ] Navegação funcionando
- [ ] Imagens carregando
- [ ] Links externos funcionando

## 🐛 Troubleshooting

### Site não carrega
- Verifique se GitHub Pages está ativado
- Confirme que o workflow executou sem erros
- Aguarde alguns minutos para propagação

### Imagens não aparecem
- Todas as imagens estão configuradas como `unoptimized: true`
- Verifique se os caminhos das imagens estão corretos

### CSS não carrega
- O arquivo `.nojekyll` previne problemas com arquivos que começam com `_`
- Verifique se o arquivo foi criado corretamente
\`\`\`

```plaintext file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules

# next.js
/.next/
/out/
/dist/

# production
/build

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# GitHub Pages
gh-pages
