import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplate, fetchFeeTemplates } from "../services/apis"

  export function useFeeTemplates(payload) {

    return useQuery({
      queryKey: ['fee_templates','filter',payload],
      queryFn: ()=>fetchFeeTemplates(payload),
      staleTime:1000,
      enabled:!!payload
    })
  }
  export function useFeeTemplate(id) {
    return useQuery({
      queryKey: ['fee_templates',id],
      queryFn: ()=>fetchFeeTemplate(id),
    })
  }