import { useQuery } from "@tanstack/react-query"
import { fetchSchoolType, fetchSchoolTypes } from "../services/apis"

export function useSchoolTypes() {

      return useQuery({
      queryKey: ['school_types'],
      queryFn:fetchSchoolTypes,
      staleTime:1000,
    })
  }
  export function useSchoolType(id) {
    return useQuery({
      queryKey: ['school_types',id],
      queryFn: ()=>fetchSchoolType(id),
    })
  }

  export function useSchoolTypesByCampusId(campusId) {
    return useQuery({
      queryKey: ['school_types','campus',campusId],
      queryFn: ()=>fetchSchoolTypeByCampusId(campusId),
    })
  }