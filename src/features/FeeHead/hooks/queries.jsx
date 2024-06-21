import { useQuery } from "@tanstack/react-query"
import { fetchFeeHeadById, fetchFeeHeads } from "../services/apis"
import { useCallback } from "react"

export function useFeeHead(id) {
  return useQuery({
    queryKey: ['fee_heads', { id }],
    queryFn: () => fetchFeeHeadById(id),
    staleTime: Infinity
  })
}
export function useFeeHeadAll() {

  return useQuery({
    queryKey: ['fee_heads'],
    queryFn: fetchFeeHeads,
    staleTime: Infinity,

  })
}
export function useFeeHeads(payload) {


  const filterCallbackFn = useCallback((data) => {

    if (!payload.income_group_ids || payload.income_group_ids.length === 0) {
      return { data: data.data }
    }
    return { data: data.data.filter(x => payload.income_group_ids.includes(x.income_group_id)) }


  }, [payload.is_current])

  return useQuery({
    queryKey: ['fee_heads'],
    queryFn: fetchFeeHeads,
    staleTime: Infinity,
    enabled: !!payload,
    select: filterCallbackFn
  })
}
