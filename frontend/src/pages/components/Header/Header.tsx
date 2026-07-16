import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

export function Header() {
  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-10 border-b border-gray-200">
      <img src={logo} alt="Logo" className="w-28 h-full" />
      <div>
        <Button
          variant="link" onClick={() => window.location.href = "/"}
          className={`${window.location.pathname === "/" ? "text-green-base" : "text-gray-600"} cursor-pointer font-semibold`}
        >
          Dashboard
        </Button>
        <Button
          variant="link" onClick={() => window.location.href = "/transactions"}
          className={`${window.location.pathname === "/transactions" ? "text-green-base" : "text-gray-600"} cursor-pointer font-semibold`}
        >
          Transações
        </Button>
        <Button
          variant="link" onClick={() => window.location.href = "/categories"}
          className={`${window.location.pathname === "/categories" ? "text-green-base" : "text-gray-600"} cursor-pointer font-semibold`}
        >
          Categorias
        </Button>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        CT
      </div>
    </div>
  );
}
