import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "../api/quiz";

export const useQuiz = (category: string) => {
  return useQuery({
    queryKey: ["quiz", category],
    queryFn: () => getQuiz(category),
    enabled: !!category,
    select: (data) => data.questions || data, // handles both backend formats
  });
};