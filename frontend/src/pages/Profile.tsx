import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Header } from "./components/Header/Header"
import { Label } from "@/components/ui/label"
import { LogOut, Mail, UserRound } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"
import {
  getFieldErrors,
  profileSchema,
  type FieldErrors,
} from "@/schemas/forms"
import { LabelError } from "@/components/LabelError/LabelError"
import { useMutation, useQuery } from "@apollo/client/react"
import { GET_ME } from "@/lib/graphql/queries/User"
import { UPDATE_ME } from "@/lib/graphql/mutations/User"

type ProfileFields = "name" | "email"

export function Profile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<FieldErrors<ProfileFields>>({})
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const { data, loading: loadingMe } = useQuery(GET_ME)
  const [updateMe, { loading: loadingUpdatingMe }] = useMutation(UPDATE_ME)

  const user = data?.getMe

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const clearFieldError = (field: ProfileFields) => {
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

    const parsed = profileSchema.safeParse({
      name,
      email,
    })

    if (!parsed.success) {
      setErrors(getFieldErrors<ProfileFields>(parsed.error))
      return
    }

    await updateMe({
      variables: {
        data: {
          name: parsed.data.name.trim(),
        },
      },
    })
  }

  const handleLogout = () => {
    logout("manual")
    navigate("/login", { replace: true })
  }

  return (
    <>
      <Header />
      {loadingMe ? (
        <p>Loading...</p>
      ) : (
        <div className="flex p-6 sm:p-0 min-h-[calc(80vh-4rem)] md:min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 py-5">
          <Card className="w-full max-w-md rounded-xl p-6 sm:p-8">
            <CardHeader className="mb-2 flex flex-col items-center">
              <div className="w-18 h-18 bg-gray-200 text-2xl mb-3 font-semibold rounded-full flex items-center justify-center cursor-pointer">
                <UserRound className="text-gray-600 size-10" />
              </div>
              <CardTitle className="text-xl font-bold">{user?.name}</CardTitle>
              <CardDescription className="text-base text-gray-500">
                {email}
              </CardDescription>
            </CardHeader>
            <Separator className="max-w-full mb-4" />
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      className="h-11 py-5 pl-10"
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={name}
                      disabled={loadingUpdatingMe}
                      aria-invalid={Boolean(errors.name)}
                      onChange={(e) => {
                        clearFieldError("name")
                        setName(e.target.value)
                      }}
                      required
                    />
                  </div>
                  {errors.name && <LabelError error={errors.name} />}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      className="h-11 py-5 pl-10"
                      id="email"
                      type="email"
                      value={email}
                      disabled={true}
                      aria-invalid={Boolean(errors.email)}
                      required
                    />
                  </div>
                  {errors.email && <LabelError error={errors.email} />}
                  <p className="text-xs text-gray-500">
                    A e-mail não pode ser alterado
                  </p>
                </div>
                <Button type="submit" className="w-full cursor-pointer p-5">
                  Salvar alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer p-5 hover:text-red-base"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4 text-red-base" />
                  Sair da conta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
