import { useQuery } from "@tanstack/react-query"
import { fetchJourneyTypeService, fetchJourneyTypesService } from "../services/apis"

export function useJourneyTypes() {

      return useQuery({
      queryKey: ['journey_types'],
      queryFn:fetchJourneyTypesService,
      staleTime:1000,
    })
  }
  export function useJourneyType(id) {
    return useQuery({
      queryKey: ['journey_types',id],
      queryFn: ()=>fetchJourneyTypeService(id),
    })
  }

