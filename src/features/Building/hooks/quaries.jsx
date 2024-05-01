import { useQuery } from "@tanstack/react-query"
import { fetchBuildingService, fetchBuildingsService } from "../services/apis"

export function useBuildings(payload) {

      return useQuery({
      queryKey: ['buildings',payload],
      queryFn:()=> fetchBuildingsService(payload),
        staleTime:1000*60,
        retry:false,
        enabled:!!payload.campus_id

    })
  }
  export function useBuilding(id) {
    return useQuery({
      queryKey: ['buildings',id],
      queryFn: ()=>fetchBuildingService(id),
    })
  }

