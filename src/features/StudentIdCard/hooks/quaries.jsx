import { useQuery } from "@tanstack/react-query"
import { fetchStudentIdCardService, fetchStudentIdCardsService } from "../services/apis"

export function useStudentIdCards(payload) {

      return useQuery({
      queryKey: ['student_id_cards',payload],
      queryFn:()=>fetchStudentIdCardsService(payload),
      retry:false,
      staleTime:1000,
    })
  }
  export function useStudentIdCard(id) {
    return useQuery({
      queryKey: ['student_id_cards',id],
      queryFn: ()=>fetchStudentIdCardService(id),
    })
  }

