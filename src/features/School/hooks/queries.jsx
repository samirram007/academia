import { useQuery } from "@tanstack/react-query"
 import { fetchSchoolById, fetchSchools } from "../services/apis"

 export function useSchool(id) {
    return useQuery({
      queryKey: ['schools',{id}],
      queryFn: ()=>fetchSchoolById(id),
      staleTime:Infinity
    })
  }
export function useSchools() {
    return useQuery({
      queryKey: ['schools'],
      queryFn: fetchSchools,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
