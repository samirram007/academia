import { useQuery } from "@tanstack/react-query"
import { fetchSchoolTypeService, fetchSchoolTypesService } from "../services/apis"

export function useSchoolTypes() {

      return useQuery({
      queryKey: ['school_types'],
      queryFn:fetchSchoolTypesService,
      staleTime:1000,
    })
  }
  export function useSchoolType(id) {
    return useQuery({
      queryKey: ['school_types',id],
      queryFn: ()=>fetchSchoolTypeService(id),
    })
  }

