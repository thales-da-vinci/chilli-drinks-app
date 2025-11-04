// src/mocks/index.ts
export async function enableMocking() {
  if (typeof window === 'undefined') {
    // Server-side (não usado no Next.js client-side)
    return;
  }

  // Client-side
  const { worker } = await import('./browser');
  
  return worker.start({
    onUnhandledRequest: 'bypass', // Ignora requests não mockados
  });
}