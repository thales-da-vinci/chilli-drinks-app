# CHANGELOG - Chilli Drinks App

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
