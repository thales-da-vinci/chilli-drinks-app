// src/app/(auth)/login/page.tsx
import { AuthLayout } from '@/components/common/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm'; // Importa o novo componente

export default function LoginPage() {
  return (
    <AuthLayout title="Faça seu Login">
      {/* O componente LoginForm agora contém toda a lógica de UI e submissão */}
      <LoginForm />
    </AuthLayout>
  );
}