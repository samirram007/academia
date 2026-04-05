import { useQuery } from "@tanstack/react-query";
import {
  fetchExaminationResultService,
  fetchExaminationResultsService,
} from "../services/apis";

export function useExaminationResults() {
  return useQuery({
    queryKey: ["examination_results"],
    queryFn: fetchExaminationResultsService,
    staleTime: 1000,
  });
}
export function useExaminationResult(id) {
  return useQuery({
    queryKey: ["examination_results", id],
    queryFn: () => fetchExaminationResultService(id),
  });
}
