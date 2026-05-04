import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload, FiCopy, FiCheck, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import Header from "../Components/Header/header";

export default function QRCodePage() {
  const { quiz } = useParams<{ quiz?: string }>();
  const navigate = useNavigate();

  const [qrValue, setQrValue] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const quizRouteMap: Record<string, string> = {
    html: "html",
    css: "css",
    javascript: "javascript",
    react: "react",
    tailwind: "tailwind",
    python: "python",
    typescript: "typescript",
    general: "general",
  };

  const safeQuiz = quiz?.toLowerCase() || "";
  const quizName = quizRouteMap[safeQuiz] || safeQuiz;

  useEffect(() => {
    if (!quizName) return;

    const uniqueId = Date.now();
    const url = `${window.location.origin}/quiz-page?category=${quizName}&attempt=${uniqueId}`;
    setQrValue(url);
  }, [quizName]);

  // DOWNLOAD QR
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${quiz}-quiz-qr.png`;
    link.click();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  // COPY LINK
  const handleCopy = async () => {
    if (!qrValue) return;

    await navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartQuiz = () => {
    navigate(`/quiz-page?category=${quizName}`);
  };

  return (
    <div className="bg-animated-gradient min-h-screen flex flex-col gap-2">
      <Header />

      <div className="text-center mb-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white capitalize">
          {quizName} Quiz
        </h1>

        <p className="text-sm sm:text-base text-purple-100 mt-1 p-3">
          Each round has 10 questions and you have 45secs for each question.. Best of luck 😉
        </p>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4 justify-center items-center">
        <div className="bg-white rounded-3xl py-10 sm:py-12 px-4 sm:px-6 w-full max-w-6xl">
          {/* ✅ GLOBAL HEADING */}

          {/* ================= MOBILE / TABLET ================= */}
          <div className="lg:hidden flex flex-col gap-3 items-center">
            {/* MAIN AREA */}
            <div className="p-4 sm:p-5 rounded-2xl flex flex-col justify-center items-center text-center w-full">
              <div className="flex items-center text-lg text-purple-700">
                <span className="text-2xl sm:text-3xl font-black text-purple-900">
                  Do not need a QR code?😃
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-purple-700 mt-6 capitalize">
                Click below to take the quiz..
              </h1>

              <div className="text-5xl sm:text-6xl animate-bounce mt-6">👇</div>

              <button
                onClick={handleStartQuiz}
                className="text-lg sm:text-2xl text-white bg-purple-600 p-3 px-6 mt-4 rounded-2xl font-black hover:bg-purple-700 transition transform hover:scale-110"
              >
                Start Quiz
              </button>
            </div>

            {/* DROPDOWN BUTTON */}
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Get QR Code
              <FiChevronDown
                className={`transition ${showQR ? "rotate-180" : ""}`}
              />
            </button>

            {/* DROPDOWN CONTENT */}
            {showQR && (
              <div className="p-4 sm:p-5 rounded-2xl flex flex-col justify-center items-center text-center w-full">
                {/* ❌ REMOVED TITLE HERE */}

                <h2 className="text-lg sm:text-xl font-bold text-purple-700 mb-3">
                  Scan code to start quiz
                </h2>

                <QRCodeCanvas value={qrValue || " "} size={180} />

                <p className="text-xs sm:text-sm text-gray-500 mt-3 break-all px-2">
                  {qrValue}
                </p>

                <div className="flex justify-center gap-3 mt-5 flex-wrap">
                  <button
                    onClick={handleDownload}
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    {downloaded ? <FiCheck /> : <FiDownload />}
                    {downloaded ? "Downloaded" : "Download"}
                  </button>

                  <button
                    onClick={handleCopy}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {/* QR SECTION */}
            <div className=" rounded-2xl flex flex-col justify-center items-center text-center w-[400px]">
              {/* ✅ STILL HERE (DESKTOP ONLY) */}
              <h2 className="text-2xl font-bold text-purple-900 mb-4 capitalize">
                 Quiz QR Code
              </h2>

              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Scan code to start quiz
              </h2>

              <QRCodeCanvas value={qrValue || " "} size={220} />

              <p className="text-sm text-gray-500 mt-3 break-all">{qrValue}</p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {downloaded ? <FiCheck /> : <FiDownload />}
                  {downloaded ? "Downloaded" : "Download"}
                </button>

                <button
                  onClick={handleCopy}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <span className="text-2xl text-gray-400 font-bold">OR</span>

            {/* START QUIZ */}
            <div className="p-5 rounded-2xl flex flex-col justify-center items-center text-center w-[400px]">
              <div className="flex items-center text-lg text-purple-700">
                <span className="text-4xl font-black text-purple-900 mt-10">
                  Do not need a QR code?😃
                </span>
              </div>

              <h1 className="text-2xl font-bold text-purple-700 mt-10 capitalize">
                Click below to take the quiz..
              </h1>

              <div className="text-6xl animate-bounce mt-9">👇</div>

              <button
                onClick={handleStartQuiz}
                className="text-2xl text-white bg-purple-600 p-3 px-6 mt-4 rounded-2xl font-black hover:bg-purple-700 transition transform hover:scale-110"
              >
                Start Quiz
              </button>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-purple-600 font-semibold hover:underline block mx-auto"
          >
            ← Back to quizzes
          </button>
        </div>
      </div>
    </div>
  );
}
