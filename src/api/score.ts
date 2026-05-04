import api from "./client";

// GET scores
export const fetchScores = async () => {
  const res = await api.get("/quiz/score"); 
  return res.data;
};

// DELETE score
export const deleteScore = async (_id: string) => {
  const res = await api.delete(`/quiz/score/${_id}`);
  return res.data;
};