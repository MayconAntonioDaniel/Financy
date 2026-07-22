import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null })

        try {
          // Simulates an API call until backend auth endpoint is available.
          await new Promise((resolve) => setTimeout(resolve, 700))

          if (!email || !password) {
            throw new Error("Credenciais inválidas")
          }

          set({
            user: { id: "1", name: "Usuário", email },
            token: "fake-jwt-token",
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({
            error: "Falha ao fazer login. Verifique suas credenciais.",
            isLoading: false,
          })
        }
      },
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "financy-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
