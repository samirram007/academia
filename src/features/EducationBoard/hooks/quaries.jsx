import { useQuery } from "@tanstack/react-query"
import { fetchEducationBoard, fetchEducationBoards } from "../services/apis"

export function useEducationBoards(payload) {

      return useQuery({
      queryKey: ['education_boards'],
      queryFn:fetchEducationBoards,
      staleTime:1000
    })
  }
  export function useEducationBoard(id) {
    return useQuery({
      queryKey: ['education_boards',id],
      queryFn: ()=>fetchEducationBoard(id),
    })
  }
