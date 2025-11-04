# 🔐 Credenciais para Teste - Chilli Drinks App

## ✅ HOTFIX APLICADO - Mock de Login Corrigido

O problema de incompatibilidade entre Frontend (CPF) e Mock (email) foi **RESOLVIDO**.

### 📋 Credenciais de Teste Válidas

Para testar o login com sucesso, use:

- **CPF:** `11111111111` (sem formatação)
- **Senha:** `senha123`

### 🎯 Como Testar

1. Acesse: `http://localhost:3000/login`
2. Digite o CPF: `111.111.111-11` (a máscara será aplicada automaticamente)
3. Digite a senha: `senha123`
4. Clique em "Entrar"

### ✅ Resultado Esperado

- Login bem-sucedido
- Redirecionamento automático para o dashboard
- Mock retorna usuário: "Usuário Demo"

### 🔧 O que foi Corrigido

- Mock agora aceita campo `cpf` em vez de `email`
- Credenciais de teste definidas e sincronizadas
- Estrutura de hooks reorganizada em `src/hooks/auth/`

### 📝 Notas Técnicas

- O MSW (Mock Service Worker) intercepta as chamadas da API automaticamente
- Quando o backend real estiver rodando, os mocks serão desabilitados automaticamente
- Base URL da API: `http://localhost:3001/api`