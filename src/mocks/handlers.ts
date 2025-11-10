// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Interface para os códigos/tabs
interface TabCode {
  id: number;
  code: string;
  value: number;
  redeemedAt: string | null;
  createdAt: string;
}

// UIDs válidas para teste
const validUIDs = ['A1B2C3D4E5F6', 'G7H8I9J1K2L3', 'M4N5P6Q7R8S9', 'T1U2V3W4X5Y6', 'Z7A8B9C1D2E3'];

const CHILLI_CURRENT_USER_KEY = 'chilli_current_user';

// Função para obter usuário logado
function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(CHILLI_CURRENT_USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

// Função para obter chave de tabs por usuário
function getUserTabsKey(userDocument: string): string {
  return `CHILLI_TABS_${userDocument}`;
}

// Função para carregar tabs do usuário
function loadUserTabs(userDocument: string): TabCode[] {
  if (typeof window === 'undefined') return [];
  
  const key = getUserTabsKey(userDocument);
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
}

// Função para salvar tabs do usuário
function saveUserTabs(userDocument: string, tabs: TabCode[]) {
  if (typeof window !== 'undefined') {
    const key = getUserTabsKey(userDocument);
    localStorage.setItem(key, JSON.stringify(tabs));
  }
}

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { cpf: string; password: string };
    
    // Credenciais de teste válidas
    const validCpf = '11111111111';
    const validPassword = 'senha123';
    
    if (body.cpf === validCpf && body.password === validPassword) {
      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          cpf: body.cpf,
          email: 'usuario@exemplo.com',
          name: 'Usuário Demo'
        }
      }, { status: 200 });
    }
    
    return HttpResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  }),

  http.post(`${API_BASE_URL}/auth/register`, async ({ request }) => {
    const body = await request.json() as { name: string; email: string; password: string };
    
    if (body.name && body.email && body.password) {
      return HttpResponse.json({
        message: 'Usuário criado com sucesso',
        user: {
          id: 2,
          name: body.name,
          email: body.email
        }
      }, { status: 201 });
    }
    
    return HttpResponse.json(
      { message: 'Dados inválidos' },
      { status: 400 }
    );
  }),

  // Redemptions summary
  http.get(`${API_BASE_URL}/redemptions/summary`, () => {
    return HttpResponse.json({
      totalValue: 5000, // R$ 50,00 em centavos
      codesCount: 12,
      pendingRedemptions: 2
    });
  }),

  // User codes - usando estado persistente por usuário
  http.get(`${API_BASE_URL}/codes`, () => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.log('MSW GET /codes: Nenhum usuário logado');
      return HttpResponse.json([]);
    }
    
    const userTabs = loadUserTabs(currentUser.document);
    console.log(`MSW GET /codes: Retornando tabs do usuário ${currentUser.document}:`, userTabs);
    return HttpResponse.json(userTabs || []);
  }),

  // Register new code - adiciona ao estado persistente por usuário
  http.post(`${API_BASE_URL}/codes`, async ({ request }) => {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        console.log('MSW POST /codes: Nenhum usuário logado');
        return HttpResponse.json(
          { message: 'Usuário não autenticado' },
          { status: 401 }
        );
      }
      
      const body = await request.json() as { code: string };
      const submittedCode = body?.code?.trim().toUpperCase();
      const normalizedValidUIDs = validUIDs.map(uid => uid.trim().toUpperCase());
      
      console.log(`MSW POST /codes: Usuário ${currentUser.document}`);
      console.log('MSW POST /codes: Código submetido:', submittedCode);
      
      if (!submittedCode) {
        return HttpResponse.json(
          { message: 'Código é obrigatório' },
          { status: 400 }
        );
      }
      
      if (normalizedValidUIDs.includes(submittedCode)) {
        const userTabs = loadUserTabs(currentUser.document);
        const nextId = userTabs.length > 0 ? Math.max(...userTabs.map(t => t.id)) + 1 : 1;
        
        const newCode = {
          id: nextId,
          code: submittedCode,
          value: 1.00,
          redeemedAt: null,
          createdAt: new Date().toISOString()
        };
        
        userTabs.push(newCode);
        saveUserTabs(currentUser.document, userTabs);
        
        console.log(`MSW POST /codes: Sucesso! Tabs do usuário ${currentUser.document}:`, userTabs);
        
        return HttpResponse.json({
          message: 'Código registrado com sucesso!',
          newCode: {
            code: newCode.code,
            value: newCode.value
          }
        }, { status: 201 });
      }
      
      console.log('MSW POST /codes: Código inválido');
      return HttpResponse.json(
        { message: 'Código inválido ou não encontrado' },
        { status: 400 }
      );
    } catch (error) {
      console.error('MSW POST /codes: Erro ao processar:', error);
      return HttpResponse.json(
        { message: 'Erro ao processar requisição' },
        { status: 500 }
      );
    }
  }),

  // Delete code - remove do estado persistente por usuário
  http.delete(`${API_BASE_URL}/codes/:id`, ({ params }) => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      return HttpResponse.json(
        { message: 'Usuário não autenticado' },
        { status: 401 }
      );
    }
    
    const id = parseInt(params.id as string);
    const userTabs = loadUserTabs(currentUser.document);
    const index = userTabs.findIndex(tab => tab.id === id);
    
    if (index !== -1) {
      userTabs.splice(index, 1);
      saveUserTabs(currentUser.document, userTabs);
      
      return HttpResponse.json({ message: 'Código removido com sucesso!' });
    }
    
    return HttpResponse.json(
      { message: 'Código não encontrado' },
      { status: 404 }
    );
  })
];