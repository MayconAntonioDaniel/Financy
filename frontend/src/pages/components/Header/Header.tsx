import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-10 border-b border-gray-200">
      <img src={logo} alt="Logo" className="w-28 h-full" />
      <div>
        <Link to="/">
          <Button
            variant="link"
            className={`${window.location.pathname === "/" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/transactions">
          <Button
            variant="link"
            className={`${window.location.pathname === "/transactions" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Transações
          </Button>
        </Link>
        <Link to="/categories">
          <Button
            variant="link"
            className={`${window.location.pathname === "/categories" ? "text-brand font-semibold" : "text-gray-600"} cursor-pointer`}
          >
            Categorias
          </Button>
        </Link>
      </div>
      <Link to="/profile">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
          CT
        </div>
      </Link>
    </div>
  );
}
