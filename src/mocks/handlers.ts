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

// Geração de UIDs aleatórias (12 dígitos alfanuméricos, sem 'O')
function generateUID(): string {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // Sem 'O'
  let uid = '';
  for (let i = 0; i < 12; i++) {
    uid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uid;
}

// Status possíveis para as TABs
type TabStatus = 'DISPONIVEL' | 'RESGATADA' | 'INVALIDA';

interface TabDatabase {
  uid: string;
  status: TabStatus;
  value: number;
}

// Base de dados mockada de 50 TABs
function initializeTabDatabase(): TabDatabase[] {
  const tabs: TabDatabase[] = [];
  
  // 30 TABs disponíveis
  for (let i = 0; i < 30; i++) {
    tabs.push({
      uid: generateUID(),
      status: 'DISPONIVEL',
      value: 1.00
    });
  }
  
  // 10 TABs já resgatadas
  for (let i = 0; i < 10; i++) {
    tabs.push({
      uid: generateUID(),
      status: 'RESGATADA',
      value: 1.00
    });
  }
  
  // 10 TABs inválidas
  for (let i = 0; i < 10; i++) {
    tabs.push({
      uid: generateUID(),
      status: 'INVALIDA',
      value: 0
    });
  }
  
  return tabs;
}

// Base de dados global de TABs (inicializada uma vez)
const TAB_DATABASE: TabDatabase[] = initializeTabDatabase();

console.log('MSW: Base de dados de TABs inicializada com', TAB_DATABASE.length, 'entradas');
console.log('MSW: TABs disponíveis:', TAB_DATABASE.filter(t => t.status === 'DISPONIVEL').map(t => t.uid));

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
      
      console.log(`MSW POST /codes: Usuário ${currentUser.document}`);
      console.log('MSW POST /codes: Código submetido:', submittedCode);
      
      if (!submittedCode) {
        return HttpResponse.json(
          { message: 'Código é obrigatório' },
          { status: 400 }
        );
      }
      
      // Busca a TAB na base de dados
      const tabInDatabase = TAB_DATABASE.find(t => t.uid === submittedCode);
      
      if (!tabInDatabase) {
        console.log('MSW POST /codes: TAB não encontrada na base de dados');
        return HttpResponse.json(
          { message: 'Código TAB inválido ou não encontrado' },
          { status: 404 }
        );
      }
      
      // Validação de status
      if (tabInDatabase.status === 'INVALIDA') {
        console.log('MSW POST /codes: TAB inválida');
        return HttpResponse.json(
          { message: 'Código TAB inválido' },
          { status: 404 }
        );
      }
      
      if (tabInDatabase.status === 'RESGATADA') {
        console.log('MSW POST /codes: TAB já resgatada');
        return HttpResponse.json(
          { message: 'Este código TAB já foi utilizado' },
          { status: 409 }
        );
      }
      
      // Verifica se o usuário já resgatou esta TAB
      const userTabs = loadUserTabs(currentUser.document);
      const alreadyRedeemed = userTabs.find(t => t.code === submittedCode);
      
      if (alreadyRedeemed) {
        console.log('MSW POST /codes: Usuário já resgatou esta TAB');
        return HttpResponse.json(
          { message: 'Você já resgatou este código TAB' },
          { status: 409 }
        );
      }
      
      // TAB disponível - adiciona à lista do usuário
      const nextId = userTabs.length > 0 ? Math.max(...userTabs.map(t => t.id)) + 1 : 1;
      
      const newCode = {
        id: nextId,
        code: submittedCode,
        value: tabInDatabase.value,
        redeemedAt: null,
        createdAt: new Date().toISOString()
      };
      
      userTabs.push(newCode);
      saveUserTabs(currentUser.document, userTabs);
      
      // Marca a TAB como resgatada na base de dados
      tabInDatabase.status = 'RESGATADA';
      
      console.log(`MSW POST /codes: Sucesso! Tabs do usuário ${currentUser.document}:`, userTabs);
      
      return HttpResponse.json({
        message: 'Código registrado com sucesso!',
        newCode: {
          code: newCode.code,
          value: newCode.value
        }
      }, { status: 201 });
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