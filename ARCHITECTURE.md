# Arquitetura de Animações - Refatoração

## 🎯 Objetivo da Refatoração

Transformar o código de animações que estava **acoplado, difícil de manter e com 202 linhas** em um sistema **limpo, escalável e reutilizável**.

## 📊 Resultados

### Antes
- **HeroSection**: 202 linhas com toda lógica misturada
- 13 refs diferentes no mesmo componente
- Números mágicos espalhados pelo código
- Difícil sincronizar animações entre componentes
- Código duplicado entre LoadingScreen e HeroSection

### Depois
- **HeroSection**: 54 linhas (apenas orquestração)
- **Separação clara**: UI vs Lógica vs Configuração
- **Reutilizável**: Hooks podem ser usados em qualquer componente
- **Sincronizado**: AppContext coordena todas as animações
- **Escalável**: Fácil adicionar novos efeitos

## 🏗️ Nova Estrutura

```
vazglauco.github.io/
├── lib/
│   └── animations/
│       ├── index.ts                      # Exports centralizados
│       ├── constants.ts                  # ⚙️ Todas as configurações
│       └── animation-helpers.ts          # 🛠️ Funções utilitárias GSAP
│
├── hooks/
│   ├── index.ts                          # Exports centralizados
│   ├── useCardAnimation.ts               # 🎴 Animação do card 3D
│   ├── useTypewriterEffect.ts            # ⌨️ Efeito de digitação
│   ├── useShineEffect.ts                 # ✨ Efeito de brilho
│   ├── useFloatingAnimation.ts           # 🎈 Animação de flutuação
│   └── useThemeAwareShadow.ts            # 🌓 Sombra baseada no tema
│
├── components/
│   ├── app-wrapper.tsx                   # 🎭 Contexto de animações
│   ├── hero/
│   │   ├── HeroCard.tsx                  # 🖼️ Card visual (apenas UI + hooks)
│   │   └── HeroContent.tsx               # 📝 Conteúdo textual (apenas UI)
│   ├── hero-section.tsx                  # 🎬 Orquestrador (54 linhas!)
│   └── header.tsx                        # 📌 Header com animação sincronizada
```

## 🎨 Princípios da Arquitetura

### 1. Separation of Concerns (SoC)
Cada arquivo tem uma responsabilidade única:

- **constants.ts**: Configurações (não sabe de GSAP ou React)
- **animation-helpers.ts**: Lógica GSAP pura (não sabe de React)
- **Hooks**: Conectam GSAP com React (não sabem de UI)
- **Componentes**: Apenas UI e composição (não sabem de GSAP diretamente)

### 2. Single Source of Truth
Todas as configurações de tempo estão em `constants.ts`:

```typescript
export const LOADING_ANIMATION = {
  INITIAL_SCALE_DURATION: 2.5,
  ROTATION_PHASE_1_DURATION: 3,
  // ... etc
}

export const HEADER_ANIMATION = {
  DELAY: LOADING_ANIMATION.TOTAL_DURATION, // ← Sincronizado automaticamente!
  FADE_DURATION: 0.8,
}
```

### 3. Composição sobre Herança
Componentes pequenos que fazem uma coisa bem:

```typescript
<HeroSection>
  <HeroCard />      // ← Cuida apenas do card
  <HeroContent />   // ← Cuida apenas do conteúdo
</HeroSection>
```

### 4. Hooks Reutilizáveis
Qualquer componente pode usar os hooks:

```typescript
// Adicionar efeito de flutuação em qualquer lugar
const { floatingRef } = useFloatingAnimation({ enabled: true });

// Adicionar typewriter em qualquer lugar
useTypewriterEffect({
  start: true,
  steps: [...]
});
```

## 🔄 Fluxo de Sincronização

```
┌─────────────────┐
│  LoadingScreen  │
└────────┬────────┘
         │
         ├─► onCardPositioned()
         │
         ▼
┌─────────────────┐
│   AppContext    │ ← Estado centralizado
│  (coordenador)  │
└────────┬────────┘
         │
         ├─► startContentAnimations = true
         ├─► startHeaderAnimation = true
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐  ┌────────┐
│  Hero  │  │ Header │
│Content │  │        │
└────────┘  └────────┘
```

## 📝 Como Adicionar Novos Efeitos

### 1. Adicionar Constantes
```typescript
// lib/animations/constants.ts
export const NEW_EFFECT = {
  DURATION: 2,
  DELAY: 0.5,
  EASE: 'power2.out',
};
```

