import { useQuery } from "@tanstack/react-query"
import { fetchRoomService, fetchRoomsService } from "../services/apis"

export function useRooms(payload) {

      return useQuery({
      queryKey: ['rooms',{floor_id:payload.floor_id}],
      queryFn:()=>fetchRoomsService(payload),
      staleTime:1000,
    })
  }
  export function useRoom(id) {
    return useQuery({
      queryKey: ['rooms',id],
      queryFn: ()=>fetchRoomService(id),
    })
  }

