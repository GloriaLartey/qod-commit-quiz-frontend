import axios from "axios";

const baseUrl = "http://localhost:3000/api";

// ==============================
// GET QUIZ
// ==============================
export const getQuiz = async (category: string) => {
  const res = await axios.get(`${baseUrl}/quiz/${category}`);
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
    `${baseUrl}/quiz/score`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};