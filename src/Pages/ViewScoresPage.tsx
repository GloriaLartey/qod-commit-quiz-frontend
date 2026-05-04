import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/header";
import { FiTrash2, FiChevronDown } from "react-icons/fi";
import { useScores, useDeleteScore } from "../hooks/useScore";

export default function ViewScoresPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Scores");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useScores();
  const { mutateAsync } = useDeleteScore();

  const scores = Array.isArray(data) ? data : data?.scores || [];

  const filters = [
    "All Scores",
    "Best Performance",
    "Average Performance",
    "Weak Performance",
  ];

  const getBadgeColor = (score: number) => {
    if (score >= 7) return "bg-green-100 text-green-700";
    if (score >= 5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const filteredScores = scores
    .filter((s: any) => {
      if (activeTab === "Best Performance") return s.score >= 6;
      if (activeTab === "Average Performance") return s.score === 5;
      if (activeTab === "Weak Performance") return s.score < 5;
      return true;
    })
    .filter((s: any) => {
      const name = s.category || s.quiz || "";
      const score = s.score || s.points || "";
      const date = s.createdAt || s.date || "";

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        score.toString().includes(search) ||
        new Date(date).toLocaleDateString().includes(search)
      );
    });

  if (isLoading) {
    return (
      <div className="bg-animated-gradient min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading scores...</p>
      </div>
    );
  }

  const handleDeleteScore = async (s: any) => {
    const hasConfirmed = confirm("Delete this score");
    if (!hasConfirmed) return;

    setDeletingId(s._id);
    await mutateAsync(s._id as string);
    setDeletingId(null);
  };

  return (
    <div className="bg-animated-gradient min-h-screen">

      {/* HEADER (REPLACED LOGO SECTION) */}
      <div className="mb-10">
        <Header />
      </div>

      {/* TITLE + SEARCH */}
      <div className="flex flex-col items-center mb-10 mx-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          My Performance View
        </h1>

        <input
          type="text"
          placeholder="Search by quiz name, score or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-4 py-2 rounded-lg border border-white text-white text-sm md:text-base"
        />

        {/* MOBILE FILTER + BACK BUTTON */}
        <div className="lg:hidden w-full max-w-xl mt-4 flex items-center gap-3 mx-5">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 bg-white text-purple-700 px-4 py-2 rounded-lg flex justify-between items-center font-semibold text-sm"
          >
            Filters
            <FiChevronDown />
          </button>

          <button
            onClick={() => navigate("/select-quiz")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm"
          >
            Back to Quiz
          </button>
        </div>

        {showFilters && (
          <div className="lg:hidden bg-white mt-2 rounded-lg shadow-md w-full max-w-xl">
            {filters.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setShowFilters(false);
                }}
                className={`p-3 text-center cursor-pointer text-sm transition
                  ${
                    activeTab === item
                      ? "bg-purple-600 text-white font-bold"
                      : "hover:bg-gray-100"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-6 mx-5">

        {/* SIDEBAR */}
        <div className="hidden lg:block w-60 bg-white rounded-2xl p-5 shadow-md">
          <h2 className="font-bold mb-4 text-center">Filters</h2>

          {filters.map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              className={`p-3 rounded-lg cursor-pointer mb-2 text-sm text-center transition
                ${
                  activeTab === item
                    ? "bg-purple-300 text-black font-bold"
                    : "hover:bg-gray-100"
                }`}
            >
              {item}
            </div>
          ))}

          <button
            onClick={() => navigate("/select-quiz")}
            className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Quiz
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg md:text-xl font-bold mb-6 text-purple-700 text-center">
            {activeTab}
          </h2>

          {/* DESKTOP HEADER */}
          <div className="hidden lg:grid grid-cols-5 text-sm font-semibold text-gray-500 border-b pb-2 mb-3">
            <span className="pl-2.5">#</span>
            <span className="pl-2">Quiz</span>
            <span className="pl-2">Score</span>
            <span>Date</span>
            <span className="text-right">Action</span>
          </div>

          {/* DESKTOP ROWS */}
          <div className="hidden lg:block space-y-2">
            {filteredScores.map((s: any, index: number) => (
              <div
                key={s._id}
                className="grid grid-cols-5 items-center text-sm bg-gray-50 px-3 py-3 rounded-lg"
              >
                <span>{index + 1}</span>
                <span>{s.category}</span>

                <span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(
                      s.score,
                    )}`}
                  >
                    {s.score}/10
                  </span>
                </span>

                <span>{new Date(s.createdAt).toLocaleDateString()}</span>

                <div className="flex justify-end">
                  {deletingId === s._id ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
                  ) : (
                    <FiTrash2
                      onClick={() => handleDeleteScore(s)}
                      className="text-red-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE CARDS */}
          <div className="lg:hidden space-y-4">
            {filteredScores.map((s: any, index: number) => (
              <div key={s._id} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between text-sm">
                  <p className="font-bold text-gray-600">#{index + 1}</p>

                  {deletingId === s._id ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
                  ) : (
                    <FiTrash2
                      onClick={() => handleDeleteScore(s)}
                      className="text-red-500 cursor-pointer"
                    />
                  )}
                </div>

                <p className="mt-2 font-semibold text-sm md:text-base">
                  {s.category}
                </p>

                <p className="text-sm font-bold">
                  Score:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(
                      s.score,
                    )}`}
                  >
                    {s.score}/10
                  </span>
                </p>

                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {new Date(s.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}