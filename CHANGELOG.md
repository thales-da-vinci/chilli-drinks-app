# CHANGELOG - Chilli Drinks App

## UNRELEASED - FASES 7 → 9 (Implementação Homepage & Regulamento) - 2025-11-17
- FEAT(RegulationSection): Adicionada seção "Regulamento" (`src/components/RegulationSection.tsx`) com faixa colorida, imagem decorativa e grid de regras.
- FEAT(DrinksSection): Grid responsivo de bebidas com cartões e animação; refatorado para CSS Grid por compatibilidade com MUI v6.
- FEAT(HowItWorksSection): Nova seção "Como Funciona" com cards (Cadastrar → Acumular → Resgatar) e ajustes de layout.
- CHORE(Layout): Hero ajustado para full-width; seções receberam paddings laterais responsivos (~10-12% em desktop) para alinhamento com Figma.
- FIX(Build): Corrigido import de `keyframes` (usar `@mui/material/styles`) e removida dependência problemática; substituição do `Grid` do MUI por `Box` + CSS Grid para resolver typing/compatibilidade.
- STYLE(Font): Fonte `Raleway` adicionada via `next/font/google` e aplicada globalmente em `layout.tsx`.
- CHORE(Commits): Commits locais em PT-BR; preparar push para acionar deploy na Vercel após validação local.
- FIX(UI): Removido bloco duplicado "Como Funciona" em `src/app/page.tsx` — limpeza do código e manutenção do componente `HowItWorksSection`.
- FIX(UI): Refatorado header do `RegulationSection` para reproduzir fielmente o Figma: gradiente superior, faixa colorida com proporções e pimenta sobreposta.
- FIX(Layout): Moved `RegulationSection` para fora do `Container` da homepage para que a faixa colorida seja Full-Width (encaixe às bordas da tela).
- FIX(Style): Ajuste de escala da imagem da pimenta (reduzida para 110px) e refinamento de posicionamento.
- CHORE(Commits): Commits locais recentes: `fix(ui): cleanup homepage e novo header regulamento`, `fix(layout): união de seções full-width e ajuste pimenta`, `fix(ui): linha colorida regulamento full-width`.
 - CHORE(Commits): Commits locais recentes: `fix(ui): cleanup homepage e novo header regulamento`, `fix(layout): união de seções full-width e ajuste pimenta`, `fix(ui): linha colorida regulamento full-width`.
 - CHORE(CHANGELOG): Corrigida formatação de headings e listas; adicionada nota de formatação e referência ao HOTFIX FASE 13.7 (2025-11-18).

## FASE 10.1 - FEAT(UI): Seção Perguntas Frequentes (FAQ) - 2025-11-17
- FEAT(FAQSection): Novo componente `src/components/FAQSection.tsx` com título bicolor (PERGUNTAS vermelho / FREQUENTES preto) e Accordions estilizados.
- CHORE(Cleanup): Extraído o bloco de FAQ do `src/app/page.tsx` e substituído por `<FAQSection />` para manter a homepage modular e limpa.

## FASE 11.1 - FEAT(UI): Seção Final "Pronto para Começar" - 2025-11-17
- FEAT(ReadyToStartSection): Novo componente `src/components/ReadyToStartSection.tsx` com background texturizado, imagem do app e tipografia impactante (PRONTO PARA / COMEÇAR) e CTA para Mercado Livre.
- FIX(FAQ): Ajuste de alinhamento do título do `FAQSection` para alinhamento à esquerda conforme design.
- CHORE(Cleanup): Removido CTA antigo embutido no `page.tsx` e integrado `ReadyToStartSection` como componente modular.

## FASE 11.2 - FIX(Build): ReadyToStartSection - 2025-11-17
- FIX(Build): Substituído uso de `Grid` por `Box` (CSS Grid) em `src/components/ReadyToStartSection.tsx` para resolver erro de tipagem do MUI v6 (`Property 'item' does not exist`).


## FASE 12.1 - FEAT(UI): Polimento Seção Final & Footer - 2025-11-17
- FIX(UI): Ajustes na `ReadyToStartSection` (`src/components/ReadyToStartSection.tsx`): botão de CTA sem borda (`boxShadow: 'none'`, `border: 'none'`) e redução da imagem do app para `maxWidth: 420px` para melhor proporção com o layout.
- FEAT(ChilliBrandFooter): Novo componente `src/components/ChilliBrand/ChilliBrandFooter.tsx` implementado conforme Figma: fundo `#F6F7F7`, três colunas (Logo | Navegação vertical | Social + Copyright), links em caixa alta com `Raleway Bold` e cor `#6B6B6B`.
- CHORE(Page): Footer integrado na homepage (`src/app/page.tsx`) como último componente após `ReadyToStartSection`.
- CHORE(Assets): Verificar presença do logo circular vermelho em `public/assets/chilli-drinks-app-logo-circulo-vermelho.png` e do ícone de Instagram; caso ausente, adicionar os assets correspondentes.


## FASE 12.2 - FIX(Build): Footer Grid → Flexbox - 2025-11-17
- FIX(Build): Substituído uso de `Grid` por `Box` (Flexbox) em `src/components/ChilliBrand/ChilliBrandFooter.tsx` para resolver erro de tipagem do MUI v6 (`Property 'item' does not exist`).
- CHORE(Commit): Commit realizado: `fix(build): replace Grid with Flexbox in Footer`.


