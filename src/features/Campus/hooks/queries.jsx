import { useQuery } from "@tanstack/react-query"
 import { fetchCampusByIdService, fetchCampusesService } from "../services/apis"

 export function useCampus(id) {
    return useQuery({
      queryKey: ['campuses',{id}],
      queryFn: ()=>fetchCampusByIdService(id),
      staleTime:Infinity
    })
  }
export function useCampuses() {
    return useQuery({
      queryKey: ['campuses'],
      queryFn: fetchCampusesService,
      staleTime: Infinity,
    })
  }
