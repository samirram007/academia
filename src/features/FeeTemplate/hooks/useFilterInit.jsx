import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplates } from "../services/apis"
import { useAcademicClasses } from "../../AcademicClass/hooks/queries"
import { useAcademicSessions } from "../../AcademicSession/hooks/quaries"
import { useCampuses } from "../../Campus/hooks/queries"
import { fetchCampusesService } from "../../Campus/services/apis"
import { queryClient } from "../../../utils/queryClient"
import { useMemo } from "react"

export  function useFilterInit(payload) {
   useQuery({
        queryKey: ['filter',payload],
        queryFn: ()=>{
            return {
                academic_session_id:payload.academic_session_id,
                academic_class_id:payload.academic_class_id,
                campus_id:payload.campus_id
            }
        },
        staleTime:Infinity,
        enabled:!!payload
      })
      useQuery({
              queryKey: ['fee_templates','filter' ],
              queryFn: ()=>fetchFeeTemplates(payload),
              staleTime:1000,
              enabled:!!payload
            })



    return {payload}
}