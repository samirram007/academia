import { useQuery } from "@tanstack/react-query"
import { fetchAdmissionService, fetchAdmissionsService } from "../services/apis"

export function useAdmissions() {

      return useQuery({
      queryKey: ['admissions'],
      queryFn:fetchAdmissionsService,
      staleTime:1000,
    })
  }
  export function useAdmission(id) {
    return useQuery({
      queryKey: ['admissions',id],
      queryFn: ()=>fetchAdmissionService(id),
    })
  }

