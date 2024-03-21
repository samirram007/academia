import { useQuery } from "@tanstack/react-query"
 import { fetchFeeHeadById, fetchFeeHeads } from "../services/apis"

 export function useFeeHead(id) {
    return useQuery({
      queryKey: ['fee_heads',{id}],
      queryFn: ()=>fetchFeeHeadById(id),
      staleTime:Infinity
    })
  }
export function useFeeHeads() {
    return useQuery({
      queryKey: ['fee_heads'],
      queryFn: fetchFeeHeads,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
