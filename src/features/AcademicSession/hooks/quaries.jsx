import { useQuery } from "@tanstack/react-query"
import { fetchAcademicSession, fetchAcademicSessions } from "../services/apis"

export  function useAcademicSessions(payload) {

      return   useQuery  ({
      queryKey: ['academic_sessions',payload],
      queryFn: ()=> fetchAcademicSessions(payload),
      staleTime:1000*60,
      retry:false,
      enabled:!!payload.campus_id
    })
  }
  export function useAcademicSession(id) {
    return useQuery({
      queryKey: ['academic_sessions',id],
      queryFn: ()=>fetchAcademicSession(id),
    })
  }

  export function useAcademicSessionsByCampusId(campusId) {
    return useQuery({
      queryKey: ['academic_sessions','campus',campusId],
      queryFn: ()=>fetchAcademicSessionByCampusId(campusId),
    })
  }