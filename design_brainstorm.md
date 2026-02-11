# Brainstorming: Portfólio de Profissional de TI Sênior

## Abordagem 1: "The Architect" (Minimalismo Estrutural)
- **Design Movement:** Brutalismo Suíço Contemporâneo
- **Core Principles:**
  1. Clareza absoluta: Tipografia domina, imagens são secundárias.
  2. Grelha visível: Linhas finas separam seções (bento grid explícito).
  3. Monocromático com um único acento forte (laranja segurança ou amarelo industrial).
- **Color Philosophy:** Fundo "Off-White" ou Cinza Concreto muito claro. Transmite solidez, experiência e franqueza.
- **Layout:** Grid rígido, assimétrico. Texto grande, alinhado à esquerda.
- **Signature Elements:**
  1. Números grandes indexando seções (01, 02, 03).
  2. Linhas divisórias que se animam ao scroll.
- **Probabilidade:** 0.3

## Abordagem 2: "Deep System" (Cyberpunk Executivo)
- **Design Movement:** High-Tech Dark Mode / Glassmorphism Refinado
- **Core Principles:**
  1. Profundidade: Camadas translúcidas sobre fundos abstratos.
  2. Luz como guia: Brilhos sutis indicam interatividade.
  3. Dados como decoração: Snippets de código, grafos ou terminais estilizados.
- **Color Philosophy:** Fundo quase preto (Navy profundo), com gradientes de ciano e roxo (o "padrão tech", mas executado com elegância, não gamer).
- **Layout:** Flutuante. Cards com efeito de vidro fosco (glassmorphism).
- **Signature Elements:**
  1. Fundo com malha de gradiente animada (mesh gradient) lenta e hipnótica.
  2. Cards com bordas brilhantes sutis.
  3. Terminal interativo como easter egg.
- **Probabilidade:** 0.5

## Abordagem 3: "The Visionary" (Futurismo Orgânico)
- **Design Movement:** Solarpunk / Organic Tech
- **Core Principles:**
  1. Fluidez: Formas arredondadas, transições suaves.
  2. Conexão Humana: Foco em como a tecnologia impacta pessoas.
  3. Movimento constante: Nada está 100% estático.
- **Color Philosophy:** Tons de terra digitais (verde musgo profundo, areia, cobre).
- **Layout:** Scroll contínuo, sem quebras bruscas. Elementos que entram em paralaxe.
- **Signature Elements:**
  1. Tipografia serifada moderna para títulos (trazendo humanidade).
  2. Formas orgânicas (blobs) que morfam ao fundo.
- **Probabilidade:** 0.2

---

## Escolha Final: Abordagem 2 - "Deep System" (Cyberpunk Executivo)

**Justificativa:** O perfil do usuário é "TI Sênior", "Mão na massa", "Gestão", "Infraestrutura". A estética Dark Mode sofisticada comunica tecnicidade e modernidade (o que ele pediu: "inovador", "design moderno"). É a linguagem visual que recrutadores e clientes de alto nível em TI esperam de um "arquiteto de soluções". O uso de Glassmorphism e Bento Grid (tendências 2025/2026) atende ao pedido de "inovação".

### Definições de Estilo para Implementação:
- **Fonte Título:** 'Space Grotesk' (Tecnológica, mas legível e moderna).
- **Fonte Corpo:** 'Inter' ou 'Plus Jakarta Sans' (Leitura perfeita em UI).
- **Cores:**
  - Background: `#0f172a` (Slate 950 - Profundo, profissional).
  - Cards: `rgba(30, 41, 59, 0.7)` (Slate 800 com transparência).
  - Acento Principal: `#38bdf8` (Sky 400 - Ciano elétrico).
  - Acento Secundário: `#818cf8` (Indigo 400 - Profundidade).
- **Assets:**
  - Hero: `hero-gradient-mesh.jpeg` (já gerado) com overlay de vidro.
  - Background Seções: `section-pattern.jpeg` (já gerado) com opacidade reduzida.
  - Ícones: `lucide-react` (clean, thin stroke).

**Plano de Execução Visual:**
1.  **Hero:** Imagem mesh no fundo, título enorme com gradiente de texto, card de "Resumo Direto" flutuando com glassmorphism.
2.  **Sobre:** Bento Grid layout. Um card para "Quem sou", outro para "Diferencial", outro para "Trajetória".
3.  **Skills:** Cards interativos que brilham ao hover. Separados por categorias (Backend, Frontend, Infra, Gestão).
4.  **Experiência:** Linha do tempo vertical ou carrossel de cards.
5.  **Animações:** `framer-motion` para entrada suave de elementos (fade-up) e brilhos nos cards.
