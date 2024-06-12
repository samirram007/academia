import { useQuery } from "@tanstack/react-query"
import { fetchTransportTypeService, fetchTransportTypesService } from "../services/apis"

export function useTransportTypes() {

      return useQuery({
      queryKey: ['transport_types'],
      queryFn:fetchTransportTypesService,
      staleTime:1000,
    })
  }
  export function useTransportType(id) {
    return useQuery({
      queryKey: ['transport_types',id],
      queryFn: ()=>fetchTransportTypeService(id),
    })
  }

