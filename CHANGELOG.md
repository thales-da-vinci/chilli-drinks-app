# CHANGELOG - Chilli Drinks App

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

## FASE 2 - Implementação da Tela de Cadastro de TABS

- CHORE(GIP): Criação do CHANGELOG e registro do histórico da FASE 1.
- FEAT(Tabs): Implementação da Tela de Cadastro de TABS com componentes de formulário e lógica de QR Code/Código Manual.

## FASE 1 - Setup Inicial e Estabilização

- FEAT(Modals): Implementação do Modal Histórico de TABS e da Lógica de Saldo Dinâmico do Modal Gift Card.
- STYLE(Dashboard): Refinamento Visual da Dashboard (Cards com Sombra Vermelha e Barra de Progresso Dourada).
- FEAT(Branding): Implementação do Header da LP e Dashboard com Título e Links. FIX Crítico de Typography resolvido.
- FEAT(Base): Setup Inicial do Next.js, Material-UI, e Configuração do Tema CLARO.