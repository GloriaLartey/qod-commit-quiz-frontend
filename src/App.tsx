import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import SelectQuiz from "./Pages/SelectQuiz";
import QRCodePage from "./Pages/QRCodePage";
import QuizPage from "./Pages/quizPage";
import ViewScoresPage from "./Pages/ViewScoresPage";
import ForgotPassword from "./Pages/ForgotPasswordPage";
import ResetPassword from "./Pages/ResetPasswordPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/select-quiz" element={<SelectQuiz />} />
          <Route path="/qr/:quiz" element={<QRCodePage />} />
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/view-scores" element={<ViewScoresPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}