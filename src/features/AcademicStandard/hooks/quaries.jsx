import { useQuery } from "@tanstack/react-query"
import { fetchAcademicStandardService, fetchAcademicStandardsService } from "../services/apis"

export function useAcademicStandards() {

      return useQuery({
      queryKey: ['academic_standards'],
      queryFn:fetchAcademicStandardsService,
      staleTime:Infinity,
    })
  }
  export function useAcademicStandard(id) {
    return useQuery({
      queryKey: ['academic_standards',id],
      queryFn: ()=>fetchAcademicStandardService(id),
    })
  }

