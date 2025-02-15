import { useQuery } from "@tanstack/react-query";
import {
  fetchExaminationStandardService,
  fetchExaminationStandardsService,
} from "../services/apis";

export function useExaminationStandards() {
  return useQuery({
    queryKey: ["examination_standard"],
    queryFn: fetchExaminationStandardsService,
    staleTime: 1000,
  });
}
export function useExaminationStandard(id) {
  return useQuery({
    queryKey: ["examination_standard", id],
    queryFn: () => fetchExaminationStandardService(id),
  });
}
