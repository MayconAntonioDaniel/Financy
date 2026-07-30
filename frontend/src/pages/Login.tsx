import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, UserRoundPlus } from "lucide-react"
import logo from "../assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/authStore"
import { getFieldErrors, loginSchema, type FieldErrors } from "@/schemas/forms"
import { LabelError } from "@/components/LabelError/LabelError";

type LoginFields = "email" | "password"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors<LoginFields>>({})
  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const clearError = useAuthStore((state) => state.clearError)

  const clearFieldError = (field: LoginFields) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev
      }

      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const parsed = loginSchema.safeParse({ email, password })

    if (!parsed.success) {
      setErrors(getFieldErrors<LoginFields>(parsed.error))
      return
    }

    setErrors({})
    await login(parsed.data.email, parsed.data.password)

    if (useAuthStore.getState().isAuthenticated) {
      navigate("/")
    }
  }

  return (
    <div className="flex p-6 sm:p-0 min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 py-5">
      <img src={logo} alt="Logo" className="w-36 h-9" />
      <Card className="w-full max-w-md rounded-xl p-4 sm:p-8">
        <CardHeader className="mb-6 flex flex-col items-center">
          <CardTitle className="text-xl font-bold">
            Fazer login
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="h-11 py-5 pl-10"
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={email}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(e) => {
                    clearError()
                    clearFieldError("email")
                    setEmail(e.target.value)
                  }}
                  required
                />
              </div>
              {errors.email && <LabelError error={errors.email} />}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">
                Senha
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="h-11 py-5 pr-11 pl-10"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  aria-invalid={Boolean(errors.password)}
                  onChange={(e) => {
                    clearError()
                    clearFieldError("password")
                    setPassword(e.target.value)
                  }}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              {errors.password && <LabelError error={errors.password} />}
              {error && <LabelError error={error} />}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-700">
                Lembrar-me
              </Label>
              <Button variant="link" className="ml-auto cursor-pointer text-sm hover:text-brand-dark">
                Recuperar senha
              </Button>
            </div>
            <Button type="submit" className="w-full cursor-pointer p-5" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardContent className="mt-2 flex flex-col gap-4 text-gray-700">
          <div className="flex items-center justify-center gap-3">
            <Separator className="max-w-2/5" />
            <p>ou</p>
            <Separator className="max-w-2/5" />
          </div>
          <CardDescription className="text-md flex flex-col items-center gap-4">
            Ainda não tem uma conta?
          </CardDescription>
          <Link to="/signup">
            <Button variant="outline" className="w-full cursor-pointer p-5 hover:text-brand-dark">
              <UserRoundPlus className="size-4" />
              Criar conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}