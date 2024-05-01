import { useQuery } from "@tanstack/react-query"
 import { fetchSchoolByIdService, fetchSchoolsService } from "../services/apis"

 export function useSchool(id) {
    return useQuery({
      queryKey: ['schools',{id}],
      queryFn: ()=>fetchSchoolByIdService(id),
      staleTime:Infinity
    })
  }
export function useSchools() {
    return useQuery({
      queryKey: ['schools'],
      queryFn: fetchSchoolsService,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
