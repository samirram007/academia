import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplateItemById, fetchFeeTemplateItem } from "../services/apis"

  export function useFeeTemplateItems(payload) {
    return useQuery({
      queryKey: ['fee_template_items','filter',payload],
      queryFn: ()=>fetchFeeTemplateItem(payload),
      staleTime:1000,
      enabled:!!payload
    })
  }
  export function useFeeTemplateItem(id) {

    return useQuery({
      queryKey: ['fee_template_items',id],
      queryFn: ()=>fetchFeeTemplateItemById(id),
      staleTime:1000,
    })
  }