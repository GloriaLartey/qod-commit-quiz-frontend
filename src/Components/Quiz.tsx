import { useState, useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { submitScore } from "../api/quiz";

type Props = {
  category: string;
};

export default function Quiz({ category }: Props) {
  const { data: questions = [], isLoading } = useQuiz(category);

  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState(45);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const question = questions[index];

  // 🔊 SOUND EFFECTS
  const correctSound = new Audio("/sounds/correct.mp3");
  const wrongSound = new Audio("/sounds/wrong.mp3");

  // =========================
  // SHUFFLE OPTIONS
  // =========================
  useEffect(() => {
    if (!question) return;

    const shuffled = [...question.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelected(null);
    setLock(false);
  }, [index, question]);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    if (showResult) return;

    setTimeLeft(45);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, showResult]);

  // =========================
  // ANSWER CHECK
  // =========================
  const checkAns = (i: number) => {
    if (lock || !question) return;

    setSelected(i);
    setLock(true);

    const selectedOption = shuffledOptions[i];
    const correctAnswer = question.answer;

    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }

    setTimeout(() => handleNext(), 800);
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setLock(false);
    setShowResult(false);
  };

  // =========================
  // SAVE SCORE
  // =========================
  useEffect(() => {
    if (showResult) {
      submitScore({ category, score }).catch(console.error);

      const username = localStorage.getItem("username") || "User";

      const leaderboard = JSON.parse(
        localStorage.getItem("leaderboard") || "[]",
      );

      leaderboard.push({
        name: username,
        score,
        category,
      });

      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
  }, [showResult]);

  // =========================
  // STATES
  // =========================
  if (isLoading) {
    return (
      <div className=" bg-purple-100 mx-auto mt-5 w-full max-w-[520px] md:w-130 p-4 md:p-6 rounded-2xl text-center">
        Loading quiz...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="bg-white mx-auto mt-5 w-full max-w-[520px] md:w-130 p-4 md:p-6 rounded-2xl text-center">
        No questions found for this category.
      </div>
    );
  }

  const usernameRaw = localStorage.getItem("username") || "User";
  const name = usernameRaw.charAt(0).toUpperCase() + usernameRaw.slice(1);

  const getMessage = () => {
    const percent = (score / questions.length) * 100;

    if (percent < 50) {
      return `Not Good, ${name} 😢 <br/> You can do better ✊`;
    }

    if (percent <= 70) {
      return `You did Great, ${name} 🔥 <br/> Keep it up!`;
    }

    return `Excellent, ${name} 🎉 <br/> You're a Genius!`;
  };

  return (
    <div className=" bg-white mx-auto mt-5 w-full max-w-[350px] md:w-100 h-auto p-4 md:p-6 rounded-2xl">
      {!showResult ? (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4 text-sm md:text-lg flex-wrap gap-2">
            <div className="font-medium text-purple-600">
              Question {index + 1} of {questions.length}
            </div>

            <div className="font-semibold text-gray-700">Score: {score}</div>

            <div className="font-bold text-red-500">⏱ {timeLeft}s</div>
          </div>

          {/* PROGRESS */}
          <div className="w-full bg-gray-200 h-2 rounded mb-4">
            <div
              className="bg-purple-600 h-2 rounded transition-all duration-500"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* QUESTION */}
          <p className="mb-4 font-semibold text-base md:text-lg text-black">
            {index + 1}. {question.question}
          </p>

          {/* OPTIONS */}
          <ul className="space-y-3">
            {shuffledOptions.map((opt: string, i: number) => {
              const isCorrect = opt === question.answer;
              const isSelected = selected === i;

              return (
                <li
                  key={i}
                  onClick={() => checkAns(i)}
                  className={`px-4 py-3 md:py-4 border-2 rounded select-none transition-all duration-300 text-sm md:text-base
                    ${
                      lock
                        ? "cursor-default"
                        : "cursor-pointer hover:bg-purple-50"
                    }
                    ${
                      selected !== null && isCorrect
                        ? "border-green-500 bg-green-100 text-green-700"
                        : ""
                    }
                    ${
                      selected !== null && isSelected && !isCorrect
                        ? "border-red-500 bg-red-100 text-red-700"
                        : ""
                    }
                  `}
                >
                  <strong className="mr-2">
                    {String.fromCharCode(65 + i)}.
                  </strong>
                  {opt}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="text-center mt-5 mb-5 px-2">
          <h2 className="text-2xl font-bold text-purple-600 mb-5">
            Quiz Completed
          </h2>

          <div
            className={`text-xl font-black mb-4 ${
              score < 5
                ? "text-red-600"
                : score <= 6
                  ? "text-yellow-600"
                  : "text-green-600"
            }`}
          >
            {score} / {questions.length}
          </div>

          <div
            className="text-md mb-5 font-bold text-gray-700"
            dangerouslySetInnerHTML={{ __html: getMessage() }}
          />

          <button
            onClick={() => (window.location.href = "/view-scores")}
            className="bg-purple-600 mb-3 font-medium text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            View Scores
          </button>

          <br />

          <button
            onClick={restartQuiz}
            className="bg-blue-600 font-medium text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
