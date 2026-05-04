// src/hooks/useScore.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchScores, deleteScore } from "../api/score";

// GET SCORES
export const useScores = () => {
  return useQuery({
    queryKey: ["score"],
    queryFn: fetchScores,
  });
};

// DELETE SCORE
export const useDeleteScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScore,

    // 🔥 THIS IS THE IMPORTANT PART
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score"] });
    },
  });
};
