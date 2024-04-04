import { useQuery } from "@tanstack/react-query"
import { fetchDesignationService, fetchDesignationsService } from "../services/apis"

export function useDesignations() {

      return useQuery({
      queryKey: ['designations'],
      queryFn:fetchDesignationsService,
      staleTime:1000,
    })
  }
  export function useDesignation(id) {
    return useQuery({
      queryKey: ['designations',id],
      queryFn: ()=>fetchDesignationService(id),
    })
  }

