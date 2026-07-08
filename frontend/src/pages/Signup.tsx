import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Lock, LogIn, Mail, UserRound,  } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import logo from "../assets/logo.svg"

export function Signup() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
      <img src={logo} alt="Logo" className="w-36 h-9" />
      <Card className="w-full max-w-md rounded-xl p-8">
        <CardHeader className="mb-6 flex flex-col items-center">
          <CardTitle className="text-xl font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-base">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">
                Nome completo
              </Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  className="h-11 py-5 pl-10"
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
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
                  onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-xs text-gray-500">A senha deve ter no mínimo 8 caracteres</p>
            </div>
            <Button type="submit" className="w-full cursor-pointer p-5">
              Cadastrar
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
            Já tem uma conta?
          </CardDescription>
          <Link to="/">
            <Button variant="outline" className="w-full cursor-pointer p-5 hover:text-brand-dark">
              <LogIn className="size-4" />
              Fazer login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}