### 2. Criar Helper (se necessário)
```typescript
// lib/animations/animation-helpers.ts
export function createNewEffect(config) {
  return gsap.to(config.target, {
    // ... sua animação
  });
}
```

### 3. Criar Hook
```typescript
// hooks/useNewEffect.ts
export function useNewEffect({ enabled }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const animation = createNewEffect({
      target: ref.current,
      duration: NEW_EFFECT.DURATION,
    });

    return () => animation.kill();
  }, [enabled]);

  return { ref };
}
```

### 4. Usar em Qualquer Componente
```typescript
function MyComponent() {
  const { ref } = useNewEffect({ enabled: true });

  return <div ref={ref}>Animated!</div>;
}
```

## 🎯 Sincronizar com Outros Componentes

Para adicionar animação sincronizada em qualquer componente:

```typescript
import { useAppContext } from '@/components/app-wrapper';

function MyComponent() {
  const { startHeaderAnimation } = useAppContext();

  useEffect(() => {
    if (!startHeaderAnimation) return;

    // Sua animação aqui - vai começar sincronizado com o header!
  }, [startHeaderAnimation]);
}
```

## 🚀 Benefícios

### Para Desenvolvimento
- ✅ **Fácil debug**: Cada hook é isolado
- ✅ **Fácil teste**: Funções puras em helpers
- ✅ **Autocomplete**: TypeScript em tudo
- ✅ **Documentação**: JSDoc em todos os exports

### Para Manutenção
- ✅ **Ajustar timings**: Apenas edite `constants.ts`
- ✅ **Adicionar efeitos**: Crie um novo hook
- ✅ **Sincronizar**: Use o AppContext
- ✅ **Reusar**: Import e use o hook

### Para Performance
- ✅ **Cleanup automático**: useEffect cuida disso
- ✅ **Refs otimizados**: Sem re-renders desnecessários
- ✅ **GSAP otimizado**: Usando quickSetters e timelines

## 📚 Exemplos de Uso

### Reutilizar Typewriter em Outro Componente
```typescript
import { useTypewriterEffect } from '@/hooks';

function AboutSection() {
  const titleRef = useRef(null);

  useTypewriterEffect({
    start: true,
    steps: [{
      ref: titleRef,
      text: "Sobre Mim",
      duration: 1,
      delay: 0.5,
    }]
  });

  return <h2 ref={titleRef} />;
}
```

### Adicionar Floating em Logo
```typescript
import { useFloatingAnimation } from '@/hooks';

function Logo() {
  const { floatingRef } = useFloatingAnimation({
    enabled: true,
    yOffset: -10,
  });

  return <img ref={floatingRef} src="/logo.png" />;
}
```

### Sincronizar Nova Animação
```typescript
import { useAppContext } from '@/components/app-wrapper';
import { LOADING_ANIMATION } from '@/lib/animations';

function SideBar() {
  const { loadingComplete } = useAppContext();
  const ref = useRef(null);

  useEffect(() => {
    if (!loadingComplete || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
    });
  }, [loadingComplete]);

  return <aside ref={ref} style={{ x: -100, opacity: 0 }} />;
}
```

## 🎓 Conceitos Aplicados

1. **Clean Architecture**: Separação em camadas (UI → Hooks → Helpers → Constants)
2. **DRY (Don't Repeat Yourself)**: Hooks reutilizáveis
3. **Single Responsibility**: Cada arquivo faz uma coisa
4. **Open/Closed**: Aberto para extensão (novos hooks), fechado para modificação
5. **Dependency Inversion**: Componentes dependem de abstrações (hooks), não de implementações
6. **Composition Pattern**: Componentes pequenos componíveis
7. **Custom Hooks Pattern**: Lógica reutilizável com React
8. **Context Pattern**: Estado global compartilhado

## 🔧 Manutenção

### Ajustar Todos os Timings
Edite apenas um arquivo: `lib/animations/constants.ts`

### Adicionar Novo Tipo de Animação
1. Crie novo hook em `hooks/`
2. Adicione constantes em `lib/animations/constants.ts`
3. Use em qualquer componente

### Debugar Animação
- Cada hook é isolado
- Use React DevTools para ver quando hooks executam
- Use `console.log` nos useEffect dos hooks

---

**Resultado**: De um componente monolítico de 202 linhas para um sistema modular, escalável e fácil de manter! 🎉
