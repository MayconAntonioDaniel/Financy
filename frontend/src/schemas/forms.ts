import { z } from "zod"
import { parseCurrencyToNumberBRL } from "@/utils/utils"

export type FieldErrors<T extends string> = Partial<Record<T, string>>

export function getFieldErrors<T extends string>(
  error: z.ZodError,
): FieldErrors<T> {
  const fields = error.flatten().fieldErrors

  return Object.entries(fields).reduce((acc, [field, messages]) => {
    const firstMessage = Array.isArray(messages) ? messages[0] : undefined

    if (firstMessage) {
      acc[field as T] = firstMessage
    }

    return acc
  }, {} as FieldErrors<T>)
}

export const loginSchema = z.object({
  email: z.string().trim().email("Informe um email valido"),
  password: z.string().trim().min(1, "Informe a senha"),
})

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(80, "Nome muito longo"),
  email: z.string().trim().email("Informe um email valido"),
  password: z.string().trim().min(8, "A senha deve ter no minimo 8 caracteres"),
})

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .max(80, "Nome muito longo"),
  email: z.string().trim().email("Informe um email valido"),
})

export const categorySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Informe um titulo com pelo menos 2 caracteres")
    .max(40, "Titulo muito longo"),
  description: z
    .string()
    .trim()
    .max(120, "Descricao muito longa")
    .optional()
    .or(z.literal("")),
  icon: z.string().trim().min(1, "Selecione um icone"),
  color: z.string().trim().min(1, "Selecione uma cor"),
})

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, "Informe uma descricao com pelo menos 3 caracteres")
    .max(80, "Descricao muito longa"),
  date: z.preprocess(
    (value) => (value === undefined ? null : value),
    z
      .date()
      .nullable()
      .refine((value) => value !== null, "Selecione uma data"),
  ),
  amount: z
    .string()
    .trim()
    .refine(
      (value) => parseCurrencyToNumberBRL(value) > 0,
      "Informe valor maior que zero",
    ),
  category: z.string().trim().min(1, "Selecione uma categoria"),
  transactionType: z.enum(["Despesa", "Receita"]),
})
