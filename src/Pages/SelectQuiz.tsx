import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/header";

export default function SelectQuiz() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // USERNAME LOGIC
  const username = localStorage.getItem("username") || "";
  const firstNameRaw = username ? username.split(" ")[0] : "";
  const firstName =
    firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1);

  const quizzes = [
  {
    name: "General",
    img: "/vector.webp",
    def: "Take a general programming quiz to test your knowledge accross all programming concepts",
  },
  {
    name: "HTML",
    img: "/html.png",
    def: "HyperText Markup Language; the standard language for creating web page structure",
  },
  {
    name: "CSS",
    img: "/css.png",
    def: "Cascading Style Sheets; used to style and layout web pages",
  },
  {
    name: "JavaScript",
    img: "/js.png",
    def: "A programming language that makes web pages interactive and dynamic",
  },
  {
    name: "React",
    img: "/react.png",
    def: "A JavaScript library for building interactive user interfaces with reusable components",
  },
  {
    name: "Tailwind",
    img: "/tailwind.png",
    def: "A utility-first CSS framework for quickly styling web pages",
  },
  {
    name: "Python",
    img: "/python.png",
    def: "A high-level programming language used for web, software, data analysis, and automation",
  },
  {
    name: "Typescript",
    img: "/typescript.png",
    def: "A programming language that builds on top of JavaScript by adding static types",
  },
];

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleQuizClick = (quizName: string) => {
    navigate(`/qr/${quizName.toLowerCase()}`);
  };

  return (
    <div className="bg-animated-gradient min-h-screen">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* CONTENT */}
      <div className="pt-24 px-4 md:px-10">
        {/* GREETING TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
          {firstName ? <>Hello, {firstName} 😊</> : <>Hello 😊</>}
          <br />
          <span className="text-lg md:text-xl font-medium">
            Select a quiz below...
          </span>
        </h1>

        {/* SEARCH + BUTTON */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search quiz..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              onClick={() => navigate("/view-scores")}
              className="bg-white/30 text-white px-5 py-2 rounded-lg hover:bg-white/40 transition font-semibold"
            >
              View Scores
            </button>
          </div>
        </div>

        {/* QUIZ GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.name}
              onClick={() => handleQuizClick(quiz.name)}
              className="bg-white rounded-xl p-4 cursor-pointer hover:scale-105 transition shadow-md"
            >
              {/* IMAGE */}
              <div className="bg-animated-gradient rounded-lg flex justify-center items-center p-3 mb-3">
                <img
                  src={quiz.img}
                  alt={quiz.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* TEXT */}
              <h2 className="text-lg font-bold text-purple-800 mb-1">
                {quiz.name}
              </h2>

              <p className="text-sm text-gray-600">{quiz.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
