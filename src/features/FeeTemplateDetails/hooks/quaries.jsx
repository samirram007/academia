import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplateDetailsById, fetchFeeTemplateDetails } from "../services/apis"

  export function useFeeTemplateDetails(payload) {
    return useQuery({
      queryKey: ['fee_template_details','filter',payload],
      queryFn: ()=>fetchFeeTemplateDetails(payload),
      staleTime:1000,
      enabled:!!payload
    })
  }
  export function useFeeTemplateDetail(id) {

    return useQuery({
      queryKey: ['fee_template_details',id],
      queryFn: ()=>fetchFeeTemplateDetailsById(id),
      staleTime:1000,
    })
  }