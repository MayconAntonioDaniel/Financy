import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "./components/Header/Header";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, LogIn, LogOut, Mail, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 py-5">
        <Card className="w-full max-w-md rounded-xl p-8">
          <CardHeader className="mb-2 flex flex-col items-center">
            <div className="w-18 h-18 bg-gray-200 text-2xl mb-3 font-semibold rounded-full flex items-center justify-center cursor-pointer">
              CT
            </div>
            <CardTitle className="text-xl font-bold">Conta teste</CardTitle>
            <CardDescription className="text-base text-gray-500">
              conta@teste.com
            </CardDescription>
          </CardHeader>
          <Separator className="max-w-full mb-4" />
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="fullName">Nome completo</Label>
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
                <Label htmlFor="email">Email</Label>
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
                <p className="text-xs text-gray-500">
                  A e-mail não pode ser alterado
                </p>
              </div>
              <Button type="submit" className="w-full cursor-pointer p-5">
                Salvar alterações
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer p-5 hover:text-red-base"
                >
                  <LogOut className="size-4 text-red-base" />
                  Sair da conta
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
