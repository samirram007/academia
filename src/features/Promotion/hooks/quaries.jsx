import { useQuery } from "@tanstack/react-query"
import { fetchPromotionService, fetchPromotionsService } from "../services/apis"

export function usePromotions(payload) {

      return useQuery({
      queryKey: ['promotions',payload],
      queryFn:()=>fetchPromotionsService(payload),
      retry:false,
      staleTime:1000,
    })
  }
  export function usePromotion(id) {
    return useQuery({
      queryKey: ['promotions',id],
      queryFn: ()=>fetchPromotionService(id),
    })
  }

