import { useQuery } from "@tanstack/react-query"
import { fetchTransportFeeService, fetchTransportFeesService } from "../services/apis"

export function useTransportFees(payload) {

      return useQuery({
      queryKey: ['transport_fees',{academic_session_id:payload.academic_session_id}],
      queryFn:()=>fetchTransportFeesService(payload),
      staleTime:1000,
    })
  }
  export function useTransportFee(id) {
    return useQuery({
      queryKey: ['transport_fees',id],
      queryFn: ()=>fetchTransportFeeService(id),
    })
  }

