import "tailwindcss";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-1 w-fit md:w-[180px] bg-white rounded-l-full cursor-pointer overflow-hidden hover:shadow-md transition"
    >
      <div className="bg-animated-gradient rounded-full h-7 w-7 md:h-10 md:w-10 p-0.5 overflow-hidden shrink-0">
        <img
          src="/logo-image-wb.png"
          alt="Logo"
          className="w-full h-full object-cover rounded-full shadow-lg"
        />
      </div>

      <p className="gradient-text font-medium text-[20px] sm:text-[20px] md:text-[25px] mr-1 font-[Black_Ops_One]">
        QodComit
      </p>
    </div>
  );
}