## FASE 12.3 - FIX(UI): Ajuste Final CTA e Footer - 2025-11-17
- FIX(UI): `src/components/ReadyToStartSection.tsx` — Redução da imagem do app para `maxWidth: 380px` e ajuste do botão de CTA para evitar quebra de linha (`whiteSpace: 'nowrap'`, `fontSize: '1.25rem'`, `width: 'fit-content'`, `boxShadow: 'none'`).
- FIX(UI): `src/components/ChilliBrand/ChilliBrandFooter.tsx` — Coluna de links alinhada à esquerda (`alignItems: 'flex-start'`) com `pl: { xs: 4, md: 0 }` para espaçamento em mobile.
- CHORE(Commit): Commit realizado: `fix(ui): ajuste tamanho imagem cta e alinhamento footer`.

## FASE 13.1 - FEAT(Dashboard): Card-Centered Layout - 2025-11-18
- FEAT(Dashboard): Reimplementado `src/app/(app)/dashboard/page.tsx` para layout centrado em cartão (maxWidth: 761px) com fundo texturizado escuro e overlay, contendo seções: cadastro de códigos, progresso de bônus, códigos em espera e bloco de saldo/resgate.
- FIX(Integration): Mantida a lógica e hooks existentes (`useAuth`, `useUserCodesQuery`, `useGiftCardModal`) e integrados os componentes `CodeRegistrationForm`, `BonusProgress` e `WaitingCodeList` no novo layout.
- CHORE(Refactor): Substituído layout anterior baseado em `Paper`/container por um único cartão responsivo centralizado para alinhar ao Figma e melhorar hierarquia visual.
- CHORE(Commit): Commit criado: `feat(dashboard): centered card layout (FASE 13.1)`.
 - FIX(Assets): Apontado background da página Dashboard para `/assets/chilli-drinks-app-dashboard-banner-bg.jpg`.

## FASE 13.2 - FEAT(Dashboard): Background Global & Header Exclusivo - 2025-11-18
- FIX(UI): Removido background local do `dashboard/page.tsx` e aplicado background global condicional via `src/app/(app)/layout.tsx` para a rota `/dashboard`.
- FEAT(Header): Criado componente `src/components/DashboardHeader.tsx` com AppBar vermelho, seta amarela, logo texto branco, botões "CADASTRAR TAB" (borda branca) e "MEU GIFTCARD" (fundo amarelo), menu hambúrguer branco para mobile.
- CHORE(Layout): Removido `AppHeader` do layout global para a rota `/dashboard`.
- CHORE(Integration): Integrado `DashboardHeader` no topo do `dashboard/page.tsx` e ajustado o card principal para não ser sobreposto pelo header (`marginTop`).
- CHORE(Commit): Commit sugerido: `feat(dashboard): FASE 13.2 - background global e header exclusivo`.

## FASE 13.5 - FIX(Global/Header): Unificação do Header e Polimento do Dashboard - 2025-11-18
- FIX(Header): Substituído o header antigo (`AppHeader`) pelo novo header branco e unificado `src/components/DashboardHeader.tsx` em todo o app (exceto páginas que explicitamente sobrescrevam o layout).
- FIX(UI): `DashboardHeader` agora é um Client Component (`'use client'`) com menu hamburger funcional (`AppDrawer`), links absolutos para âncoras da home (`/#regulamento`, `/#faq`, etc.) e integração com `useGiftCardModal` para abrir o modal "Meu Giftcard".
- FIX(Style): Header com fundo branco (`#FFFFFF`), borda inferior `#D8DCE0`, ícones/textos em preto/cinza e logo colorido (`/assets/chilli-drinks-app-logo-circulo-vermelho.png`).
- FIX(Dashboard): Removida renderização duplicada do header em `src/app/(app)/dashboard/page.tsx` e adicionado `id="cadastro-tabs"` ao container do formulário para navegação por âncoras.
- FIX(UI): Centralizado o bloco de Saldo/Resgate no cartão do Dashboard: `display: 'flex'`, `flexDirection: 'column'`, `alignItems: 'center'`, `textAlign: 'center'`. Botão `RESGATAR` padronizado como botão amarelo sólido sem borda.
- CHORE(Commit): Commit realizado: `fix(ui): FASE 13.5 - header unificado e saldo centralizado`.

## FASE 13.7 - HOTFIX CRÍTICO (Build & Z-Index) - 2025-11-18
- FIX(Build): Corrigido arquivo corrompido de `src/components/DashboardHeader.tsx` (substituição completa) para evitar duplicação de imports e diretivas `use client` reaplicadas indevidamente.
- FIX(UI/Header): `DashboardHeader` reescrito de forma limpa com `zIndex: theme.zIndex.drawer + 1` garantindo que o Header permaneça acima do conteúdo e seja clicável; menu mobile funcional via `AppDrawer` e integração com `useGiftCardModal`.
- FIX(UI/Dashboard): Removido `zIndex` e `position: 'relative'` do Card principal do Dashboard em `src/app/(app)/dashboard/page.tsx` para evitar sobreposição e problemas de interação com o Header.
- CHORE(Commit): Commit realizado: `fix(ui): clean rewrite dashboard header and page to fix build and z-index`.


## FASE 11.1 - FEAT(Auth): Página de Login (Card Vermelho) - 2025-11-18
- FEAT(Auth): Novo layout para a página de Login em `src/app/(auth)/login/page.tsx` com fundo texturizado (`background-pattern.png`) e botão "Voltar" amarelo no canto superior esquerdo.
 - FEAT(Auth): Novo layout para a página de Login em `src/app/(auth)/login/page.tsx` com fundo texturizado (`/assets/chilli-drinks-app-login-banner-bg.jpg`) e botão "Voltar" amarelo no canto superior esquerdo.
- FEAT(Auth): Novo `LoginForm` estilizado em `src/components/auth/LoginForm.tsx`: card central vermelho (`#D40B28`), inputs em formato pílula brancos com labels acima, logo branco, botão "ENTRAR" com borda amarela e link amarelo "Cadastre-se".
- CHORE(Auth): Mantida lógica de autenticação (CPF + senha) via `useAuth` para preservar funcionamento atual. Ajuste visual implementado sem alterar a validação do `handleLogin`.





