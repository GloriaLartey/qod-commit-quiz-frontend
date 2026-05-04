import "tailwindcss";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="logo-div flex items-center bg-white rounded-l-full cursor-pointer max-w-full overflow-hidden"
    >
      <div className="bg-animated-gradient rounded-full h-8 w-8 md:h-10 md:w-10 p-0.5 overflow-hidden shrink-0">
        <img
          src="/logo-image-wb.png"
          alt="Logo"
          className="w-full h-full object-cover rounded-full shadow-lg"
        />
      </div>

      <p className="logo-text gradient-text text-sm md:text-base truncate mr-2.5">
        QodComit
      </p>
    </div>
  );
}
