// src/schemas/auth.ts (ATUALIZADO)
import { z } from 'zod';

// Regex para garantir que a string contém apenas 11 dígitos numéricos
const cpfRegex = /^\d{11}$/; 

// Função de transformação do CPF (remove pontos/traços)
const cpfTransform = z.string({ message: "O CPF é obrigatório." })
.min(1, "O CPF é obrigatório.")
.transform(val => val.replace(/\D/g, '')) 
.refine(val => val.length === 11, {
    message: "O CPF deve ter 11 dígitos (apenas números)."
})
.refine(val => cpfRegex.test(val), {
    message: "O CPF deve conter apenas números."
});

/**
 * Schema Zod para a tela de Login (POST /auth/login).
 */
export const LoginSchema = z.object({
    cpf: cpfTransform,
    password: z.string({ message: "A senha é obrigatória." })
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .max(50, "A senha é muito longa."),
});

// Mantém compatibilidade com o nome anterior
export const loginSchema = LoginSchema;

// Inferir o tipo TypeScript a partir do Schema Zod
export type LoginFormFields = z.infer<typeof LoginSchema>;
export type LoginPayload = LoginFormFields;


/**
 * Schema Zod para a tela de Cadastro (POST /auth/register).
 * Inclui validação inter-campo (refine) para a confirmação de senha.
 */
export const registerSchema = z.object({
    cpf: cpfTransform, // Reutiliza a validação de CPF
    email: z.string({ message: "O E-mail é obrigatório." })
    .email("O E-mail é inválido.")
    .max(100, "O E-mail é muito longo."),
    
    password: z.string({ message: "A senha é obrigatória." })
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .max(50, "A senha é muito longa."),

    confirmPassword: z.string({ message: "A confirmação de senha é obrigatória." })
    .min(6, "A confirmação deve ter no mínimo 6 caracteres."),

})
// VALIDAÇÃO CRÍTICA: As senhas devem ser idênticas.
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem. Verifique a confirmação.",
    path: ["confirmPassword"], // Anexa o erro ao campo confirmPassword
});

export type RegisterFormFields = z.infer<typeof registerSchema>;