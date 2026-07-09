import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Header() {
  return (
    <div className="w-full h-16 bg-white flex justify-between items-center px-10 border-b border-gray-200">
      <img src={logo} alt="Logo" className="w-28 h-full" />
      <div>
        <Button
          variant="link"
          className={`${window.location.pathname === "/" ? "text-green-base" : "text-gray-600"} cursor-pointer font-semibold`}
        >
          Dashboard
        </Button>
        <Button variant="link" className="cursor-pointer text-gray-600">
          Transações
        </Button>
        <Button variant="link" className="cursor-pointer text-gray-600">
          Categorias
        </Button>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        CT
      </div>
    </div>
  );
}
