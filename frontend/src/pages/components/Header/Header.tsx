import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";

export function Header() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative w-full h-16 bg-white flex justify-between items-center px-4 lg:px-10 border-b border-gray-200">
      <img src={logo} onClick={() => navigate("/")} alt="Logo" className="w-28 h-full cursor-pointer hover:opacity-80" />

      <div className="hidden lg:block">
        <Link to="/">
          <Button
            variant="link"
            className={`${location.pathname === "/" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/transactions">
          <Button
            variant="link"
            className={`${location.pathname === "/transactions" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Transações
          </Button>
        </Link>
        <Link to="/categories">
          <Button
            variant="link"
            className={`${location.pathname === "/categories" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Categorias
          </Button>
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <Link to="/profile">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
            <UserRound className="text-gray-600" />
          </div>
        </Link>
        <Button variant="outline" className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 text-red-base" />
          Sair
        </Button>
      </div>

      <Button
        variant="outline"
        className="lg:hidden p-2"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Abrir menu"
      >
        {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-4 top-14 z-50 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg lg:hidden">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className={`justify-start cursor-pointer ${location.pathname === "/" ? "text-brand font-semibold" : "text-gray-600"}`}
                onClick={() => handleNavigate("/")}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`justify-start cursor-pointer ${location.pathname === "/transactions" ? "text-brand font-semibold" : "text-gray-600"}`}
                onClick={() => handleNavigate("/transactions")}
              >
                Transações
              </Button>
              <Button
                variant="ghost"
                className={`justify-start cursor-pointer ${location.pathname === "/categories" ? "text-brand font-semibold" : "text-gray-600"}`}
                onClick={() => handleNavigate("/categories")}
              >
                Categorias
              </Button>
            </div>

            <div className="my-2 border-t border-gray-200" />

            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer text-gray-600"
              onClick={() => handleNavigate("/profile")}
            >
              <UserRound className="mr-2 size-4" />
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer text-red-base"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Sair
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
