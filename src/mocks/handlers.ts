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

// Status possíveis para as TABs
type TabStatus = 'DISPONIVEL' | 'RESGATADA' | 'INVALIDA';

interface TabDatabase {
  uid: string;
  status: TabStatus;
  value: number;
}

// Base de dados estática de 50 TABs (fonte: TABS_TESTE.md)
const TAB_DATABASE: TabDatabase[] = [
  // 30 TABs DISPONÍVEIS (R$ 1,00 cada)
  { uid: 'A1B2C3D4E5F6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'G7H8I9J1K2L3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'M4N5P6Q7R8S9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'T1U2V3W4X5Y6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'Z7A8B9C1D2E3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'P4Q5R6S7T8U9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'V1W2X3Y4Z5A6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'B7C8D9E1F2G3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'H4I5J6K7L8M9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'N1P2Q3R4S5T6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'U7V8W9X1Y2Z3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'A4B5C6D7E8F9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'G1H2I3J4K5L6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'M7N8P9Q1R2S3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'T4U5V6W7X8Y9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'Z1A2B3C4D5E6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'F7G8H9I1J2K3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'L4M5N6P7Q8R9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'S1T2U3V4W5X6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'Y7Z8A9B1C2D3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'E4F5G6H7I8J9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'K1L2M3N4P5Q6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'R7S8T9U1V2W3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'X4Y5Z6A7B8C9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'D1E2F3G4H5I6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'J7K8L9M1N2P3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'Q4R5S6T7U8V9', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'W1X2Y3Z4A5B6', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'C7D8E9F1G2H3', status: 'DISPONIVEL', value: 1.00 },
  { uid: 'I4J5K6L7M8N9', status: 'DISPONIVEL', value: 1.00 },
  
  // 10 TABs JÁ RESGATADAS
  { uid: 'P1Q2R3S4T5U6', status: 'RESGATADA', value: 1.00 },
  { uid: 'V7W8X9Y1Z2A3', status: 'RESGATADA', value: 1.00 },
  { uid: 'B4C5D6E7F8G9', status: 'RESGATADA', value: 1.00 },
  { uid: 'H1I2J3K4L5M6', status: 'RESGATADA', value: 1.00 },
  { uid: 'N7P8Q9R1S2T3', status: 'RESGATADA', value: 1.00 },
  { uid: 'U4V5W6X7Y8Z9', status: 'RESGATADA', value: 1.00 },
  { uid: 'A1B2C3D4E5F7', status: 'RESGATADA', value: 1.00 },
  { uid: 'G8H9I1J2K3L4', status: 'RESGATADA', value: 1.00 },
  { uid: 'M5N6P7Q8R9S1', status: 'RESGATADA', value: 1.00 },
  { uid: 'T2U3V4W5X6Y7', status: 'RESGATADA', value: 1.00 },
  
  // 10 TABs INVÁLIDAS (R$ 0,00)
  { uid: 'Z8A9B1C2D3E4', status: 'INVALIDA', value: 0 },
  { uid: 'F5G6H7I8J9K1', status: 'INVALIDA', value: 0 },
  { uid: 'L2M3N4P5Q6R7', status: 'INVALIDA', value: 0 },
  { uid: 'S8T9U1V2W3X4', status: 'INVALIDA', value: 0 },
  { uid: 'Y5Z6A7B8C9D1', status: 'INVALIDA', value: 0 },
  { uid: 'E2F3G4H5I6J7', status: 'INVALIDA', value: 0 },
  { uid: 'K8L9M1N2P3Q4', status: 'INVALIDA', value: 0 },
  { uid: 'R5S6T7U8V9W1', status: 'INVALIDA', value: 0 },
  { uid: 'X2Y3Z4A5B6C7', status: 'INVALIDA', value: 0 },
  { uid: 'D8E9F1G2H3I4', status: 'INVALIDA', value: 0 },
];

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