import { useQuery } from "@tanstack/react-query"
 import { fetchCampusById, fetchCampuses } from "../services/apis"

 export function useCampus(id) {
    return useQuery({
      queryKey: ['campuses',{id}],
      queryFn: ()=>fetchCampusById(id),
      staleTime:Infinity
    })
  }
export function useCampuses() {
    return useQuery({
      queryKey: ['campuses'],
      queryFn: fetchCampuses,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
