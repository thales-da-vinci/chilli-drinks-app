// src/app/(auth)/register/page.tsx
import { AuthLayout } from '@/components/common/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm'; // Importa o novo componente

export default function RegisterPage() {
  return (
    <AuthLayout title="Crie sua Conta Chilli">
      {/* O componente RegisterForm agora contém toda a lógica de UI e submissão */}
      <RegisterForm />
    </AuthLayout>
  );
}