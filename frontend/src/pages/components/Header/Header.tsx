import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { LogOut, UserRound } from "lucide-react";

export function Header() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-10 border-b border-gray-200">
      <img src={logo} onClick={() => navigate("/")} alt="Logo" className="w-28 h-full cursor-pointer hover:opacity-80" />
      <div>
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
      <div className="flex items-center gap-4">
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
    </div>
  );
}
