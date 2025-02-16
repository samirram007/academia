import { useQuery } from "@tanstack/react-query";
import {
  fetchExaminationService,
  fetchExaminationsService,
} from "../services/apis";

export function useExaminations() {
  return useQuery({
    queryKey: ["examinations"],
    queryFn: fetchExaminationsService,
    staleTime: 1000,
  });
}
export function useExamination(id) {
  return useQuery({
    queryKey: ["examination", id],
    queryFn: () => fetchExaminationService(id),
  });
}
