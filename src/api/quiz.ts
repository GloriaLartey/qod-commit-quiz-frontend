import axios from "axios";

const isDev = import.meta.env.DEV
const baseURL = isDev ? "http://localhost:3000/api" : "https://qod-commit-quiz-backend.onrender.com"


// ==============================
// GET QUIZ
// ==============================
export const getQuiz = async (category: string) => {
  const res = await axios.get(`${baseURL}/quiz/${category}`);
  return res.data;
};

// ==============================
// SUBMIT SCORE
// ==============================
export const submitScore = async (payload: {
  category: string;
  score: number;
}) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${baseURL}/quiz/score`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};