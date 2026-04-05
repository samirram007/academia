import { useQuery } from "@tanstack/react-query"
import { fetchExaminationTypeService, fetchExaminationTypesService } from "../services/apis"

export function useExaminationTypes() {

      return useQuery({
      queryKey: ['examination_types'],
      queryFn:fetchExaminationTypesService,
      staleTime:1000,
    })
  }
  export function useExaminationType(id) {
    return useQuery({
      queryKey: ['examination_types',id],
      queryFn: ()=>fetchExaminationTypeService(id),
    })
  }

