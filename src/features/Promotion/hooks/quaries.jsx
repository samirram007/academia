import { useQuery } from "@tanstack/react-query";
import { fetchPromotionService, fetchPromotionsService } from "../services/apis";

export function usePromotions(payload) {
  //console.log("payload test: ",payload);

  // const filterCallbackFn = useCallback((data) => {

  //   // add selectedStudentSession to data filter by payload.academic_session_id
  //   // return mData.map(item => ({
  //   //   ...item,

  //   //   selectedStudentSession: item.student_sessions.find(x => x.academic_session_id == initialFilterValues.academic_session_id)
  //   // }))
  //   // }, [mData]);
  //   if (payload.academic_session_id) {
  //     const xData=data.data.map(x => ({ ...x, selectedStudentSession: x.student_sessions.find(y => y.academic_session_id == payload.academic_session_id) }))

  //     // console.log("xData",xData);
  //     return {
  //       data: xData

  //     }
  //   }
  //   return { data: data.data }



  // }, [payload.academic_session_id]);
  return useQuery({
    queryKey: ['promotions', payload],
    queryFn: () => fetchPromotionsService(payload),
    retry: true,
    enabled: false,
    // enabled: payload ? !!payload : false,
    staleTime: 1000,
    // select: filterCallbackFn
  })
}
export function usePromotion(id) {
  return useQuery({
    queryKey: ['promotions', id],
    queryFn: () => fetchPromotionService(id),
  })
}

