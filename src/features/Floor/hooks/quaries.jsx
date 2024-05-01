import { useQuery } from "@tanstack/react-query"
import { fetchFloorService, fetchFloorsService } from "../services/apis"

export function useFloors(payload) {

  return useQuery({
    queryKey: ['floors', payload],
    queryFn: () => fetchFloorsService(payload),
    staleTime: 1000 * 60,
    retry: false,
    enabled: !!payload.building_id

  })
}
export function useFloor(id) {
  return useQuery({
    queryKey: ['floors', id],
    queryFn: () => fetchFloorService(id),
  })
}

