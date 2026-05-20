# Filosofia de Design — vazglauco.github.io

## Conceito central

O site é uma **arte final interativa**, não apenas um portfólio. Cada decisão visual deve ter intenção — como um produto editorial de luxo que também é código. A estética une dois mundos que normalmente se excluem: a frieza técnica do desenvolvimento de software e a sensorialidade de uma peça gráfica bem construída.

---

## Identidade visual

### Paleta
- **Preto profundo:** `#0a0a0a` — não é preto puro. Tem textura.
- **Branco creme:** `#faf9f7` — não é branco puro. É papel.
- **Vermelho:** `red-500` (`#ef4444`) — o único acento. Usado com parcimônia como pontuação visual — literalmente: `.`, `()`, `[];`
- **Cinzas neutros:** para hierarquia de texto. Nunca alpha em elementos críticos (causa comportamento estranho com blend modes).

### Tipografia como código
Todos os elementos de identidade usam sintaxe de programação:
- Nome próprio → método: `glauco.vaz();`
- Localização → objeto literal: `{ location: "São Paulo, Brasil" }`
- Profissão → chamada de função: `software.engineer('full stack')`
- Descrição → comentários: `// transformando ideias em produtos digitais`
- Stack → array: `[ 'frontend', 'backend', 'cloud', 'aws' ]`

O vermelho aparece exclusivamente nos **símbolos de pontuação** da sintaxe (`.`, `(`, `)`, `;`, `[]`). Nunca em palavras.

### Naipe de cartas (♠ ♣ ♥ ♦)
Background animado com naipes em movimento lento — duas direções alternadas. Serve como textura viva sem competir com o conteúdo. Escuros (`♠♣`) no painel dark, vermelhos (`♥♦`) no painel light, ambos com opacidade muito baixa (~6-8%).

---

## Layout

### Split screen hero
A tela principal é dividida ao meio — metade preta, metade branca. É a decisão mais radical do site. Cria tensão visual e funciona como metáfora: código (dark) e produto (light), backend e frontend, técnica e arte.

A **carta de baralho** do Glauco Vaz fica centralizada exatamente na fronteira entre os dois mundos — sobreposta a ambos, pertencendo aos dois.

### Hierarquia dos painéis
- **Painel esquerdo (dark):** identidade pessoal — quem é, onde está, como contatar.
- **Painel direito (light):** identidade profissional — o que faz, há quanto tempo, com quê.

O painel esquerdo tem texto levemente maior que o direito — a identidade pessoal (nome, 6 chars) é mais proeminente que o título profissional (9+ chars, precisa de fonte menor para caber).

### Scroll
- **Horizontal:** apenas da Hero para o About — a transição mais importante, uma revelação.
- **Vertical:** todo o restante do site. Normal, sem truques.

---

## Header

### mix-blend-mode: difference
O header usa `mix-blend-mode: difference` aplicado no elemento `<header>` (não nos filhos). Isso inverte automaticamente as cores do texto em relação ao fundo — branco sobre preto vira branco, branco sobre branco vira preto. Zero JavaScript para controle de cor da navbar.

**Regra:** todo texto e ícone do header deve ser `text-white`. O blend mode cuida do resto.

### Scramble hover
Ao passar o mouse em qualquer item de navegação, o texto "embaralha" caracteres (`!<>-_/[]{}=+*^?#@$%~`) e revela o texto real da esquerda para a direita. É o único microinteraction do header — deve ser mantido.

### Posicionamento do menu mobile
O dropdown mobile fica **fora** do elemento `<header>` no DOM — senão herda o `mix-blend-mode` e fica transparente. Fundo sólido branco, `z-[9998]`.

---

## Carta de baralho (card)
A carta responde ao movimento do mouse com **tilt 3D** (`rotateX` / `rotateY`) calculado pela distância do cursor ao centro da carta. Máximo 45°. Transição suave de `0.15s ease-out`. É o único elemento com comportamento de mouse elaborado na hero — não adicionar outros para não competir.

---

## Princípios de composição

1. **Equilíbrio antes de impacto.** Tamanhos devem ser proporcionais entre si. Um elemento muito maior que os vizinhos destrói a composição, mesmo que individualmente pareça bonito.

2. **Textos secundários visíveis.** Labels mono (`location`, `since`, comentários, arrays) devem estar em `13px` no mínimo. Menor que isso desaparece — não existe hierarquia se um dos níveis é invisível.

3. **Quebras de linha com intenção.** Cada `<br />` ou `block` é uma decisão de design. Na hero direita: `software.` em uma linha, `engineer('full stack');` na outra — não mais que isso.

4. **Vermelho é pontuação, não destaque.** Nunca usar `text-red-500` em palavras completas. Apenas em `.`, `(`, `)`, `[]`, `;`. Se tudo é acento, nada é acento.

5. **Sem efeitos que competem.** A carta tem tilt. O header tem scramble. O about tem highlight por scroll. Cada seção tem um efeito — apenas um.

6. **Arte final tem que fechar.** Se a composição parece "quebrada" ou "esquisita", o problema quase sempre é proporção de tamanho ou alinhamento — não falta de elementos. Remover antes de adicionar.

---

## O que evitar

- Misturar tamanhos de fonte radicalmente diferentes dentro do mesmo bloco de heading (ex: `text-8xl` + `text-4xl` + `text-8xl`)
- Alpha em cores de elementos sobre blend modes (causa tons intermediários/cinza)
- Blur visível na fronteira do split screen (usar `blur(8px) contrast(20)` se necessário — não `blur(60px)`)
- Mais de um efeito de mouse por seção
- Fundos transparentes no menu mobile
- `max-w-lg` apertado com padding grande — favorece overflow em telas médias
