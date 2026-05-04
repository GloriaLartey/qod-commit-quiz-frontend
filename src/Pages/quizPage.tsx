import Header from "../Components/Header/header";
import Quiz from "../Components/Quiz";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function QuizPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const quizName = params.get("category") || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const safeQuizName = quizName.toLowerCase();

  return (
    <div className="bg-[url('/bg3.png')] bg-cover bg-center bg-no-repeat min-h-screen md:px-6">

      {/* HEADER */}
      <Header />

      {/* TITLE */}
      <div className="text-center mt-6">
        <h1 className="text-purple-100 text-2xl md:text-3xl font-black capitalize mb-10 md:mb-15 mt-6 md:mt-10">
          {safeQuizName} Quiz Room
        </h1>
      </div>

      {/* QUIZ WRAPPER (SPACING FIX ONLY) */}
      <div className="pb-10">
        {safeQuizName ? (
          <Quiz category={safeQuizName} />
        ) : (
          <p className="text-white text-center mt-10">
            Invalid quiz category
          </p>
        )}
      </div>
    </div>
  );
}

export default QuizPage;