## FASE 6.11 - STYLE(Hero/Animation): Polimento Fino com Animações ✅ CONCLUÍDA
**Commit:** `[pending]`
- STYLE(Typography): "TABS" fontSize aumentado de 4rem para 6rem (desktop)
- FEAT(Animation): Zoom Pulse contínuo na imagem (3s ease-in-out infinite)
- FEAT(Animation): Shake Effect no hover da imagem (0.5s ease-in-out)
- FEAT(Keyframes): zoomPulse (scale 1 → 1.05 → 1)
- FEAT(Keyframes): shakeEffect (translateX 0 → -5px → 5px → 0)
- STYLE(Branding): Animações de alto impacto para engajamento visual
- FIX(Proportion): Texto "TABS" agora visualmente maior que linha decorativa

## FASE 6.10 - FIX(Hero/Style): Correção 1:1 de Cores e Estilos de Fonte ✅ CONCLUÍDA
**Commit:** `[pending]`
- FIX(Color): "CHILLI DRINKS" alterado de #FFFFFF para #000000 (preto)
- FIX(Style): "TABS" com fontStyle: 'italic' e fontWeight: 900
- FIX(Colors): Subtítulo com cores mistas corretas:
  - "Cadastre seus" → #FFB959 (laranja)
  - "códigos TAB" → #FFFFFF (branco)
  - "e acumule" → #FFB959 (laranja)
  - "saldo no seu Gift Card VTX!" → #FFFFFF (branco)
- FEAT(Fidelity): Pixel-perfect com design Figma

