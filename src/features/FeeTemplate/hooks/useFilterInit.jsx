import { useQuery } from "@tanstack/react-query"
import { fetchFeeTemplates } from "../services/apis"
import { useAcademicClasses } from "../../AcademicClass/hooks/queries"
import { useAcademicYears } from "../../AcademicYear/hooks/quaries"
import { useCampuses } from "../../Campus/hooks/queries"
import { fetchCampuses } from "../../Campus/services/apis"
import { queryClient } from "../../../utils/queryClient"
import { useMemo } from "react"

export  function useFilterInit(payload) {
   useQuery({
        queryKey: ['filter',payload],
        queryFn: ()=>{
            return {
                academic_year_id:payload.academic_year_id,
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