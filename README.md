# 🌶️ Chilli Drinks App - Frontend (Plataforma de Resgate de Cupons)

Este repositório contém o código-fonte completo do Frontend da plataforma de resgate de cupons da Chilli Drinks, desenvolvido com **Next.js (App Router)** e **Material UI (MUI)**.

**Status de Entrega:** **FASE 3 - COMPLETO (Frontend-First)**
O Frontend está 100% funcional, utilizando **Mock Service Worker (MSW)** para simular o Backend. O código está pronto para ser "plugado" na API real do servidor.

---

## 🛠️ Stack Tecnológica

* **Framework:** Next.js (v16.0.1, App Router)
* **Linguagem:** TypeScript
* **Estilização/UI:** Material UI (MUI)
* **Gerenciamento de Estado/Dados:** TanStack Query
* **Forms:** React Hook Form + Zod
* **Testes/Mocks:** Mock Service Worker (MSW)

---

## ⚙️ Configuração Local e Execução

### 1. Pré-requisitos

Certifique-se de ter o `pnpm` e o `Node.js` (versão LTS recomendada) instalados.

### 2. Instalação

```bash
# Navegue até o diretório do projeto
cd chilli-drinks-app

# Instalação das dependências
pnpm install
```

### 3. Variáveis de Ambiente

O projeto requer a definição da URL base da API no arquivo **`.env.local`**:

```
# .env.local

# URL onde o seu servidor Backend (API) estará rodando
NEXT_PUBLIC_API_URL=http://localhost:3001/api 
```

### 4. Execução (Modo Desenvolvimento)

O Frontend será iniciado na porta `3000`.

```bash
pnpm dev
```

### 5. Modo de Demonstração (Mocks)

Enquanto o servidor Backend **NÃO ESTIVER RODANDO** na porta `3001`, o **Mock Service Worker (MSW)** interceptará todas as requisições, permitindo a demonstração completa do fluxo:

* **Login/Cadastro:** Simulam sucesso e redirecionam.
* **Dashboard:** Carrega dados de saldo e histórico de cupons (simulados).
* **Registro de Cupons:** Simula sucesso e atualiza o histórico.

**Para desativar os Mocks, basta iniciar o seu servidor Backend na URL definida (`http://localhost:3001/api`).**

---

## 📋 Guia de Contratos para o Backend (Rubens Alves)

Os contratos de API foram definidos na etapa de **Frontend-First**. O seu Backend deve seguir estas especificações para garantir o funcionamento imediato do Front.

**URL Base:** `NEXT_PUBLIC_API_URL` (Ex: `http://localhost:3001/api`)

### A. Autenticação (`/auth`)

| Endpoint | Método | Função | Entrada (Body) | Saída (Status 200/201) | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/auth/login` | `POST` | Autenticação | `{ cpf, password }` | **CRÍTICO:** Deve retornar um **Cookie de sessão** e o objeto do usuário. | O Frontend depende do Cookie para manter a sessão. |
| `/auth/register` | `POST` | Cadastro | `{ cpf, email, password }` | Objeto do Usuário | |
| `/auth/me` | `GET` | Validação | (Header: Cookie) | Objeto do Usuário Logado | Usado pelo `AuthGuard`. Se inválido, retorne **401 Unauthorized**. |

### B. Cupons (`/codes`)

| Endpoint | Método | Função | Entrada (Body) | Saída (Status 201) | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/codes` | `POST` | Registrar Cupom | `{ code: "CHILLIABC123" }` | `{ message: string, newCode: { value: number } }` | O `code` é enviado em **MAIÚSCULAS**. `value` deve ser em **centavos**. |
| `/codes` | `GET` | Histórico | (Header: Cookie) | `Array<UserCode>` | Retorna lista de cupons cadastrados. |
| `/redemptions/summary` | `GET` | Saldo/Resumo | (Header: Cookie) | `{ totalValue: number, codesCount: number }` | `totalValue` deve ser em **centavos**. |

### 🛑 Configuração Crítica de CORS

Seu servidor Backend deve permitir requisições de **`http://localhost:3000`** e deve estar configurado para aceitar `credentials` (Cookies) para que o fluxo de autenticação funcione corretamente.

---

## 📁 Estrutura do Projeto

```
chilli-drinks-app/
├── src/
│   ├── app/                    # App Router (Next.js)
│   │   ├── auth/              # Páginas de autenticação
│   │   ├── dashboard/         # Dashboard principal
│   │   └── layout.tsx         # Layout global
│   ├── components/            # Componentes reutilizáveis
│   │   ├── auth/              # Componentes de autenticação
│   │   ├── dashboard/         # Componentes do dashboard
│   │   └── ui/                # Componentes de UI
│   ├── hooks/                 # Custom hooks (TanStack Query)
│   ├── lib/                   # Utilitários e configurações
│   ├── mocks/                 # Mock Service Worker
│   ├── styles/                # Tema Material UI
│   └── types/                 # Definições TypeScript
├── public/                    # Assets estáticos
└── package.json
```

---

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Tela de Login (CPF + Senha)
- [x] Tela de Cadastro (CPF + Email + Senha)
- [x] Validação de formulários (React Hook Form + Zod)
- [x] Proteção de rotas (AuthGuard)
- [x] Gerenciamento de sessão via cookies

### ✅ Dashboard
- [x] Resumo de saldo total
- [x] Contador de cupons registrados
- [x] Histórico completo de cupons
- [x] Status de cupons (Disponível/Resgatado)

### ✅ Registro de Cupons
- [x] Formulário de registro
- [x] Validação de código
- [x] Atualização automática do saldo
- [x] Feedback visual de sucesso/erro

### ✅ UI/UX
- [x] Design responsivo
- [x] Tema Chilli Drinks (Vermelho #FF0000)
- [x] Modo claro forçado
- [x] Componentes Material UI

---

## 🔧 Próximos Passos (Backend Integration)

1. **Implementar endpoints de autenticação** (`/auth/login`, `/auth/register`, `/auth/me`)
2. **Configurar CORS** para aceitar requisições do Frontend
3. **Implementar endpoints de cupons** (`/codes`, `/redemptions/summary`)
4. **Testar integração** removendo os mocks do MSW

---

## 📞 Suporte

Para dúvidas sobre a integração Backend/Frontend, consulte os contratos de API documentados acima ou entre em contato com a equipe de desenvolvimento.

**Próximo Passo:** Implementar os endpoints de Autenticação (`/auth/*`) para que o Frontend possa se conectar com sucesso.