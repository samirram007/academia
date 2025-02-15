import { useQuery } from "@tanstack/react-query"
import { fetchExaminationType, fetchExaminationTypes } from "../services/apis"

export function useExaminationTypes(payload) {

  return useQuery({
    queryKey: ['ExaminationTypes', 'filter', payload],
    queryFn: () => fetchExaminationTypes(payload),
    staleTime: 1000 * 60,
    enabled: !!payload
  })
}
export function useExaminationType(id) {
  return useQuery({
    queryKey: ['ExaminationTypes', id],
    queryFn: () => fetchExaminationType(id),
  })
}

