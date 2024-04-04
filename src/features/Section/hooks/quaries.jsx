import { useQuery } from "@tanstack/react-query"
import { fetchSectionService, fetchSectionsService } from "../services/apis"

export function useSections() {

      return useQuery({
      queryKey: ['sections'],
      queryFn:fetchSectionsService,
      staleTime:1000,
    })
  }
  export function useSection(id) {
    return useQuery({
      queryKey: ['sections',id],
      queryFn: ()=>fetchSectionService(id),
    })
  }

