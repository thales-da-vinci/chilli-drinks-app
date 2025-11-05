// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

// Nova chave de localStorage para forçar reset do cache
const STORAGE_KEY = 'CHILLI_TABS_V2';

// Estado persistente para as tabs/códigos (singleton) - RESET FORÇADO
let tabsState: TabCode[] = [];

// Carrega estado do localStorage com nova chave
if (typeof window !== 'undefined') {
  // Remove chaves antigas
  localStorage.removeItem('chilli_tabs_mock');
  localStorage.removeItem('chilli_drinks_tabs');
  
  // Carrega da nova chave ou inicia vazio
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tabsState = JSON.parse(stored);
    } catch (e) {
      tabsState = [];
    }
  } else {
    tabsState = [];
  }
}

let nextId = 1; // Próximo ID para novos códigos

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

  // User codes - usando estado persistente
  http.get(`${API_BASE_URL}/codes`, () => {
    console.log('MSW: Retornando tabs:', tabsState);
    // Garante que sempre retorna um array, mesmo se tabsState for undefined
    return HttpResponse.json(tabsState || []);
  }),

  // Register new code - adiciona ao estado persistente
  http.post(`${API_BASE_URL}/codes`, async ({ request }) => {
    try {
      const body = await request.json() as { code: string };
      const submittedCode = body?.code?.trim().toUpperCase();
      const normalizedValidUIDs = validUIDs.map(uid => uid.trim().toUpperCase());
      
      console.log('MSW POST /codes: Body recebido:', body);
      console.log('MSW POST /codes: Código submetido:', submittedCode);
      console.log('MSW POST /codes: UIDs válidas:', normalizedValidUIDs);
      
      if (!submittedCode) {
        console.log('MSW POST /codes: Código vazio');
        return HttpResponse.json(
          { message: 'Código é obrigatório' },
          { status: 400 }
        );
      }
      
      if (normalizedValidUIDs.includes(submittedCode)) {
        const newCode = {
          id: nextId++,
          code: submittedCode,
          value: 15.00, // R$ 15,00
          redeemedAt: null,
          createdAt: new Date().toISOString()
        };
        
        tabsState.push(newCode);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsState));
        }
        
        console.log('MSW POST /codes: Sucesso! Novo estado:', tabsState);
        
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

  // Delete code - remove do estado persistente
  http.delete(`${API_BASE_URL}/codes/:id`, ({ params }) => {
    const id = parseInt(params.id as string);
    const index = tabsState.findIndex(tab => tab.id === id);
    
    if (index !== -1) {
      tabsState.splice(index, 1);
      
      // Salva no localStorage com nova chave
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsState));
      }
      
      return HttpResponse.json({ message: 'Código removido com sucesso!' });
    }
    
    return HttpResponse.json(
      { message: 'Código não encontrado' },
      { status: 404 }
    );
  })
];