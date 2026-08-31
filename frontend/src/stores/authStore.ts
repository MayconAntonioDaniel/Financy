import type { User, RegisterInput, LoginInput } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import { REGISTER } from "@/lib/graphql/mutations/Register"
import { LOGIN } from "@/lib/graphql/mutations/Login"
import { CombinedGraphQLErrors } from "@apollo/client/errors"
import { toast } from "sonner"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: (reason?: "expired" | "manual") => void
}

function getApolloMessage(error: unknown, fallback: string) {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors[0]?.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (loginData: LoginInput) => {
        set({ isLoading: true, error: null })

        try {
          const { data } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password,
              },
            },
          })

          if (data?.login) {
            const { user, token } = data.login
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })
            return true
          }
          return false
        } catch (error) {
          set({ isLoading: false, error: getApolloMessage(error, "Erro ao fazer o login") })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
          set({ isLoading: true, error: null })

          const { data } = await apolloClient.mutate({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          })

          if (data?.register) {
            const { token, user } = data.register

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })
            return true
          }
          return false
        } catch (error) {
          set({ isLoading: false, error: getApolloMessage(error, "Erro ao fazer o cadastro") })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      logout: (reason = 'manual') => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
        apolloClient.clearStore()

        if (reason === "expired") {
          toast.error("Sua sessão expirou. Por favor, faça login novamente.")
        } else {
          toast.success("Logout realizado com sucesso.")
        }
      },
    }),
    {
      name: "storage-auth",
    },
  ),
)
