import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/select-quiz");
    } else {
      navigate("/signUp");
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-16 bg-[url('/')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-screen text-center gap-3 font-sans">
        {/* HERO TEXT */}
        <p className="text-blue-400 text-4xl md:text-6xl font-black">
          How Much
        </p>
        <p className="text-blue-400 text-4xl md:text-6xl font-black">
          Do You Know About
        </p>
        <p className="text-purple-400 text-4xl md:text-6xl font-black">
          Programming
        </p>

        {/* SUBTEXT */}
        <p className="text-green-500 text-md md:text-xl font-semibold italic mt-6">
          Turn practice into progress, one quiz at a time.
        </p>

        {/* BUTTON */}
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white md:py-3 font-bold px-6 py-2 text-md md:text-lg border-2 border-blue-700 rounded-lg hover:bg-green-500 transition shadow-lg hover:shadow-xl mt-4"
        >
          {isLoggedIn ? "Take a Quiz" : "Get Started"}
        </button>
      </div>
    </div>
  );
}