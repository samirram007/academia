import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplate, fetchFeeTemplates } from "../services/apis"
import { useCallback } from "react"

export function useFeeTemplates(payload) {
  const filterCallbackFn = useCallback((data) => {

    if(!payload.is_active){
      return { data: data.data }
    }
    if (payload.is_active > 0) {

      return {
        data: data.data
          .filter(x => x.is_active)
      }
    }


  }, [payload.is_active]);
  return useQuery({
    queryKey: ['fee_templates', 'filter', payload],
    queryFn: () => fetchFeeTemplates(payload),
    staleTime: Infinity,
    enabled: !!payload,
    select: filterCallbackFn
  })
}
export function useFeeTemplate(id) {
  return useQuery({
    queryKey: ['fee_templates', id],
    queryFn: () => fetchFeeTemplate(id),
  })
}
export function useFeeTemplatesBySessionNClass(payload) {
  return useQuery({
    queryKey: ['fee_templates', payload],
    queryFn: () => fetchFeeTemplatesBySessionNClass(payload),
  })
}
