import { useQuery } from "@tanstack/react-query"
import { fetchSubjectService, fetchSubjectsService } from "../services/apis"

export function useSubjects() {

      return useQuery({
      queryKey: ['subjects'],
      queryFn:fetchSubjectsService,
      staleTime:1000,
    })
  }
  export function useSubject(id) {
    return useQuery({
      queryKey: ['subjects',id],
      queryFn: ()=>fetchSubjectService(id),
    })
  }

