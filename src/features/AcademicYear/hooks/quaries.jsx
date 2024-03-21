import { useQuery } from "@tanstack/react-query"
import { fetchAcademicYear, fetchAcademicYears } from "../services/apis"

export function useAcademicYears(payload) {
    return useQuery({
      queryKey: ['academic_years',payload],
      queryFn: ()=>fetchAcademicYears(payload),
      staleTime:1000,
      enabled:!!payload
    })
  }
  export function useAcademicYear(id) {
    return useQuery({
      queryKey: ['academic_years',id],
      queryFn: ()=>fetchAcademicYear(id),
    })
  }

  export function useAcademicYearsByCampusId(campusId) {
    return useQuery({
      queryKey: ['academic_years','campus',campusId],
      queryFn: ()=>fetchAcademicYearByCampusId(campusId),
    })
  }