import { useQuery } from "@tanstack/react-query"
import { fetchTransportService, fetchTransportsService } from "../services/apis"

export function useTransports() {

      return useQuery({
      queryKey: ['transports'],
      queryFn:fetchTransportsService,
      staleTime:1000,
    })
  }
  export function useTransport(id) {
    return useQuery({
      queryKey: ['transports',id],
      queryFn: ()=>fetchTransportService(id),
    })
  }