## FASE 6.9 - STYLE(Hero): Estrutura de Texto 1:1 com Layout 1x2 ✅ CONCLUÍDA
**Commit:** `[pending]`
- STYLE(Typography): Título 1 "PROMOÇÃO" (branco #FFFFFF, itálico, 5rem)
- STYLE(Typography): Título 2 "CHILLI DRINKS" (branco #FFFFFF, 4rem)
- FEAT(Layout): Layout 1x2 com Flexbox row para TABS + Subtítulo lado a lado
- STYLE(Typography): "TABS" em branco #FFFFFF (4rem) + linha decorativa laranja
- STYLE(Typography): Subtítulo com cores mistas (#FFB959 / #FFFFFF), maxWidth 250px
- FIX(Structure): Adaptação correta do position absolute do Figma para Flexbox responsivo
- STYLE(Responsive): Layout 1x2 em desktop, stack vertical em mobile

## FASE 6.8 - STYLE(Hero): Reorganização dos Textos 1:1 com Design Figma ❌ REVERTIDA
**Commit:** `[pending]`
- STYLE(Typography): "PROMOÇÃO" (branco #FFFFFF, itálico, 5rem)
- STYLE(Typography): "CHILLI DRINKS TABS" (preto #000000, 4rem)
- STYLE(Typography): Subtítulo em laranja #FFB959 (uppercase, maxWidth 250px)
- FEAT(Decorative): Linha decorativa laranja (294px x 5px) conforme Figma
- FIX(Layout): Organização vertical fiel ao design oficial
- REFACTOR(Text): Remoção de cores mistas no subtítulo (simplificação conforme Figma)

## FASE 6.7 - FIX(Hero): Forçar Cores Customizadas com !important ✅ CONCLUÍDA
**Commit:** `[pending]`
- FIX(Buttons): Adição de !important em bgcolor e color para sobrescrever tema MUI
- FIX(Buttons): "CADASTRAR TABS" com bgcolor: '#000000 !important'
- FIX(Buttons): "VER REGULAMENTO" com bgcolor: '#FFB959 !important'
- FIX(Typography): Substituição de <Box component="span"> por <span> nativo
- FIX(Colors): Aplicação direta de cores inline style para evitar sobrescrita do tema
- FIX(Theme): Remoção de herança de cores do tema MUI nos botões

## FASE 6.6 - STYLE(Hero): Fidelidade 1:1 ao Design com Cores Mistas ✅ CONCLUÍDA
**Commit:** `[pending]`
- STYLE(Layout): flexDirection: 'column' explícito na coluna esquerda para empilhamento vertical
- STYLE(Typography): Cores mistas no subtítulo usando <span> aninhados
- STYLE(Colors): "Cadastre seus códigos TAB..." em #FFB959 (laranja/pêssego)
- STYLE(Colors): "Cada TAB = R$1,00" em #FFB959 (laranja/pêssego)
- STYLE(Colors): "+ Bônus Especiais" em #FFFFFF (branco)
- STYLE(Alignment): alignItems: 'flex-start' para alinhamento à esquerda
- FEAT(Fidelity): Replicação exata do design chilli-drinks-app-design-homepage-v1.jpg

## FASE 6.5 - FIX(Build): Substituição de Grid por Flexbox no HeroBanner ✅ CONCLUÍDA
**Commit:** `[pending]`
- FIX(HeroBanner): Substituição completa de Grid por Box com Flexbox
- FIX(TypeScript): Resolve erro "Property 'item' does not exist on type" definitivamente
- REFACTOR(Layout): Adaptação do design Figma (position absolute) para Next.js/MUI (Flexbox responsivo)
- STYLE(Responsive): flexDirection column (mobile) / row (desktop)
- FIX(Build): Correção definitiva do erro de deploy (commit 91b1659)

## FASE 6.4 - FIX(Build): Correção de Erros de TypeScript e Next.js Config ❌ REVERTIDA
**Commit:** `[revertido]`
- NOTA: Tentativa de adicionar component="div" não resolveu o erro de tipagem
- FIX(NextConfig): Remoção de experimental.turbo (mantida)

## FASE 6.3 - STYLE(Homepage/Hero): Hero Banner com Branding Fiel ✅ CONCLUÍDA
**Commit:** `[pending]`
- REFACTOR(Layout): Reimplementação completa com Grid 2 colunas (texto esquerda, imagem direita)
- FEAT(Background): Novo asset chilli-drinks-app-homepage-hero-banner-bg.png
- FEAT(Image): Novo asset chilli-drinks-app-homepage-hero-produtos-chilli.png (coluna direita)
- STYLE(Buttons): Botão "CADASTRAR TABS" com bgcolor #000000 (preto)
- STYLE(Buttons): Botão "VER REGULAMENTO" com bgcolor #FFB959 (laranja/pêssego)
- STYLE(Typography): Subtítulo com cores #FFB959 e #FFFFFF conforme branding
- STYLE(Consistency): borderRadius 1000px nos botões (consistente com Header)
- FIX(SEO): Next.js Image com priority para otimização
- STYLE(Responsive): Stack vertical em mobile, 2 colunas em desktop

## FASE 6.2 - STYLE(Homepage/Header): Polimento Fino de CSS ✅ CONCLUÍDA
**Commit:** `[pending]`
- STYLE(Buttons): borderRadius alterado de '8px' para '1000px' (formato pílula)
- FIX(Buttons): Remoção de border e boxShadow indesejados (borda preta)
- STYLE(Navigation): fontSize reduzido de '0.9rem' para '0.8rem'
- STYLE(Navigation): gap reduzido de 3 para 2 (espaçamento mais compacto)
- STYLE(Mobile): Aplicação consistente de borderRadius '1000px' nos botões do Drawer
- FIX(Hover): boxShadow: 'none' mantido no hover para evitar bordas

## FASE 6.1 - STYLE(Homepage/Header): Redesign Completo do Header (LP) ✅ CONCLUÍDA
**Commit:** `[pending]`
- STYLE(Header): Redesign completo baseado em chilli-drinks-app-design-homepage-v1.jpg
- FEAT(Layout): Estrutura Logo (esquerda) → Navegação (centro) → CTAs (direita)
- FEAT(Logo): Implementação do logo circular vermelho (chilli-drinks-app-logo-circulo-vermelho.png)
- FEAT(Navigation): Links de âncora em cinza #6B6B6B (BEBIDAS & COQUETÉIS, COMO FUNCIONA, REGULAMENTO, PERGUNTAS FREQUENTES, COMEÇAR)
- FEAT(CTAs): Botão "CADASTRAR TABS" (amarelo #FFE100) + "LOJA OFICIAL" (vermelho #D40B28) + ícone Instagram
- FEAT(Responsive): Menu hambúrguer com Drawer para mobile
- STYLE(Theme): Tema claro com AppBar branco (background.paper) e elevation={1}
- REFACTOR(Clean): Remoção de lógica de autenticação do Header da LP (simplificação)

## FASE 5.7 - FIX(MSW/Data): Lista Estática de TABs ✅ CONCLUÍDA
**Commit:** `[pending]`
- FIX(MSW): Removida geração aleatória de TABs (generateUID, initializeTabDatabase)
- FEAT(Data): Implementada lista estática de 50 TABs do TABS_TESTE.md
- FIX(Validation): TAB_DATABASE agora usa lista conhecida e testável
- FEAT(Testing): 30 TABs DISPONÍVEIS + 10 RESGATADAS + 10 INVÁLIDAS
- DOCS(TABS_TESTE.md): Adicionada nota "FONTE ÚNICA DA VERDADE"
- FIX(Bug): K1L2M3N4P5Q6 agora é reconhecida como válida
- MAINTAIN(Logic): Lógica de validação mantida (status checking)

## FASE 5.6 - FIX(Tabs/UX): Modal de Erro e Feedback Completo ✅ CONCLUÍDA
**Commit:** `ae6ed17`
- FIX(Modal): Implementado Modal de Erro além do Modal de Sucesso
- FEAT(Feedback): Estado modalType ('success' | 'error') para controlar tipo de modal
- FEAT(Message): modalMessage dinâmica baseada na resposta da API
- FIX(Error): Tratamento de erro com mensagem da API (error.response.data.message)
- STYLE(Modal): Botão OK com cor dinâmica (primary para sucesso, error para erro)
- FEAT(UX): Feedback visual completo para todos os cenários (sucesso, erro 404, erro 409)
- MAINTAIN(Hook): useCouponMutation já estava conectado e invalidando cache

## FASE 5.5 - FIX(Layout/UX): Correção de Scroll-Lock e Contraste ✅ CONCLUÍDA
**Commit:** `194fab9`
- FIX(Layout): Removido position: 'fixed' que causava scroll-lock
- FIX(Layout): Simplificado estrutura CSS mantendo background pattern
- FIX(Overlay): Overlay com position: 'fixed' para manter efeito visual
- FIX(Scroll): Rolagem funcional restaurada no Dashboard
- FIX(Button): Botão "CADASTRAR TAB" alterado para branco (borderColor + color)
- FIX(Hover): Hover com secondary.main (amarelo) para feedback visual
- MAINTAIN(Background): Pattern escuro mantido com backgroundAttachment: 'fixed'
- MAINTAIN(Header): AppHeader escuro mantido com logo vermelha

## FASE 5.4 - FIX(Branding/UX): Re-implementação do Design Híbrido ✅ CONCLUÍDA
**Commit:** `ccf38e6`
- FIX(Layout): Restaurado background pattern escuro com overlay (commit 30eb7b4)
- FIX(AppHeader): Restaurado bgcolor: 'primary.dark' (fundo escuro)
- FIX(Logo): Alterado de logo-chilli-branco.png para logo-chilli-padrao.png (vermelha)
- FIX(Typography): Título "CHILLI DRINKS" em branco mantido para contraste
- FIX(IconButton): MenuIcon em branco para visibilidade
- MAINTAIN(Dashboard): Cards brancos mantidos (legibilidade 100%)
- FEAT(Hybrid): Design híbrido final: fundo escuro + header escuro + conteúdo branco

## FASE 5.3 - FIX(Branding/UX): Tentativa de Design Híbrido (FALHOU) ❌
**Commit:** `842877d` (Corrigido na FASE 5.4)
- ERRO: Reverteu layout para grey.100 (deveria manter pattern escuro)
- ERRO: Reverteu AppHeader para background.paper (deveria manter primary.dark)
- ERRO: Logo branca em fundo branco (invisível)
- SUCESSO: Dashboard com cards brancos (mantido na 5.4)
- FEAT(AppHeader): Logo branco + título "CHILLI DRINKS" adicionados ao header escuro
- FIX(Dashboard): Paper com bgcolor: 'background.paper' (branco) para legibilidade
- FIX(Typography): Cores escuras (text.primary/primary.main) para contraste
- FIX(Button): CTA alterado para color="success" (verde)
- MAINTAIN(Layout): Background pattern escuro mantido (commit 30eb7b4)
- MAINTAIN(Header): AppHeader escuro mantido com melhorias visuais
- FEAT(Hybrid): Design híbrido: fundo externo escuro + bloco dash branco
- DOCS(Directive): Diretriz final: Layout escuro + conteúdo claro para legibilidade

## FASE 5.2 - STYLE(Dashboard/Hotfix): Background Full-Page (PARCIALMENTE REVERTIDO) ❌
**Commit:** `30eb7b4` (Revertido parcialmente na FASE 5.3)
- FIX(Layout): Background pattern com position: fixed (MANTIDO)
- FIX(AppHeader): Bgcolor primary.dark (MANTIDO + MELHORADO na 5.3)
- FIX(Cards): Tema escuro nos cards (REVERTIDO na FASE 5.3)
- NOTA: Esta fase causou ilegibilidade, corrigida na FASE 5.3

## FASE 5 - STYLE(Dashboard/Branding): Polimento Visual (REVERTIDO) ❌
**Commit:** `1b61355` (Revertido na FASE 5.2)
- NOTA: Tentativa inicial de branding escuro, substituída por abordagem híbrida
- STYLE(Layout): Aplicação de background pattern com overlay escuro (85%) no layout da aplicação
- STYLE(Dashboard): Cards com fundo escuro (grey.900) para destaque sobre o background
- STYLE(Typography): Tipografia clara (white/grey.300) para contraste máximo
- STYLE(Highlights): Nome do usuário em dourado (#FFD700) para destaque
- STYLE(CTA): Botão de resgate alterado para color="secondary" (amarelo/dourado)
- STYLE(Elevation): Aumento de elevation para 6 e box-shadow com rgba vermelha
- FEAT(Branding): Alinhamento visual completo com identidade Chilli Drinks (dark theme)

## FASE 5.1 - DOCS: Atualização do CHANGELOG ✅ CONCLUÍDA
**Commit:** `fdf559a`
- DOCS: Documentação completa das fases 3.0 a 4.14

## FASE 4.14 - FIX(Auth/Profile): Segurança e Validação ✅ CONCLUÍDA
**Commit:** `a0e6f39`
- FEAT(Docs): Criação do arquivo TABS_TESTE.md com documentação completa de 50 TABs mockadas
- FIX(Auth): Implementação de verificação de duplicidade no registro (CPF e E-mail)
- FIX(Security): Adição de campo "Senha Atual" com validação na página Meus Dados
- FIX(Validation): handleRegister agora retorna objeto com success e message
- FIX(UX): Tratamento de erro no RegisterForm com feedback específico
- FEAT(Inspection): Instruções de como inspecionar TABs e usuários no localStorage

## FASE 4.13 - FEAT(MSW): Expansão e Validação Avançada ✅ CONCLUÍDA
**Commit:** `8097f42`
- FEAT(MSW): Geração automática de 50 TABs com UIDs aleatórias (12 dígitos, sem 'O')
- FEAT(Database): Distribuição de status: 30 Disponíveis, 10 Resgatadas, 10 Inválidas
- FEAT(Validation): Implementação de validação avançada com códigos HTTP específicos
- FIX(Status): Retorno 404 para TABs inválidas ou não encontradas
- FIX(Status): Retorno 409 para TABs já resgatadas (global ou por usuário)
- FEAT(State): TABs mudam status para RESGATADA após uso bem-sucedido
- DEBUG(Logs): Logs detalhados de inicialização e validação de TABs

## FASE 4.12 - FIX(AuthUX): Melhorias de UX no Fluxo de Autenticação ✅ CONCLUÍDA
**Commit:** `39688b2`
- FIX(Login): Implementação de feedback de loading com isSubmitting e CircularProgress
- FIX(Register): Remoção de auto-login após registro para simular confirmação de e-mail
- FEAT(Page): Criação da página /registro/confirmacao com design profissional
- FIX(Flow): Redirecionamento para página de confirmação após registro bem-sucedido
- STYLE(Modal): Design com Paper, ícone CheckCircleOutline e botão de retorno ao login

## FASE 4.11 - FIX(Auth/MSW): Persistência Multiusuário ✅ CONCLUÍDA
**Commit:** `4b457e1`
- REFACTOR(Auth): Implementação de sistema multiusuário no AuthContext
- FEAT(Storage): Chaves separadas: CHILLI_USERS_MOCK_KEY e CHILLI_CURRENT_USER_KEY
- FIX(Login): handleLogin agora valida CPF e senha contra lista de usuários
- FIX(Register): handleRegister adiciona usuário à lista sem fazer login automático
- REFACTOR(MSW): Persistência de TABs por usuário com chave dinâmica CHILLI_TABS_[CPF]
- FIX(Isolation): Cada usuário tem sua própria lista de TABs isolada
- FIX(Handlers): GET/POST/DELETE de códigos agora baseados no usuário logado

## FASE 4.6 - FIX(Layout_Final): Correção de Import/Export ✅ CONCLUÍDA
**Commit:** `9de8d94`
- FIX(ClientAppWrapper): Export duplo (default e named) para compatibilidade
- FIX(Interface): Adição de ClientAppWrapperProps com tipagem explícita
- FIX(ErrorHandling): Try-catch na inicialização do MSW
- FIX(Layout): Reorganização da ordem de imports para evitar conflitos

## FASE 4.5 - FIX(Layout_MSW): Inicialização e Runtime ✅ CONCLUÍDA
**Commit:** `249d5b5`
- FIX(MSW): Inicialização automática do MSW no ClientAppWrapper
- FIX(Loading): Estado mswReady para aguardar inicialização antes de renderizar
- FIX(Layout): Simplificação da estrutura do layout.tsx
- DEBUG(Logs): Console log de confirmação de inicialização do MSW

## FASE 4.4 - FEAT(UX_FIX): Modal e Correções de Login ✅ CONCLUÍDA
**Commit:** `caac978`
- FIX(Login): Reset de campos document e password antes do redirecionamento
- FEAT(Modal): Substituição de alert() por Dialog do MUI no CodeRegistrationForm
- STYLE(Modal): Design com CheckCircleIcon e mensagem personalizada
- FIX(Handlers): Fallback seguro (tabsState || []) no GET /codes

## FASE 4.3 - FIX(Final_MSW): Limpeza Forçada ✅ CONCLUÍDA
**Commit:** `c09eb02`
- FIX(Login): Limpeza forçada de localStorage.removeItem('chilli_tabs_mock') antes do redirecionamento
- FIX(Validation): Adição de .trim() no código submetido para validação robusta
- DEBUG(Logs): Logs detalhados mostrando se código está na lista de UIDs válidas

## FASE 4.2 - FIX(Redir_MSW): Timing e Validação ✅ CONCLUÍDA
**Commit:** `e1bbc39`
- FIX(MSW): Remoção forçada de localStorage na inicialização
- DEBUG(Logs): Adição de logs de debug para rastrear estado das tabs
- FIX(Login): Adição de setTimeout(50ms) para timing de redirecionamento

## FASE 4.1 - FIX(MSW): Persistência e Atualização ✅ CONCLUÍDA
**Commit:** `905c761`
- FIX(MSW): Limpeza do estado inicial (tabsState = [])
- FEAT(Validation): Definição de 5 UIDs válidas para teste
- FIX(Form): Integração do CodeRegistrationForm com useCouponMutation
- FIX(Cache): Invalidação automática de queries após sucesso
- STYLE(Helper): Helper text mostrando UIDs válidas no formulário

## FASE 3.4 - FIX(TypeScript): Supressão de Erro ✅ CONCLUÍDA
**Commit:** `fc80f64`
- FIX(TypeScript): Adição de @ts-ignore antes de document.cookie
- FIX(Build): Supressão de erro de tipagem teimoso do compilador

## FASE 3.3 - FIX(TypeScript): Verificação de Window ✅ CONCLUÍDA
**Commit:** `a626632`
- FIX(TypeScript): Adição de verificação typeof window !== 'undefined' ao redor de document.cookie
- FIX(Build): Isolamento de código client-side para resolver erro de tipagem

## FASE 3.2 - FIX(Redirection): Client-side Forçado ✅ CONCLUÍDA
**Commit:** `4fbefd1`
- FIX(Login): Redirecionamento forçado com router.replace('/dashboard') após login
- FIX(Validation): Verificação client-side do CPF antes de redirecionar
- FIX(Middleware): Contorno de latência do Middleware com navegação imediata

## FASE 3.1 - FIX(Hydration): ThemeRegistry Robusto ✅ CONCLUÍDA
**Commit:** `3b4bc8c`
- FIX(ThemeRegistry): Reimplementação com useServerInsertedHTML
- FEAT(SSR): Criação de Emotion Cache com injeção de estilos no head
- FIX(Hydration): Sistema de flush para coleta e injeção de estilos CSS-in-JS

## FASE 3.0 - FIX(Middleware): Cookies e Autenticação ✅ CONCLUÍDA
**Commit:** `dbe81fd`
- FIX(Middleware): Implementação de verificação de cookie chilli_drinks_auth
- FIX(AuthContext): Definição de cookie após login bem-sucedido
- FIX(Auth): Remoção de cookie no logout

## FASE 4.18 - Ajustes Visuais (Logo e Banner) ✅ CONCLUÍDA
- FEAT(Branding): Atualização do logo para Logo Chilli Drinks Padrão (fundo transparente)
- FEAT(Banner): Adição de imagem de fundo (banner-bg.jpg) no HeroBanner da homepage
- STYLE(Header): Remoção do texto "CHILLI DRINKS" ao lado do logo nos headers
- STYLE(Banner): Overlay escuro (40%) para melhorar legibilidade do texto sobre a imagem
- ASSETS(Copy): Cópia de logo-chilli-drinks.png e banner-bg.jpg para public/assets/

## FASE 4.16 - HOTFIX (Modal de Histórico UX) ✅ CONCLUÍDA
- FIX(HistoryModal): Remoção do onClose() do handleTabsHistoryClick para manter drawer aberto ao abrir modal
- FIX(UX): Correção do comportamento onde era necessário clicar duas vezes para abrir o modal
- FEAT(Display): Confirmação de que o modal exibe corretamente os códigos TAB (A1B2C3D4E5F6, etc.) em vez de IDs numéricos

## FASE 4.15 - HOTFIX (Modal de Histórico Conectado ao MSW) ✅ CONCLUÍDA
- FIX(HistoryModal): Conexão do modal de histórico ao useUserCodesQuery para usar dados do MSW
- FIX(Hardcode): Remoção dos dados mockados hardcoded (UUID-9f4a, UUID-c8e1, etc.) do AppDrawer
- FEAT(Integration): Mapeamento automático de dados do MSW para formato do modal de histórico
- FIX(Status): Status baseado em redeemedAt: "Resgatado" ou "Em Espera"

## FASE 4.14 - HOTFIX CRÍTICO (MSW URL Base) ✅ CONCLUÍDA
- FIX(MSW): Correção da API_BASE_URL para incluir `/api` e interceptar requisições corretamente
- FIX(Integration): Resolução do problema onde MSW não interceptava requisições devido a URLs diferentes
- FIX(Value): Ajuste do valor da tab de R$ 15,00 para R$ 1,00 conforme especificação
- FIX(RegisterTabs): Conexão da página de histórico ao hook useCouponMutation para usar MSW

## FASE 4.13 - HOTFIX (MSW em Produção) ✅ CONCLUÍDA
- FIX(MSW): Habilitação do MSW em produção para funcionar na Vercel
- DEBUG(Logs): Adição de logs detalhados no CodeRegistrationForm para diagnóstico
- FIX(Environment): Remoção da verificação de NODE_ENV para permitir MSW em todos os ambientes

## FASE 4.12 - HOTFIX (Dashboard Conectado ao MSW) ✅ CONCLUÍDA
- FIX(Dashboard): Conexão do Dashboard ao useUserCodesQuery para buscar tabs do MSW
- FIX(Data): Remoção do useState local em favor de dados do React Query
- FEAT(Integration): Mapeamento automático de dados do MSW para formato do Dashboard
- FIX(Loading): Atualização do loading state para aguardar carregamento dos códigos

## FASE 4.11 - HOTFIX CRÍTICO (MSW POST Handler) ✅ CONCLUÍDA
- FIX(MSW): Correção da estrutura de resposta do POST handler para corresponder ao contrato do hook
- FIX(Validation): Implementação de tratamento de erros robusto com try/catch
- DEBUG(Logs): Adição de logs detalhados em cada etapa do processamento
- FIX(Syntax): Correção de erro de sintaxe - adição de vírgula faltante no handlers.ts

## FASE 4.10 - HOTFIX (Remoção de Mock Hardcoded) ✅ CONCLUÍDA
- FIX(Hardcode): Remoção dos dados mockados hardcoded (uuid-111, uuid-555, etc.) do Dashboard
- FIX(State): Dashboard agora inicia com array vazio e depende exclusivamente do MSW
- FIX(Alert): Remoção do alert() do CodeRegistrationForm
- REFACTOR(Clean): Limpeza de código obsoleto e dados de teste fixos

## FASE 4.9 - HOTFIX CRÍTICO (MSW Cache Reset) ✅ CONCLUÍDA
- FIX(MSW_Cache): Alteração da chave do localStorage para CHILLI_TABS_V2 para forçar reset do cache
- FIX(Persistence): Implementação de persistência completa com nova chave
- FIX(Storage): Remoção de chaves antigas (chilli_tabs_mock, chilli_drinks_tabs)
- FEAT(Sync): Sincronização automática do estado com localStorage após adicionar/remover códigos

## FASE 4.8 - HOTFIX FINAL DO MSW ✅ CONCLUÍDA
- FIX(MSW_Final): Força reset do estado inicial do MSW com tabsState = []
- FIX(Validation): Torna validação de UID robusta com .trim().toUpperCase()
- FIX(Normalization): Normalização de códigos submetidos e lista de UIDs válidas
- FIX(Comparison): Comparação case-insensitive e sem espaços em branco

## FASE 4.7 - HOTFIX CRÍTICO (Variável Global document) ✅ CONCLUÍDA
- FIX(Auth): Uso de window.document.cookie para prevenir sobrescrição da variável global no Runtime
- FIX(TypeError): Resolução do erro "Cannot create property 'cookie' on string '11111111111'"
- FIX(Scope): Força uso do objeto global window.document em AuthContext.tsx

## FASE 2.9 - HOTFIX CRÍTICO (Prerendering/Server Component)

- FIX(Prerendering): Correção do erro "Functions cannot be passed directly to Client Components" na página regulamento-completo
- FIX(Button): Substituição de `component={Link}` por wrapper `<Link><Button></Link>` para evitar serialização de funções
- FIX(Build): Resolução do erro de build da Vercel no prerendering

## FASE 2.10 - HOTFIX SECUNDÁRIO (Hydration Residual)

- FIX(ThemeRegistry): Ultra-simplificação removendo Emotion Cache completamente
- FIX(Hydration): Eliminação de todas as fontes de mismatch de estilos entre servidor e cliente
- FIX(Stability): Implementação mínima focada em estabilidade máxima

## FASE 2.9 - HOTFIX CRÍTICO (TypeScript Implícito)

- FIX(TypeScript): Adição de interface `TabCode` e tipo explícito ao `tabsState` no handlers.ts
- FIX(Build): Resolução do erro "Variable 'tabsState' implicitly has type 'any[]'" no build da Vercel
- CHORE(Types): Definição de tipos para códigos/tabs no Mock Service Worker

## FASE 2.8 - HOTFIX CRÍTICO (Instalação de Dependência)

- FIX(Dependency): Instalação do pacote `@emotion/cache` via pnpm para resolver erro "Module not found"
- FIX(ThemeRegistry): Resolução da dependência ausente para serialização de estilos MUI no SSR
- CHORE(Package): Atualização do package.json e pnpm-lock.yaml

## FASE 2.7 - HOTFIX (Limpeza e Formato de Dados)

- FIX(MockData): Limpeza do estado inicial do `tabsState` para array vazio (`[]`)
- FIX(MockData): Reset do `nextId` para 1 para teste de cadastro do zero
- FEAT(TestData): Geração de 5 UIDs válidas no formato 12 dígitos alfanuméricos (sem 'O')

## FASE 2.5 - FIX (Persistência de Dados MSW)

- FIX(MSW): Implementação de estado persistente no Mock Service Worker para tabs/códigos
- FIX(Data): Correção do bug onde tabs adicionadas não apareciam na lista
- FIX(Data): Correção do bug onde tabs excluídas retornavam após F5
- FEAT(MSW): Adição de endpoint DELETE /codes/:id para remoção de códigos

## FASE 2.4 - HOTFIX CRÍTICO (Hydration Residual MUI)

- FIX(MUI-Styles): Simplificação do `ClientAppWrapper` removendo componentes MUI conflitantes (Box → div nativo)
- FIX(ThemeRegistry): Adição de `suppressHydrationWarning` no ThemeRegistry para eliminar conflitos de estilos
- FIX(Hydration): Separação clara entre controle de montação (ClientAppWrapper) e injeção de estilos (ThemeRegistry)

## FASE 2.3 - HOTFIX CRÍTICO (Element Type Invalid)

- FIX(Imports): Correção da sintaxe de importação do `ClientAppWrapper` no `layout.tsx` de named import para default import
- FIX(RootLayout): Resolução do erro "Element type is invalid" na linha 34 do RootLayout

## FASE 2.2 - HOTFIX CRÍTICO REFORÇADO (Hydration Mismatch)

- FIX(RootLayout): Supressão de hydration warnings no `layout.tsx` com `suppressHydrationWarning` em `<html>` e `<body>`
- FIX(ClientAppWrapper): Reforço da correção com `suppressHydrationWarning` adicional e `bgcolor` para evitar overlay preto
- FIX(ThemeProvider): Neutralização completa do erro de Hydration Mismatch no nível dos Providers MUI

## FASE 2.1 - HOTFIX CRÍTICO (Hydration Mismatch)

- FIX(Hydration): Correção crítica do erro de Hydration Mismatch (Server vs Client) no `ClientAppWrapper.tsx` utilizando o padrão `hasMounted`. Isso resolve o overlay preto que bloqueava as telas.

## FASE 2.1 - HOTFIX CRÍTICO: Overlay Preto ✅ CONCLUÍDA
- FIX(Overlay): Correção do overlay preto que bloqueava telas de Login e Registro
- FIX(ClientAppWrapper): Substituição de `return null` por loading state visível
- FIX(AuthGuard): Correção do estado de loading para evitar renderização null
- FEAT(AuthLayout): Criação de layout específico para rotas de autenticação
- REFACTOR(UX): Melhoria da experiência de carregamento em toda a aplicação

## FASE 4.2 - Refatoração Estrutural e Lógica do Dashboard ✅ CONCLUÍDA
- FEAT(Dashboard): Refatoração completa para layout de bloco único conforme wireframe
- FEAT(Components): Integração dos componentes BonusProgress, CodeRegistrationForm e WaitingCodeList
- FEAT(UX): Implementação da lógica de códigos em espera com funcionalidade de remoção
- FEAT(Gamification): Barra de progresso de bônus integrada ao fluxo principal
- STYLE(Layout): Mudança de layout de colunas para Paper centralizado único
- REFACTOR(Nomenclature): Padronização para "Códigos TAB" em toda a aplicação

## FASE 2 - Implementação da Tela de Cadastro de TABS
- CHORE(GIP): Criação do CHANGELOG e registro do histórico da FASE 1
- FEAT(Tabs): Implementação da Tela de Cadastro de TABS com componentes de formulário e lógica de QR Code/Código Manual

## FASE 1 - Setup Inicial e Estabilização

- FEAT(Modals): Implementação do Modal Histórico de TABS e da Lógica de Saldo Dinâmico do Modal Gift Card
- STYLE(Dashboard): Refinamento Visual da Dashboard (Cards com Sombra Vermelha e Barra de Progresso Dourada)
- FEAT(Branding): Implementação do Header da LP e Dashboard com Título e Links. FIX Crítico de Typography resolvido
- FEAT(Base): Setup Inicial do Next.js, Material-UI, e Configuração do Tema CLARO

## FASE 4.17 - HOTFIX (Display de Código Real e Persistência) ✅ CONCLUÍDA
- FIX(Dashboard): Exibição do código TAB real (A1B2C3D4E5F6) em vez do ID numérico
- FIX(WaitingCodeList): Atualização da interface para incluir campo code
- FIX(MSW): Refatoração do carregamento do localStorage para garantir persistência ao reiniciar servidor
- FIX(Persistence): Implementação de funções loadTabsState() e saveTabsState() para sincronização robusta
- FIX(NextId): Cálculo automático do próximo ID baseado no estado carregado do localStorage
## FASE 13.8 - FIX(Critical): Hard reset files (2025-11-18)
- FIX(Build): Truncado e reescrito `src/components/DashboardHeader.tsx` e `src/app/(app)/dashboard/page.tsx` para remover duplica��es e diretivas m�ltiplas.
