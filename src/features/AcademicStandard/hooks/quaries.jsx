import { useQuery } from "@tanstack/react-query"
import { fetchAcademicStandard, fetchAcademicStandards  } from "../services/apis"

export function useAcademicStandards() {
    return useQuery({
      queryKey: ['academic_standards'],
      queryFn: fetchAcademicStandards,
    })
  }
  export function useAcademicStandard(id) {
    return useQuery({
      queryKey: ['academic_standards',id],
      queryFn: ()=>fetchAcademicStandard(id),
    })
  }